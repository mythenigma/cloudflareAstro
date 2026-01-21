# Memo — Content & Editing Rules (last 1–2 days)

## Product facts (don’t overclaim)

- **MaiPDF online**: **no “expiry / expiration date” setting**. Avoid saying “set an expiration date / auto-expire”.  
- **MaiPDF**: has **Replace File** (keep the same link; update content/settings). Prefer describing this instead of “one‑click disable / revoke” if that feature doesn’t exist.
- **Maiimg**: for **image sharing** (not PDF). Don’t mix features between MaiPDF and Maiimg.

## Image asset rules (by language / topic)

- **Chinese MaiPDF posts**: use images from `public/cn2025May/` (paths like `/cn2025May/...`).
- **Non‑Chinese (incl. English) MaiPDF posts**: use images from `public/2025MayMaiPDF/` (paths like `/2025MayMaiPDF/...`).
- **Offline DRM / offline PDF** posts: use images from `public/offlinepages/` (paths like `/offlinepages/...`).

## Editing approach

- **Per‑post styling only**: Prefer **single‑post scoped CSS** inside that markdown file. Avoid bulk/global style changes unless explicitly requested.
- **Keep content concise**: Remove extra sections that distract; keep a clear “upload → settings → generate link/QR → share → replace file” flow when relevant.
- **Linking**: If referencing “Replace File / keep link” usage, point to the guide: `https://sendpdfonline.com/article/replace-pdf-without-changing-link-zh`.

## Additional guardrails

- **No functional code changes by default**: Only edit content/layout unless you explicitly approve functional changes (e.g. redirects).
- **Use absolute internal links**: Prefer `/blog/<lang>/<slug>`; avoid `../../`-style relative links that can break.
- **CTA de-dup**: Keep **one CTA per post**. If the post has its own CTA block, don’t add another.
- **Correct flow order**: Prefer `upload → set access controls → generate link/QR → share → replace file (keep link)` (don’t swap steps).
- **Language consistency**: Chinese posts should use Chinese screenshots/copy when possible (avoid mixing EN UI images into CN posts).
- **Mermaid safety**: Keep Mermaid diagrams simple; use `<br/>` for line breaks and avoid special characters that can cause syntax errors.

