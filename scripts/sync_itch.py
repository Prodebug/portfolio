#!/usr/bin/env python3
"""Sync games and exact stats from itch.io (Official API + public page enrichment) into data/portfolio.json."""
from __future__ import annotations

import html as html_lib
import json
import os
import re
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "portfolio.json"
ITCH_USER = "https://itch.io"
UA = "MuovPortfolioSync/2.0 (+github actions)"


def fetch_text(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def fetch_json(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def clean_text(raw: str) -> str:
    if not raw:
        return ""
    text = re.sub(r"<[^>]+>", " ", raw)
    text = html_lib.unescape(text)
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def fetch_api_games(api_key: str) -> dict[str, dict]:
    """Fetch exact views_count, downloads_count, purchases_count from itch.io API."""
    if not api_key:
        print("info: ITCH_API_KEY is not set; using public HTML fallback only.")
        return {}
    url = f"https://itch.io{api_key.strip()}/my-games"
    try:
        payload = fetch_json(url)
    except urllib.error.HTTPError as e:
        print(f"warn: itch.io API HTTP {e.code}: {e.reason}")
        return {}
    except Exception as e:
        print(f"warn: itch.io API failed: {e}")
        return {}

    games_list = payload.get("games") or []
    print(f"api: fetched {len(games_list)} game(s) from official itch.io API")
    by_id: dict[str, dict] = {}
    for item in games_list:
        gid = str(item.get("id") or "")
        if not gid:
            continue
        by_id[gid] = {
            "itchId": gid,
            "title": clean_text(item.get("title") or ""),
            "tagline": clean_text(item.get("short_text") or ""),
            "itchUrl": (item.get("url") or "").split("?")[0],
            "cover": item.get("cover_url") or "",
            "published": bool(item.get("published", True)),
            "publishedAt": item.get("published_at") or item.get("created_at") or "",
            "views": int(item.get("views_count") or 0),
            "downloads": int(item.get("downloads_count") or 0),
            "purchases": int(item.get("purchases_count") or 0),
            "canBeBought": bool(item.get("can_be_bought", False)),
            "inPressSystem": bool(item.get("in_press_system", False)),
            "hasDemo": bool(item.get("has_demo", False)),
            "platforms_api": [
                name
                for flag, name in (
                    ("p_windows", "Windows"),
                    ("p_osx", "macOS"),
                    ("p_linux", "Linux"),
                    ("p_android", "Android"),
                )
                if item.get(flag)
            ],
            "type": item.get("type") or "",
        }
    return by_id


def parse_profile_games(html: str) -> list[dict]:
    games = []
    for m in re.finditer(
        r'data-game_id="(\d+)"[\s\S]{0,1400}?href="(https://muov\.itch\.io/([a-z0-9-]+))"',
        html,
        re.I,
    ):
        gid, url, slug = m.group(1), m.group(2), m.group(3)
        if slug in ("", "feed") or url.rstrip("/") == ITCH_USER.rstrip("/"):
            continue
        title_m = re.search(
            rf'href="{re.escape(url)}"[^>]*class="title[^"]*"[^>]*>([^<]+)',
            html,
        ) or re.search(rf'href="{re.escape(url)}"[^>]*>([^<]{{2,90}})</a>', html)
        title = clean_text(title_m.group(1)) if title_m else slug.replace("-", " ").title()
        cover_m = re.search(
            rf'data-game_id="{gid}"[\s\S]{{0,900}}?(https://img\.itch\.zone/[^"\s]+)',
            html,
        )
        cover = cover_m.group(1) if cover_m else ""
        if cover and re.search(r"/\d+x\d+", cover):
            cover = re.sub(r"/\d+x\d+[^/]*/", "/original/", cover)
        games.append(
            {
                "itchId": gid,
                "slug": slug,
                "itchUrl": url.split("?")[0],
                "title": title,
                "cover": cover,
            }
        )
    seen, out = set(), []
    for g in games:
        if g["itchId"] in seen:
            continue
        seen.add(g["itchId"])
        out.append(g)
    return out


def enrich_game(url: str) -> dict:
    try:
        html = fetch_text(url)
    except Exception as e:
        print(f"warn: enrich {url}: {e}")
        return {}
    info: dict = {}

    h1_m = re.search(r"<h1[^>]*class=\"game_title\"[^>]*>([^<]+)</h1>", html, re.I)
    if h1_m:
        info["title"] = clean_text(h1_m.group(1))

    paras = re.findall(r"<p>([\s\S]{10,600}?)</p>", html)
    skip = ("download", "click button", "install", "log in with itch.io")
    desc_parts = []
    for p in paras:
        cleaned = clean_text(p)
        if len(cleaned) >= 8 and not any(s in cleaned.lower() for s in skip):
            desc_parts.append(cleaned)
    if desc_parts:
        info["description"] = "\n\n".join(desc_parts[:7])

    genres = re.findall(r"itch\.io/games/genre-([a-z0-9-]+)", html)
    if genres:
        info["genres"] = [g.replace("-", " ").title() for g in dict.fromkeys(genres)]

    tags = re.findall(r"itch\.io/games/tag-([a-z0-9-]+)", html)
    if tags:
        info["tags"] = [t.replace("-", " ").title() for t in dict.fromkeys(tags)][:6]

    platforms = []
    if "platform-windows" in html or ">Windows<" in html:
        platforms.append("Windows")
    if "platform-osx" in html or "platform-mac" in html or ">macOS<" in html:
        platforms.append("macOS")
    if "platform-linux" in html or ">Linux<" in html:
        platforms.append("Linux")
    if "platform-android" in html or ">Android<" in html:
        platforms.append("Android")
    if "HTML5" in html or "platform-web" in html or "html_embed" in html or "Run game" in html:
        platforms.append("Web")
    if platforms:
        info["platforms"] = list(dict.fromkeys(platforms))

    if "Submission to" in html and "Jam" in html:
        info["status"] = "jam"
    elif re.search(r">\s*Released\s*<", html) or "games/released" in html:
        info["status"] = "released"
    elif "In development" in html:
        info["status"] = "wip"
    elif "Prototype" in html:
        info["status"] = "prototype"

    ym = re.search(r"(\d{4})-\d{2}-\d{2}", html)
    if ym:
        try:
            info["year"] = int(ym.group(1))
        except ValueError:
            pass

    shots = re.findall(
        r'(https://img\.itch\.zone/aW1hZ2Uv[^"\s]+/original/[^"\s]+)', html
    )
    if shots:
        info["shots"] = list(dict.fromkeys(shots))[:4]

    cm = re.search(
        r'(https://img\.itch\.zone/aW1nLz[^"\s]+/original/[^"\s]+)', html
    )
    if cm:
        info["cover"] = cm.group(1)

    rm = re.search(r"Rated\s*([\d.]+)\s*out of\s*5", html, re.I)
    if rm:
        try:
            info["rating"] = float(rm.group(1))
        except ValueError:
            pass

    return info


def slug_id(slug: str) -> str:
    return re.sub(r"[^a-z0-9-]", "", slug.lower()) or "game"


def merge(existing: dict, scraped: list[dict], api_by_id: dict[str, dict]) -> dict:
    profile = existing.get("profile") or {
        "name": "Muov",
        "role": "инди-разработчик",
        "roleEn": "indie developer",
        "city": "itch.io",
        "bio": "Создаю инди-игры, выстраиваю вымышленные миры и пишу истории.",
        "bioEn": "I create indie games, build fictional worlds and write stories.",
        "links": [
            {"label": "itch.io", "url": ITCH_USER},
            {"label": "Discord", "url": "https://discord.gg"},
        ],
    }
    old_games = list(existing.get("games") or [])
    by_itch, by_url = {}, {}
    for g in old_games:
        if g.get("itchId"):
            by_itch[str(g["itchId"])] = g
        for key in ("itchUrl", "playUrl"):
            if g.get(key) and "itch.io" in str(g[key]):
                by_url[str(g[key]).rstrip("/")] = g

    merged, seen_ids = [], set()

    for s in scraped:
        gid_str = str(s["itchId"])
        api_item = api_by_id.get(gid_str) or {}
        actual_url = (api_item.get("itchUrl") or s["itchUrl"]).rstrip("/")
        old = by_itch.get(gid_str) or by_url.get(actual_url) or by_url.get(s["itchUrl"].rstrip("/"))
        extra = enrich_game(actual_url)

        fresh_title = api_item.get("title") or extra.get("title") or s["title"]
        fresh_cover = extra.get("cover") or api_item.get("cover") or s.get("cover") or ""

        platforms = list(dict.fromkeys((api_item.get("platforms_api") or []) + (extra.get("platforms") or [])))
        if api_item.get("type") == "html" and "Web" not in platforms:
            platforms.append("Web")

        old_stats = (old or {}).get("stats") or {}
        stats = {
            "downloads": api_item["downloads"] if "downloads" in api_item else old_stats.get("downloads", 0),
            "views": api_item["views"] if "views" in api_item else old_stats.get("views", 0),
            "plays": api_item["views"] if (api_item.get("type") == "html" and "views" in api_item) else old_stats.get("plays", 0),
        }
        if "rating" in extra:
            stats["rating"] = extra["rating"]
        elif old_stats.get("rating") is not None:
            stats["rating"] = old_stats["rating"]

        year = extra.get("year")
        if not year and api_item.get("publishedAt"):
            ym = re.match(r"(\d{4})", api_item["publishedAt"])
            if ym:
                year = int(ym.group(1))

        if old:
            game = dict(old)
            game["itchId"] = gid_str
            game["itchUrl"] = actual_url
game["playUrl"] = actual_url
if fresh_title:
game["title"] = fresh_title
if api_item.get("tagline") and not game.get("tagline"):
game["tagline"] = api_item["tagline"]
if fresh_cover and (not game.get("cover") or str(game["cover"]).startswith("http")):
game["cover"] = fresh_cover
if platforms:
game["platforms"] = platforms
for k in ("genres", "shots", "status", "tags"):
if extra.get(k):
game[k] = extra[k]
if year:
game["year"] = year
if extra.get("description") and (
not (old.get("description") or "").strip() or "ХЭЛЛОУИН" in old.get("description", "")
):
game["description"] = extra["description"]
game["stats"] = stats
merged.append(game)
seen_ids.add(game.get("id") or gid_str)
else:
slug = actual_url.rstrip("/").split("/")[-1] or s["slug"]
gid = slug_id(slug)
game = {
"id": gid,
"title": fresh_title,
"tagline": api_item.get("tagline") or "",
"year": year or datetime.now().year,
"role": "разработка",
"status": extra.get("status") or "released",
"genres": extra.get("genres") or [],
"platforms": platforms,
"description": extra.get("description") or "",
"cover": fresh_cover,
"shots": extra.get("shots") or [],
"playUrl": actual_url,
"trailerUrl": "",
"repoUrl": "",
"featured": len(merged) == 0 and len(old_games) == 0,
"tags": extra.get("tags") or [],
"itchId": gid_str,
"itchUrl": actual_url,
"stats": stats,
}
merged.append(game)
seen_ids.add(gid)
for g in old_games:
key = g.get("id") or g.get("itchId")
if key in seen_ids:
continue
if not g.get("itchId") and not (
g.get("itchUrl")
or str(g.get("playUrl") or "").startswith("itch.io")
):
merged.append(g)
seen_ids.add(key)
if merged and not any(g.get("featured") for g in merged):
merged[0]["featured"] = True
return {
"profile": profile,
"games": merged,
"updatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
}
def main() -> None:
api_key = os.environ.get("ITCH_API_KEY", "").strip()
api_by_id = fetch_api_games(api_key)
html = fetch_text(ITCH_USER)
scraped = parse_profile_games(html)
print(f"public profile: found {len(scraped)} game(s)")
for s in scraped:
print(f"  - [{s['itchId']}] {s['title']} ({s['itchUrl']})")
existing = (
json.loads(DATA.read_text(encoding="utf-8"))
if DATA.exists()
else {"profile": {}, "games": []}
)
result = merge(existing, scraped, api_by_id)
DATA.parent.mkdir(parents=True, exist_ok=True)
DATA.write_text(
json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
)
print(f"wrote {DATA} with {len(result['games'])} game(s)")
if name == "main":
main()
