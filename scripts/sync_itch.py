#!/usr/bin/env python3
"""Sync games and exact stats from itch.io into data/portfolio.json."""
from __future__ import annotations

import html as html_lib
import json
import os
import re
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "portfolio.json"
HOST = "itch.io"
ITCH_USER = "https://muov." + HOST + "/"
UA = "MuovPortfolioSync/3.0 (+github actions)"


def fetch_text(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def unescape_deep(text: str) -> str:
    for _ in range(3):
        decoded = html_lib.unescape(text)
        if decoded == text:
            break
        text = decoded
    return text


def clean_text(raw: str) -> str:
    if not raw:
        return ""
    text = re.sub(r"<[^>]+>", " ", raw)
    text = unescape_deep(text)
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


class _FormattedDescriptionParser(HTMLParser):
    """Extract clean prose and bullet items inside itch.io .formatted_description."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=False)
        self.capturing = False
        self.div_depth = 0
        self.skip_depth = 0
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)
        cls = attr_map.get("class") or ""
        if not self.capturing:
            if tag == "div" and "formatted_description" in cls.split():
                self.capturing = True
                self.div_depth = 1
            return
        if tag == "div":
            self.div_depth += 1
        elif tag in ("script", "style"):
            self.skip_depth += 1
        elif self.skip_depth == 0:
            if tag == "br":
                self.parts.append("\n")
            elif tag == "li":
                self.parts.append("\n• ")
            elif tag in ("p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote"):
                self.parts.append("\n\n")

    def handle_endtag(self, tag: str) -> None:
        if not self.capturing:
            return
        if tag in ("script", "style") and self.skip_depth > 0:
            self.skip_depth -= 1
            return
        if tag == "div":
            self.div_depth -= 1
            if self.div_depth <= 0:
                self.capturing = False
        elif self.skip_depth == 0 and tag in ("p", "ul", "ol", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote"):
            self.parts.append("\n\n")

    def handle_data(self, data: str) -> None:
        if self.capturing and self.skip_depth == 0:
            self.parts.append(data)

    def handle_entityref(self, name: str) -> None:
        if self.capturing and self.skip_depth == 0:
            self.parts.append(f"&{name};")

    def handle_charref(self, name: str) -> None:
        if self.capturing and self.skip_depth == 0:
            self.parts.append(f"&#{name};")

    def get_text(self) -> str:
        raw = unescape_deep("".join(self.parts))
        raw = raw.replace("\r\n", "\n").replace("\r", "\n")
        lines = [re.sub(r"[ \t]+", " ", line).strip() for line in raw.split("\n")]
        cleaned_lines: list[str] = []
        blank_run = 0
        for line in lines:
            if not line:
                blank_run += 1
                if blank_run <= 1 and cleaned_lines:
                    cleaned_lines.append("")
            else:
                blank_run = 0
                cleaned_lines.append(line)
        return "\n".join(cleaned_lines).strip()


def extract_formatted_description(html: str) -> str:
    parser = _FormattedDescriptionParser()
    parser.feed(html)
    parser.close()
    text = parser.get_text()
    if text:
        return text
    # Fallback scoped strictly before comments widget
    main_html = re.split(r'class="[^"]*\bgame_comments_widget\b', html, maxsplit=1)[0]
    paras = re.findall(r"<p>([\s\S]{10,600}?)</p>", main_html)
    skip = ("download", "click button", "install", "log in with itch.io")
    desc_parts = []
    for p in paras:
        cleaned = clean_text(p)
        if len(cleaned) >= 8 and not any(s in cleaned.lower() for s in skip):
            desc_parts.append(cleaned)
    return "\n\n".join(desc_parts[:7])


def fetch_api_games(api_key: str) -> dict[str, dict]:
    clean_key = api_key.strip()
    if not clean_key:
        print("WARN: ITCH_API_KEY is empty!")
        return {}
    api_url = "https://" + HOST + "/api/1/" + clean_key + "/my-games"
    req = urllib.request.Request(
        api_url,
        headers={
            "User-Agent": UA,
            "Accept": "application/json",
            "Authorization": "Bearer " + clean_key,
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            payload = json.loads(r.read().decode("utf-8", "replace"))
    except urllib.error.HTTPError as e:
        print(f"ERROR API HTTP {e.code}: {e.reason}")
        return {}
    except Exception as e:
        print(f"ERROR API: {e}")
        return {}

    games_list = payload.get("games") or []
    print(f"SUCCESS API: loaded {len(games_list)} games")
    by_id: dict[str, dict] = {}
    for item in games_list:
        gid = str(item.get("id") or "")
        if not gid:
            continue
        views = int(item.get("views_count") or 0)
        downloads = int(item.get("downloads_count") or 0)
        plays = int(item.get("plays_count") or 0)
        print(f"  -> {item.get('title')}: views={views}, downloads={downloads}, plays={plays}")
        raw_url = re.sub(r"\?.*$", "", str(item.get("url") or "")).strip()
        by_id[gid] = {
            "itchId": gid,
            "title": clean_text(item.get("title") or ""),
            "tagline": clean_text(item.get("short_text") or ""),
            "itchUrl": raw_url,
            "cover": item.get("cover_url") or "",
            "publishedAt": item.get("published_at") or item.get("created_at") or "",
            "views": views,
            "downloads": downloads,
            "plays": plays,
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
        clean_u = re.sub(r"\?.*$", "", url).strip()
        games.append(
            {
                "itchId": gid,
                "slug": slug,
                "itchUrl": clean_u,
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

    # Isolate main game column (exclude comments & related games sidebar/footer)
    main_html = re.split(r'class="[^"]*\bgame_comments_widget\b', html, maxsplit=1)[0]
    info_panel_m = re.search(
        r'class="[^"]*\bgame_info_panel_widget\b[\s\S]{0,6000}', main_html
    )
    info_html = info_panel_m.group(0) if info_panel_m else main_html

    h1_m = re.search(r'<h1[^>]*class="[^"]*\bgame_title\b[^"]*"[^>]*>([^<]+)</h1>', main_html, re.I)
    if h1_m:
        info["title"] = clean_text(h1_m.group(1))

    desc = extract_formatted_description(main_html)
    if desc:
        info["description"] = desc

    genres = re.findall(r"itch\.io/games/genre-([a-z0-9-]+)", info_html)
    if genres:
        info["genres"] = [g.replace("-", " ").title() for g in dict.fromkeys(genres)]

    tags = re.findall(r"itch\.io/games/tag-([a-z0-9-]+)", info_html)
    if tags:
        info["tags"] = [t.replace("-", " ").title() for t in dict.fromkeys(tags)][:6]

    platforms = []
    if "platform-windows" in info_html or ">Windows<" in info_html:
        platforms.append("Windows")
    if "platform-osx" in info_html or "platform-mac" in info_html or ">macOS<" in info_html:
        platforms.append("macOS")
    if "platform-linux" in info_html or ">Linux<" in info_html:
        platforms.append("Linux")
    if "platform-android" in info_html or ">Android<" in info_html:
        platforms.append("Android")
    if "HTML5" in info_html or "platform-web" in info_html or "html_embed" in main_html or "Run game" in main_html:
        platforms.append("Web")
    if platforms:
        info["platforms"] = list(dict.fromkeys(platforms))

    if "Submission to" in main_html and "Jam" in main_html:
        info["status"] = "jam"
    elif re.search(r">\s*Released\s*<", info_html) or "games/released" in info_html:
        info["status"] = "released"
    elif "In development" in info_html:
        info["status"] = "wip"
    elif "Prototype" in info_html:
        info["status"] = "prototype"

    ym = re.search(r'<abbr[^>]+title="(\d{4})-\d{2}-\d{2}', info_html) or re.search(
        r"(\d{4})-\d{2}-\d{2}", info_html
    )
    if ym:
        try:
            info["year"] = int(ym.group(1))
        except ValueError:
            pass

    shots = re.findall(
        r'(https://img\.itch\.zone/aW1hZ2Uv[^"\'\s<>]+/original/[^"\'\s<>]+)', main_html
    )
    if shots:
        info["shots"] = list(dict.fromkeys(shots))[:4]

    og_m = re.search(
        r'<meta[^>]+property="og:image"[^>]+content="(https://img\.itch\.zone/[^"\'\s<>]+)"',
        html,
        re.I,
    )
    cm = re.search(
        r'(https://img\.itch\.zone/aW1nLz[^"\'\s<>]+/original/[^"\'\s<>]+)', main_html
    )
    if cm:
        info["cover"] = cm.group(1)
    elif og_m:
        info["cover"] = og_m.group(1)

    rm = re.search(r"Rated\s*([\d.]+)\s*out of\s*5", info_html, re.I)
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
        "bio": "Создаю игры",
        "bioEn": "I create games",
        "links": [
            {"label": "itch.io", "url": ITCH_USER},
            {"label": "Discord", "url": "https://discord.gg/8GpzEHQqG3"},
        ],
    }
    old_games = list(existing.get("games") or [])
    by_itch, by_url = {}, {}
    for g in old_games:
        if g.get("itchId"):
            by_itch[str(g["itchId"])] = g
        for key in ("itchUrl", "playUrl"):
            if g.get(key) and HOST in str(g[key]):
                by_url[str(g[key]).rstrip("/")] = g

    merged, seen_ids = [], set()

    for s in scraped:
        gid_str = str(s["itchId"])
        api_item = api_by_id.get(gid_str) or {}
        actual_url = re.sub(r"\?.*$", "", str(api_item.get("itchUrl") or s["itchUrl"])).rstrip("/")
        old = by_itch.get(gid_str) or by_url.get(actual_url) or by_url.get(s["itchUrl"].rstrip("/"))
        extra = enrich_game(actual_url)

        fresh_title = api_item.get("title") or extra.get("title") or s["title"]
        fresh_cover = extra.get("cover") or api_item.get("cover") or s.get("cover") or ""

        platforms = list(dict.fromkeys((api_item.get("platforms_api") or []) + (extra.get("platforms") or [])))
        if api_item.get("type") == "html" and "Web" not in platforms:
            platforms.append("Web")

        old_stats = (old or {}).get("stats") or {}
        best_views = max(int(api_item.get("views") or 0), int(old_stats.get("views") or 0))
        best_downloads = max(int(api_item.get("downloads") or 0), int(old_stats.get("downloads") or 0))
        best_plays = max(int(api_item.get("plays") or 0), int(old_stats.get("plays") or 0))
        if api_item.get("type") == "html" and best_plays == 0 and best_views > 0:
            best_plays = best_views

        stats = {
            "downloads": best_downloads,
            "views": best_views,
            "plays": best_plays,
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
            elif game.get("description"):
                game["description"] = unescape_deep(str(game["description"])).replace("\r\n", "\n")
            game["stats"] = stats
            merged.append(game)
            seen_ids.add(game.get("id") or gid_str)
        else:
            slug = actual_url.rstrip("/").split("/").pop() or s["slug"]
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
            or str(g.get("playUrl") or "").startswith(ITCH_USER)
        ):
            merged.append(g)
            seen_ids.add(key)

    if merged and not any(g.get("featured") for g in merged):
        first_game = next(iter(merged))
        first_game["featured"] = True

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


if __name__ == "__main__":
    main()
