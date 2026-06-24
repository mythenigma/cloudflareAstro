---
title: "MaiPDF Secure Share: web pack vs .maipdf desktop app"
description: "Full comparison of pack.html (PDF→HTML→ZIP, browser) and MaiPDF Secure desktop app (.maipdf, OS screenshot block). Same license server, different products."
pubDate: "Apr 3 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["Secure Share", ".maipdf", "Locked HTML", "PDF DRM"]
showDefaultCta: false
---

[drm.maipdf.com](https://drm.maipdf.com/) hosts **two products** that share license infrastructure but must not be confused:

| Product | Where | Output | Reader |
|---|---|---|---|
| **Web packer** | [pack.html](https://drm.maipdf.com/pack.html) | HTML in ZIP | Browser |
| **MaiPDF Secure** | Desktop / mobile app | `.maipdf` | App only |

---

## Web pack (pack.html) — lower security tier

**Pipeline:** PDF → AES-GCM-256 encrypt → key split (HTML half + server half) → **webpack** self-contained HTML → ZIP download.

**Good for:**

- Recipients who will **not install** software
- Attachments, USB, internal shares when a **file** must travel
- Open limits, expiry, revoke, optional watermark

**Limits (pack.html FAQ, paraphrased):**

- Internet required at **Unlock**
- **Cannot prevent screenshot** — watermarks trace leaks, they do not block capture
- Determined user with **browser devtools** can extract decrypted PDF during an open
- Print/save blocking is UX friction (shortcuts, right-click), not a hard guarantee
- We do **not** store your PDF after pack — only license metadata + server key half

→ [Complete web pack guide](/blog/en/how-to-create-offline-pdf-package-complete-guide)

---

## MaiPDF Secure desktop app — higher security tier

**Pipeline:** pack inside native app → encrypted **`.maipdf`** → open only in app → license check → native protected viewer.

**Adds:**

- **Prevent screenshot / screen recording** (OS-dependent; Android strongest on mobile)
- Device integrity checks
- No browser devtools extraction path

![Desktop DRM entry](/maipdf2026/offline/offlinedrm.png)

→ [Prevent screenshot complete guide](/blog/en/prevent-screenshot-pdf-drm-native-app)

---

## Side-by-side

| | Web HTML pack | `.maipdf` + app |
|---|---|---|
| Pack where | Browser | Desktop / mobile app |
| Technical path | PDF→HTML→ZIP | Native encrypt |
| Install required | No | Yes |
| Security tier | Browser sandbox | OS-level controls |
| Prevent screenshot | **No** | **Yes** |
| Revoke after send | Yes | Yes |
| Network at open | Yes | Yes |
| Free (current) | Yes | Yes |

**Pick web pack** when install is a hard no and you accept browser limits.

**Pick `.maipdf`** when contracts, courseware, or confidential PDFs need capture control.

---

## Shared backend

Both paths use the same **license server** (opens, expiry, revoke). That does **not** mean the files or readers are interchangeable — a `.maipdf` will not open in the web HTML viewer and vice versa.

---

## Limits (both)

- Cannot stop a **second camera** at the screen
- 65 MB cap on web packer uploads
- Repack required when PDF content changes

<div class="cta-container">
  <a href="https://drm.maipdf.com/" target="_blank" rel="noopener noreferrer" class="cta-button">
    drm.maipdf.com
  </a>
</div>
