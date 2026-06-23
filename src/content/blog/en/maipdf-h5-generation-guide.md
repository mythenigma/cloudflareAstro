---
title: "MaiPDF Secure packaging (replaces H5 / HTML workflow)"
description: "The old H5/offline HTML workflow is now legacy. Pack .maipdf in the native app for screenshot control, or use web HTML when install is impossible."
pubDate: "Mar 26 2026"
updatedDate: "Jun 23 2026"
tags: ["Secure Share", ".maipdf", "native app", "PDF DRM"]
heroImage: "/maipdf2026/show_off/en-offline-version.svg"
showDefaultCta: false
---

<div class="intro-panel">
  <p><strong>June 2026.</strong> "H5 generation" in older posts meant a <strong>locked HTML package</strong> for the browser. That path still exists at <a href="https://drm.maipdf.com/pack.html">pack.html</a>. The recommended workflow is now <strong><code>.maipdf</code> + MaiPDF Secure app</strong>.</p>
</div>

![Protected PDF packaging](/maipdf2026/show_off/en-offline-version.svg)

## Recommended: app packaging

| Step | What happens |
|---|---|
| Upload / pick PDF | In MaiPDF Secure app |
| Set rules | Expiry, opens, emails, devices |
| Export | Single `.maipdf` file |
| Reader | Installs app, signs in, opens under license |

Use when readers can install software and you need **prevent screenshot** on supported platforms.

## Legacy: HTML package

| Step | What happens |
|---|---|
| Upload | [drm.maipdf.com/pack.html](https://drm.maipdf.com/pack.html) |
| Download | Locked HTML (thin ZIP wrapper) |
| Reader | Browser, "Open · Unlock", license check |

Use when **no install** is non-negotiable. Same license server; weaker capture control.

## Not truly offline

Both paths require **internet at open** for license verification. "Portable file" ≠ "air-gapped."

---

**Related:** [Pack guide](/blog/en/how-to-create-offline-pdf-package-guide) · [H5 was not screenshot-proof](/blog/en/prevent-screenshot-pdf-drm-native-app)
