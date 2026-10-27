#!/usr/bin/env python3
"""Fetch public games from muov.itch.io and merge into data/portfolio.json."""
from __future__ import annotations

import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "portfolio.json"
ITCH_USER = "https://muov.itch.io/"
UA = "MuovPortfolioSync/1.0 (+github actions)"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def parse_int(s: str) -> int | None:
    try:
        return int(re.sub(r"[^\d]", "", s))
    except ValueError:
        return None


def parse_profile_games(html: str) -> list[dict]:
    games = []
    for m in re.finditer(
        r'data-game_id="(\d+)"[\s\S]{0,1200}?href="(https://muov\.itch\.io/([a-z0-9-]+))"',
        html,
        re.I,
    ):
        gid, url, slug = m.group(1), m.group(2), m.group(3)
        if slug in ("", "feed") or url.rstrip("/") == ITCH_USER.rstrip("/"):
            continue
        title_m = re.search(
            rf'href="{re.escape(url)}"[^>]*class="title[^"]*"[^>]*>([^<]+)',
            html,
        ) or re.search(rf'href="{re.escape(url)}"[^>]*>([^<]{{2,80}})</a>', html)
        title = (title_m.group(1).strip() if title_m else slug.replace("-", " ").title())
        cover_m = re.search(
            rf'data-game_id="{gid}"[\s\S]{{0,800}}?(https://img\.itch\.zone/[^"\s]+)',
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
        html = fetch(url)
    except Exception as e:
        print(f"warn: enrich {url}: {e}")
        return {}
    info: dict = {}

    paras = re.findall(r"<p>([^<]{10,400})</p>", html)
    skip = ("download", "click button", "install", "log in")
    desc_parts = [
        p.strip()
        for p in paras
        if not any(s in p.lower() for s in skip)
    ]
    if desc_parts:
        info["description"] = "\n\n".join(desc_parts[:6])

    genres = re.findall(r"itch\.io/games/genre-([a-z0-9-]+)", html)
    if genres:
        info["genres"] = [g.replace("-", " ").title() for g in dict.fromkeys(genres)]

    platforms = []
    if "platform-windows" in html or ">Windows<" in html:
        platforms.append("Windows")
    if "platform-osx" in html or "platform-mac" in html:
        platforms.append("macOS")
    if "platform-linux" in html:
        platforms.append("Linux")
    if "platform-android" in html or ">Android<" in html:
        platforms.append("Android")
    if "HTML5" in html or "platform-web" in html or "html_embed" in html:
        platforms.append("Web")
    if platforms:
        info["platforms"] = list(dict.fromkeys(platforms))

    if re.search(r">\s*Released\s*<", html) or "games/released" in html:
        info["status"] = "released"
    elif "In development" in html:
        info["status"] = "wip"
    if "Submission to" in html and "Jam" in html:
        info["status"] = "jam"

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

    # stats — best-effort public HTML
    stats = {}
    for pat in [
        r'data-download_count="(\d+)"',
        r'"downloads_count"\s*:\s*(\d+)',
        r"(\d[\d,]*)\s*downloads",
        r"Downloads</[^>]*>\s*<[^>]*>\s*(\d[\d,]*)",
    ]:
        m = re.search(pat, html, re.I)
        if m:
            n = parse_int(m.group(1))
            if n is not None and n < 10_000_000:
                stats["downloads"] = n
                break
    for pat in [
        r'data-view_count="(\d+)"',
        r'"views_count"\s*:\s*(\d+)',
        r"(\d[\d,]*)\s*views",
    ]:
        m = re.search(pat, html, re.I)
        if m:
            n = parse_int(m.group(1))
            # skip if equals game id-ish huge false positives handled by cap
            if n is not None and 0 < n < 10_000_000:
                stats["views"] = n
                break
    rm = re.search(r"Rated\s*([\d.]+)\s*out of\s*5", html, re.I)
    if rm:
        try:
            stats["rating"] = float(rm.group(1))
        except ValueError:
            pass
    if stats:
        info["stats"] = stats

    return info


def slug_id(slug: str) -> str:
    return re.sub(r"[^a-z0-9-]", "", slug.lower()) or "game"


def merge(existing: dict, scraped: list[dict]) -> dict:
    profile = existing.get("profile") or {
        "name": "Muov",
        "role": "инди-разработчик",
        "roleEn": "indie developer",
        "city": "itch.io",
        "bio": "",
        "bioEn": "",
        "links": [{"label": "itch.io", "url": ITCH_USER}],
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
        url = s["itchUrl"].rstrip("/")
        old = by_itch.get(str(s["itchId"])) or by_url.get(url)
        extra = enrich_game(s["itchUrl"])
        if old:
            game = dict(old)
            game["itchId"] = str(s["itchId"])
            game["itchUrl"] = s["itchUrl"]
            game["playUrl"] = game.get("playUrl") or s["itchUrl"]
            if not game.get("title"):
                game["title"] = s["title"]
            if extra.get("cover") and (
                not game.get("cover") or str(game["cover"]).startswith("http")
            ):
                game["cover"] = extra["cover"]
            elif s.get("cover") and not game.get("cover"):
                game["cover"] = s["cover"]
            for k in ("genres", "platforms", "shots", "year", "status"):
                if extra.get(k):
                    game[k] = extra[k]
            if extra.get("description") and not (old.get("description") or "").strip():
                game["description"] = extra["description"]
            if extra.get("stats"):
                game["stats"] = {**(game.get("stats") or {}), **extra["stats"]}
            merged.append(game)
            seen_ids.add(game.get("id") or game["itchId"])
        else:
            gid = slug_id(s["slug"])
            game = {
                "id": gid,
                "title": s["title"],
                "tagline": "",
                "year": extra.get("year") or datetime.now().year,
                "role": "разработка",
                "status": extra.get("status") or "released",
                "genres": extra.get("genres") or [],
                "platforms": extra.get("platforms") or [],
                "description": extra.get("description") or "",
                "cover": extra.get("cover") or s.get("cover") or "",
                "shots": extra.get("shots") or [],
                "playUrl": s["itchUrl"],
                "trailerUrl": "",
                "repoUrl": "",
                "featured": len(merged) == 0 and len(old_games) == 0,
                "tags": [],
                "itchId": str(s["itchId"]),
                "itchUrl": s["itchUrl"],
                "stats": extra.get("stats") or {},
            }
            merged.append(game)
            seen_ids.add(gid)

    for g in old_games:
        key = g.get("id") or g.get("itchId")
        if key in seen_ids:
            continue
        if not g.get("itchId") and not (
            g.get("itchUrl")
            or str(g.get("playUrl") or "").startswith("https://muov.itch.io/")
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
    html = fetch(ITCH_USER)
    scraped = parse_profile_games(html)
    print(f"found {len(scraped)} game(s)")
    for s in scraped:
        print(f"  - {s['title']}")
    existing = (
        json.loads(DATA.read_text(encoding="utf-8"))
        if DATA.exists()
        else {"profile": {}, "games": []}
    )
    result = merge(existing, scraped)
    DATA.parent.mkdir(parents=True, exist_ok=True)
    DATA.write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"wrote {DATA}")


if __name__ == "__main__":
    main()
