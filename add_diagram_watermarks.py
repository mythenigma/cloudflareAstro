#!/usr/bin/env python3
from __future__ import annotations

import os
import re
from pathlib import Path
from typing import Tuple


ROOT = Path(__file__).resolve().parent
DIAGRAM_DIRS = [
    ROOT / "public" / "diagram" / "en",
    ROOT / "public" / "diagram" / "zh-cn",
]

WATERMARK_ID = 'platform-watermark'


def detect_label(path: Path, content: str) -> str:
    name = path.name.lower()
    hay = (name + "\n" + content).lower()

    # Platform
    if "maiimg" in hay or "image" in name:
        return "Maiimg"

    # MaiPDF offline vs online
    if "offline" in hay or "drm" in hay:
        return "MaiPDF • Offline"

    # Default to online PDF sharing
    return "MaiPDF • Online"


def add_watermark(svg: str, label: str) -> Tuple[str, bool]:
    if f'id="{WATERMARK_ID}"' in svg:
        return svg, False

    # Insert before the final </svg>
    m = re.search(r"</svg>\s*$", svg, flags=re.IGNORECASE)
    if not m:
        return svg, False

    watermark = f"""
  <g id="{WATERMARK_ID}">
    <rect x="60%" y="92%" width="38%" height="6%" rx="6" fill="#ffffff" opacity="0.75"/>
    <text x="97%" y="96%" text-anchor="end" dominant-baseline="middle"
          font-size="12" font-family="Arial, sans-serif" fill="#0f172a" opacity="0.55">{label}</text>
  </g>
"""

    out = svg[: m.start()] + watermark + svg[m.start() :]
    return out, True


def main() -> int:
    changed = 0
    scanned = 0

    for d in DIAGRAM_DIRS:
        if not d.exists():
            continue
        for path in sorted(d.glob("*.svg")):
            scanned += 1
            raw = path.read_text(encoding="utf-8", errors="replace")
            label = detect_label(path, raw)
            updated, did = add_watermark(raw, label)
            if did:
                path.write_text(updated, encoding="utf-8")
                changed += 1

    print(f"Scanned: {scanned}, updated: {changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

