---
title: "Protected PDF sharing: practical overview"
description: "When to use .maipdf + app, web HTML pack, or maipdf.com links. Updated June 2026."
pubDate: "Feb 11 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/show_off/en-offline-version.svg"
tags: ["Secure Share", ".maipdf", "native app", "PDF DRM"]
showDefaultCta: false
---

<div class="intro-panel">
  <p>Old posts called this "offline PDF sharing." Accurate in 2026: you distribute a <strong>protected file</strong> (<code>.maipdf</code>) or a <strong>legacy HTML pack</strong>. Both need a **network license check at open</strong> — not air-gapped.</p>
</div>

![Protected PDF sharing](/maipdf2026/show_off/en-offline-version.svg)

## When a portable file makes sense

- Internal share blocks file-hosting URLs but allows attachments
- Field teams carry one file per job
- Classroom USB handout with expiry
- Sender must **revoke after delivery**

## Three delivery options

| Option | Install | Screenshot | Best for |
|---|---|---|---|
| `.maipdf` + app | Yes | Block/detect (OS) | Sensitive PDFs |
| Web HTML pack | No | No (watermark) | No-install handoff |
| [maipdf.com](https://maipdf.com/) link | No | No | Analytics + easy revoke |

## Build workflow

1. **Pack** — app or [pack.html](https://drm.maipdf.com/pack.html)
2. **Test** — same OS/browser your audience uses
3. **Distribute** — one protected artifact; no raw PDF alongside
4. **Manage** — revoke, extend, audit from dashboard

## Common mistakes

- Calling HTML pack "offline" — it still phones home at unlock
- Expecting browser pack to prevent screenshots — use the app
- Forgetting to repack when the source PDF changes

---

**Related:** [How to pack](/blog/en/how-to-create-offline-pdf-package-guide) · [Distribution best practices](/blog/en/offline-pdf-package-distribution-best-practices)
