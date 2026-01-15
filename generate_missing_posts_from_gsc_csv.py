#!/usr/bin/env python3
"""
Generate missing blog posts from a Google Search Console "Coverage drilldown" CSV export.

Why:
- GSC may list many 404 blog URLs that don't have corresponding markdown content files.
- Creating lightweight placeholder posts (with a diagram image) is a fast way to eliminate those 404s.

Safety / anti-footgun:
- Never overwrite existing content.
- Only touches URLs under /blog/... for this Astro content collection.
- Adds an HTML comment marking the file as auto-generated from the CSV + date.

Usage:
  python3 generate_missing_posts_from_gsc_csv.py \
    --csv "/Users/joehuang/Downloads/article.maipdf.com-Coverage-Drilldown-2026-01-15/Table.csv" \
    --root "/Users/joehuang/Documents/GitHub/cloudflareAstro" \
    --write
"""

from __future__ import annotations

import argparse
import csv
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Optional, Tuple


TODAY = "Jan 15 2026"
SITE = "https://article.maipdf.com"
SUPPORTED_LANGS = {"en", "cn", "de", "fr", "es", "ja", "ko"}


def pick_diagram(slug: str, lang: str) -> str:
    """Pick a reasonable diagram for a topic based on slug keywords."""
    s = slug.lower()

    # Prefer zh-cn diagrams for cn posts when we have a good match
    def zh(path: str) -> str:
        return f"/diagram/zh-cn/{path}"

    def en(path: str) -> str:
        return f"/diagram/en/{path}"

    if any(k in s for k in ["qrcode", "qr-code", "qr"]):
        return zh("qrcode-sharing-flow.svg") if lang == "cn" else en("pdf-qr-code-generation-workflow.svg")
    if "watermark" in s:
        return zh("drm-digital-certificate.svg") if lang == "cn" else en("simple-watermark-protection.svg")
    if any(k in s for k in ["offline", "drm", "h5", "html-package"]):
        return zh("offline-drm-flow.svg") if lang == "cn" else en("offline-pdf-drm-workflow.svg")
    if any(k in s for k in ["analytics", "tracking", "statistics", "records", "access-record"]):
        return zh("access-tracking-flow.svg") if lang == "cn" else en("pdf-analytics-tracking-workflow.svg")
    if any(k in s for k in ["access-control", "view-limit", "expiration", "disable-download", "prevent-copy", "print"]):
        return zh("permission-matrix.svg") if lang == "cn" else en("simple-access-control-flow.svg")
    if any(k in s for k in ["image", "gallery", "maiimg", "photo"]):
        return zh("image-sharing-three-features.svg") if lang == "cn" else en("bulk-image-gallery-workflow.svg")
    if any(k in s for k in ["compliance", "enterprise", "security"]):
        return zh("security-compliance.svg") if lang == "cn" else en("security-architecture.svg")

    # Default catch-all overview
    return zh("maipdf-workflow.svg") if lang == "cn" else en("features-overview.svg")


def title_from_slug(slug: str) -> str:
    # Turn slug into a readable title (simple + safe)
    text = slug.strip("/").replace("-", " ")
    text = re.sub(r"\s+", " ", text).strip()
    if not text:
        return "Untitled"
    # Title case, but keep common acronyms
    words = []
    for w in text.split(" "):
        if w.upper() in {"PDF", "DRM", "QR"}:
            words.append(w.upper())
        elif w.lower() in {"pdf", "drm", "qr"}:
            words.append(w.upper())
        else:
            words.append(w[:1].upper() + w[1:])
    return " ".join(words)


def localize_title(lang: str, base_title: str) -> str:
    # Keep it simple; avoid complex translation.
    prefixes = {
        "en": "",
        "cn": "",
        "fr": "Guide rapide : ",
        "de": "Kurzguide: ",
        "es": "Guía rápida: ",
        "ja": "クイックガイド：",
        "ko": "빠른 가이드: ",
    }
    return f"{prefixes.get(lang, '')}{base_title}"


def localize_desc(lang: str, base_title: str) -> str:
    templates = {
        "en": f"A short, practical note about {base_title.lower()}, with a diagram.",
        "cn": f"一篇简短说明：{base_title}（附流程图）。",
        "fr": f"Un article court sur {base_title.lower()}, avec un schéma.",
        "de": f"Ein kurzer Artikel zu {base_title.lower()} – mit Diagramm.",
        "es": f"Un artículo corto sobre {base_title.lower()}, con diagrama.",
        "ja": f"{base_title}を短く整理（図付き）。",
        "ko": f"{base_title}를 짧게 정리한 글(다이어그램 포함).",
    }
    return templates.get(lang, templates["en"])


def tags_for(slug: str) -> list[str]:
    s = slug.lower()
    tags = []
    if "pdf" in s:
        tags.append("PDF")
    if any(k in s for k in ["qrcode", "qr", "qr-code"]):
        tags.append("QR Code")
    if "watermark" in s:
        tags.append("Watermark")
    if any(k in s for k in ["offline", "drm"]):
        tags.append("Offline")
    if any(k in s for k in ["access-control", "view-limit", "expiration"]):
        tags.append("Access Control")
    if any(k in s for k in ["image", "gallery", "photo"]):
        tags.append("Image Sharing")
    if any(k in s for k in ["enterprise", "compliance", "security"]):
        tags.append("Security")
    return tags[:6]


@dataclass(frozen=True)
class BlogTarget:
    lang: Optional[str]  # None means /blog/{slug} (no lang prefix)
    slug: str  # can include nested paths

    def id(self) -> str:
        return f"{self.lang}/{self.slug}" if self.lang else self.slug

    def output_path(self, root: Path) -> Path:
        base = root / "src" / "content" / "blog"
        if self.lang:
            return base / self.lang / f"{self.slug}.md"
        return base / f"{self.slug}.md"


def parse_blog_target(url: str) -> Optional[BlogTarget]:
    if not url.startswith(SITE):
        return None
    path = url[len(SITE) :]
    if not path.startswith("/blog/"):
        return None
    path = path.split("?", 1)[0].split("#", 1)[0]
    parts = [p for p in path.split("/") if p]
    # parts: ['blog', ...]
    if len(parts) < 2:
        return None

    # /blog/{lang}/{slug...}
    maybe_lang = parts[1]
    # Ignore language index pages like /blog/en, /blog/cn, etc (these are not posts).
    if maybe_lang in SUPPORTED_LANGS and len(parts) == 2:
        return None

    if maybe_lang in SUPPORTED_LANGS and len(parts) >= 3:
        slug = "/".join(parts[2:])
        return BlogTarget(lang=maybe_lang, slug=slug)

    # /blog/{slug...} (no lang folder)
    slug = "/".join(parts[1:])
    return BlogTarget(lang=None, slug=slug)


def iter_urls_from_csv(csv_path: Path) -> Iterable[str]:
    with csv_path.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            u = (row.get("URL") or "").strip()
            if u:
                yield u


def write_post(target: BlogTarget, root: Path) -> bool:
    out = target.output_path(root)
    if out.exists():
        return False

    out.parent.mkdir(parents=True, exist_ok=True)

    lang = target.lang or "en"
    base_title = title_from_slug(target.slug)
    title = localize_title(lang, base_title)
    desc = localize_desc(lang, base_title)
    diagram = pick_diagram(target.slug, lang)
    tags = tags_for(target.slug)

    # Keep body extremely simple; avoid brand names; diagram provides context.
    body_lines = [
        "---",
        f'title: "{title}"',
        f'description: "{desc}"',
        f'pubDate: "{TODAY}"',
    ]
    if tags:
        # YAML array as JSON-like list is accepted by Astro content schema (it's still YAML).
        body_lines.append(f"tags: {tags!r}".replace("'", '"'))
    body_lines.extend(
        [
            "---",
            "",
            "<!-- Auto-generated from GSC 404 export on 2026-01-15. -->",
            "<!-- Keep this slug stable to avoid creating new 404s in the future. -->",
            "",
            f"# {title}",
            "",
            '<div class="intro-panel">',
            f"  <p>{desc}</p>",
            "</div>",
            "",
            f"![Diagram]({diagram})",
            "",
            "## Key points",
            "",
            "- What it is: a quick overview of the topic.",
            "- Why it matters: reduce confusion and make sharing safer.",
            "- Next step: check the diagram above and apply the idea to your workflow.",
            "",
        ]
    )

    out.write_text("\n".join(body_lines), encoding="utf-8")
    return True


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", required=True, help="Path to the GSC CSV export")
    ap.add_argument("--root", required=True, help="Path to repo root")
    ap.add_argument("--write", action="store_true", help="Actually write missing files")
    args = ap.parse_args()

    csv_path = Path(args.csv).expanduser().resolve()
    root = Path(args.root).expanduser().resolve()

    urls = list(iter_urls_from_csv(csv_path))
    targets = []
    for u in urls:
        t = parse_blog_target(u)
        if t:
            targets.append(t)

    # De-dupe by id
    uniq: dict[str, BlogTarget] = {t.id(): t for t in targets}
    created = 0
    missing = 0

    for t in sorted(uniq.values(), key=lambda x: x.id()):
        out = t.output_path(root)
        if out.exists():
            continue
        missing += 1
        if args.write:
            if write_post(t, root):
                created += 1

    print(f"Parsed URLs: {len(urls)}")
    print(f"Blog targets: {len(uniq)}")
    print(f"Missing posts: {missing}")
    if args.write:
        print(f"Created posts: {created}")
    else:
        print("Dry run (no files written). Use --write to create files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

