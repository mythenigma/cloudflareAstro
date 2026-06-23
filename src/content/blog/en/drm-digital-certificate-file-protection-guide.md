---
title: "PDF DRM at MaiPDF: links, .maipdf packages, and the native app"
description: "How MaiPDF covers quick link sharing, portable .maipdf licenses, and a native reader with OS-level screenshot prevention — without a separate certificate stack."
pubDate: "Apr 2 2026"
updatedDate: "Jun 23 2026"
tags: ["PDF DRM", "Secure Share", ".maipdf", "native app", "Access Control"]
author: "Alex Rivera"
heroImage: "/maipdf2026/show_off/email%20verify.png"
showDefaultCta: false
---

"DRM digital certificate" usually means one of four things: PKI signing, device-bound licenses, encrypted containers, or a managed reader app. MaiPDF puts those patterns in one product family — and the **native Secure app is free for anyone to use**, not a paid enterprise-only stack.

<div class="intro-panel">
  <p><strong>June 2026:</strong> You do not need a company budget or a LockLizard-style quote. Individuals and teams alike can download MaiPDF Secure at <a href="https://drm.maipdf.com/">drm.maipdf.com</a>, pack <code>.maipdf</code> files, and share them today.</p>
</div>

## Three paths (June 2026)

| Path | What you send | Reader | Screenshot control |
|---|---|---|---|
| **Online Share** — [maipdf.com](https://www.maipdf.com) | Short link / QR | Browser | Watermark + access rules only |
| **Secure Share (web packer)** — [drm.maipdf.com/pack.html](https://drm.maipdf.com/pack.html) | Locked HTML (legacy quick pack) | Browser | Same browser ceiling |
| **MaiPDF Secure app** — [drm.maipdf.com](https://drm.maipdf.com) | `.maipdf` package | Native app (Win / macOS / Android / iOS) | **OS-level block or detect** on supported platforms |

The native app (June 2026) is the piece that closes the old gap between "browser DRM" and "install a reader, bind devices, revoke licenses." You pack in the app, distribute `.maipdf`, readers install MaiPDF Secure, sign in, and open under license rules.

## When to use which

**Online link** — brochures, drafts, anything that should open in one click with no install.

**Web HTML pack** — you need a file attachment today and recipients will accept a browser viewer. Still needs network at open time; still cannot prevent system screenshots.

**Native `.maipdf`** — contracts, courseware, or internal PDFs where you need device-bound access, revocation after delivery, and **prevent screenshot** on the reader's device (Android / Windows / macOS strongest; iOS detects and traces).

## What the native path includes

- Pack PDF → encrypted `.maipdf` with expiry, open limits, email allowlist, device cap
- License create / extend / revoke from the app or [drm.maipdf.com dashboard](https://drm.maipdf.com/)
- Account-gated open; compromised devices can be refused
- Per-page trace watermarks on every platform

## Honest limits

- No product stops a **second camera** pointed at the screen.
- iOS relies more on detection and content-hiding than hard blocking.
- Web HTML output remains available but is **not** the recommended path for screenshot-sensitive files anymore.

## Downloads

- **iPhone / iPad:** App Store (when listed)
- **Android:** Google Play or APK at [drm.maipdf.com](https://drm.maipdf.com/)
- **Windows / macOS:** installers or store builds at [drm.maipdf.com](https://drm.maipdf.com/)

## vs enterprise DRM (LockLizard)

MaiPDF Secure matches LockLizard on the **core document workflow** (managed reader, revoke, device limits, screenshot controls). LockLizard is still the pick when **paid enterprise procurement** and vendor trust packets matter. MaiPDF is for **anyone** who wants those controls **without the enterprise price** — see [MaiPDF Secure vs LockLizard](/blog/en/maipdf-secure-vs-locklizard-pdf-drm).

---

**Related:** [MaiPDF Secure vs LockLizard](/blog/en/maipdf-secure-vs-locklizard-pdf-drm) · [Prevent screenshot on PDFs](/blog/en/prevent-screenshot-pdf-drm-native-app) · [Online vs Secure Share](/blog/en/online-vs-offline-pdf-security) · [PDF online DRM guide](/blog/en/pdf-online-drm-complete-guide)
