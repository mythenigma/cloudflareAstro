#!/usr/bin/env python3
"""
Fix auto-generated posts where HTML comments were placed before frontmatter.
Astro content collections require frontmatter to be the first thing in the file.

This script only touches files containing the marker:
  "Auto-generated from GSC 404 export on 2026-01-15."
"""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parent
BASE = ROOT / "src" / "content" / "blog"
MARKER = "Auto-generated from GSC 404 export on 2026-01-15."


def fix_file(path: Path) -> bool:
    raw = path.read_text(encoding="utf-8", errors="replace")
    if MARKER not in raw:
        return False

    # Already starts with frontmatter: OK
    stripped = raw.lstrip()
    if stripped.startswith("---\n") or stripped.startswith("---\r\n"):
        return False

    # Expect first frontmatter block somewhere after the initial comments
    idx = raw.find("\n---\n")
    if idx == -1:
        # if frontmatter starts immediately with --- but we already ruled that out, skip
        return False

    # Find the first '---' opening line
    open_idx = raw.find("---\n")
    if open_idx == -1:
        return False

    # Find the closing '---' after opening
    close_idx = raw.find("\n---\n", open_idx + 4)
    if close_idx == -1:
        return False

    fm = raw[open_idx : close_idx + len("\n---\n")]
    before = raw[:open_idx].strip()
    after = raw[close_idx + len("\n---\n") :].lstrip("\n")

    # Keep the existing leading comments, but move them below frontmatter
    moved = ""
    if before:
        moved = before + "\n\n"

    out = fm + "\n" + moved + after
    path.write_text(out, encoding="utf-8")
    return True


def main() -> int:
    changed = 0
    scanned = 0
    for p in BASE.rglob("*.md"):
        scanned += 1
        if fix_file(p):
            changed += 1
    print(f"Scanned: {scanned}, fixed: {changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

