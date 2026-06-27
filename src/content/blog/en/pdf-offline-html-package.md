---
title: "Secure Share: pack a PDF into locked HTML (web tool)"
description: "drm.maipdf.com/pack.html encrypts your PDF and bundles HTML inside a ZIP. Browser-only — not .maipdf desktop packing."
pubDate: "Apr 3 2026"
updatedDate: "Jun 23 2026"
heroImage: "/offlinepages/offline-MaiPDF-Home-Page.png"
tags: ["Secure Share", "Locked HTML", "PDF DRM"]
showDefaultCta: false
noindex: true

---

> **Product direction note:** HTML package / PDF-to-HTML content is now de-emphasized. For current MaiPDF protected-reading workflows, prefer Online Cloud Sharing for fast browser links and App DRM / `.maipdf` for screenshot-aware protection, device binding, revocation, and protected reader controls.

**Secure Share** at [pack.html](https://drm.maipdf.com/pack.html): upload PDF → AES encrypt → webpack HTML bundle → **ZIP**. Recipient opens HTML in a browser.

Not `.maipdf`. Native packing is in the **MaiPDF Secure desktop app** — [prevent screenshot guide](/blog/en/prevent-screenshot-pdf-drm-native-app).

## Steps

1. Upload at [pack.html](https://drm.maipdf.com/pack.html) (max 65 MB).
2. Set opens, expiry, optional watermark.
3. Download ZIP; save License ID + Modification Code.
4. Recipient: unzip → HTML → **Open · Unlock** (network at open).
5. Manage at [manage](https://drm.maipdf.com/manage) or dashboard.

![Upload](/offlinepages/upload_section_offline_maipdf.png)

## What you get / don't get

**Get:** portable file, server-enforced opens/expiry, leak-tracing watermarks.

**Don't get:** prevent screenshot, devtools-proof viewing, air-gapped open.

## When to use something else

| Need | Tool |
|---|---|
| Fast link | [maipdf.com](https://www.maipdf.com) |
| No install file handoff | **This web packer** |
| Prevent screenshot | [Desktop app](/blog/en/prevent-screenshot-pdf-drm-native-app) |

---

**Related:** [Complete guide](/blog/en/how-to-create-offline-pdf-package-complete-guide)
