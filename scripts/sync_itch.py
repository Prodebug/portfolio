#!/usr/bin/env python3
"""Fetch public games from muov.itch.io and merge into data/portfolio.json.

Does not overwrite manual fields (description edits, featured, custom cover paths
that are local) when the same itch game id/url already exists.
"""
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


def parse_profile_games(html: str) -> list[dict]:
    games = []
    # game cells: data-game_id + link
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
        )
        if not title_m:
            title_m = re.search(
                rf'href="{re.escape(url)}"[^>]*>([^<]{{2,80}})</a>',
                html,
            )
        title = (title_m.group(1).strip() if title_m else slug.replace("-", " ").title())
        cover_m = re.search(
            rf'data-game_id="{gid}"[\s\S]{{0,800}}?(https://img\.itch\.zone/[^"\s]+)',
            html,
        )
        cover = cover_m.group(1) if cover_m else ""
        # prefer higher res if path has size
        if cover and "315x250" in cover:
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
    # dedupe by itchId
    seen = set()
    out = []
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
    # short description paragraphs
    paras = re.findall(r"<p>([^<]{10,400})</p>", html)
    # skip download/install boilerplate
    skip = ("download", "click button", "install")
    desc_parts = [
        p.strip()
        for p in paras
        if not any(s in p.lower() for s in skip) and "log in" not in p.lower()
    ]
    if desc_parts:
        info["description"] = "\n\n".join(desc_parts[:6])
    # genres from table-ish links
    genres = re.findall(r"itch\.io/games/genre-([a-z0-9-]+)", html)
    if genres:
        info["genres"] = [g.replace("-", " ").title() for g in dict.fromkeys(genres)]
    platforms = []
    if "platform-windows" in html:
        platforms.append("Windows")
    if "platform-osx" in html or "platform-mac" in html:
        platforms.append("macOS")
    if "platform-linux" in html:
        platforms.append("Linux")
    if "platform-android" in html:
        platforms.append("Android")
    if "Play in browser" in html or "platform-web" in html:
        platforms.append("Web")
    if platforms:
        info["platforms"] = platforms
    if re.search(r">\s*Released\s*<", html) or "games/released" in html:
        info["status"] = "released"
    elif "In development" in html or "games/in-development" in html:
        info["status"] = "wip"
    if "jam" in html.lower() and "Submission to" in html:
        info["status"] = "jam"
    # year
    ym = re.search(r"published_at[^0-9]*(\d{4})", html) or re.search(
        r"(\d{4})-\d{2}-\d{2}", html
    )
    if ym:
        try:
            info["year"] = int(ym.group(1))
        except ValueError:
            pass
    # screenshots
    shots = re.findall(
        r'(https://img\.itch\.zone/aW1hZ2Uv[^"\s]+/original/[^"\s]+)', html
    )
    if shots:
        info["shots"] = list(dict.fromkeys(shots))[:4]
    # cover original
    cm = re.search(
        r'(https://img\.itch\.zone/aW1nLz[^"\s]+/original/[^"\s]+)', html
    )
    if cm:
        info["cover"] = cm.group(1)
    return info


def slug_id(slug: str) -> str:
    return re.sub(r"[^a-z0-9-]", "", slug.lower()) or "game"


def merge(existing: dict, scraped: list[dict]) -> dict:
    profile = existing.get("profile") or {
        "name": "Muov",
        "role": "инди-разработчик",
        "city": "itch.io",
        "bio": "",
        "links": [{"label": "itch.io", "url": ITCH_USER}],
    }
    old_games = list(existing.get("games") or [])
    by_itch = {}
    by_url = {}
    for g in old_games:
        if g.get("itchId"):
            by_itch[str(g["itchId"])] = g
        if g.get("itchUrl"):
            by_url[g["itchUrl"].rstrip("/")] = g
        if g.get("playUrl") and "itch.io" in g["playUrl"]:
            by_url[g["playUrl"].rstrip("/")] = g

    merged = []
    seen_ids = set()

    for s in scraped:
        url = s["itchUrl"].rstrip("/")
        old = by_itch.get(str(s["itchId"])) or by_url.get(url)
        extra = enrich_game(s["itchUrl"])
        if old:
            # keep manual overrides
            game = dict(old)
            game["itchId"] = str(s["itchId"])
            game["itchUrl"] = s["itchUrl"]
            game["playUrl"] = game.get("playUrl") or s["itchUrl"]
            if not game.get("title"):
                game["title"] = s["title"]
            # update cover only if remote or empty
            if extra.get("cover") and (
                not game.get("cover") or str(game["cover"]).startswith("http")
            ):
                game["cover"] = extra["cover"]
            elif s.get("cover") and not game.get("cover"):
                game["cover"] = s["cover"]
            for k in ("genres", "platforms", "shots", "year", "status", "description"):
                if extra.get(k) and (
                    k != "description"
                    or not (old.get("description") or "").strip()
                    or old.get("description") == extra.get("description")
                ):
                    # description: only fill if empty
                    if k == "description" and (old.get("description") or "").strip():
                        continue
                    game[k] = extra[k]
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
            }
            merged.append(game)
            seen_ids.add(gid)

    # keep manual games not from itch
    for g in old_games:
        key = g.get("id") or g.get("itchId")
        if key in seen_ids:
            continue
        if g.get("itchId") and str(g["itchId"]) in by_itch:
            continue
        # not matched as itch scrape — keep
        if not g.get("itchId") and not (
            g.get("itchUrl") or (g.get("playUrl") or "").startswith("https://muov.itch.io/")
        ):
            merged.append(g)
            seen_ids.add(key)

    # ensure one featured
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
    print(f"found {len(scraped)} game(s) on profile")
    for s in scraped:
        print(f"  - {s['title']} ({s['itchUrl']})")

    if DATA.exists():
        existing = json.loads(DATA.read_text(encoding="utf-8"))
    else:
        existing = {"profile": {}, "games": []}

    result = merge(existing, scraped)
    DATA.parent.mkdir(parents=True, exist_ok=True)
    DATA.write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"wrote {DATA} ({len(result['games'])} games)")


if __name__ == "__main__":
    main()
