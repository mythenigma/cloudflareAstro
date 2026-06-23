---
title: "MaiPDF Secure Share: .maipdf packages and the native reader"
description: "Secure Share now centers on .maipdf files opened in the MaiPDF Secure app — with OS-level screenshot prevention. Web HTML packing remains as a lighter legacy option."
pubDate: "Apr 3 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["Secure Share", ".maipdf", "PDF DRM", "native app", "MaiPDF"]
showDefaultCta: false
---

<div class="intro-panel">
  <p><strong>Updated June 2026.</strong> Secure Share used to mean "pack PDF into locked HTML for the browser." The primary workflow is now a <strong>.maipdf</strong> package read in the <strong>MaiPDF Secure native app</strong> — same license server at <a href="https://drm.maipdf.com/">drm.maipdf.com</a>, but with OS-level screenshot and screen-recording controls the browser cannot provide.</p>
</div>

![MaiPDF Secure Share](/maipdf2026/offline/offlinedrm.png)

## Recommended workflow (native app)

1. Install MaiPDF Secure from [drm.maipdf.com](https://drm.maipdf.com/) (Play Store / App Store / desktop installer).
2. Sign in, select a PDF, set license rules (expiry, open limit, allowed emails, device cap).
3. Export a `.maipdf` file and send it like any attachment.
4. Recipient opens it **only in the app** after account + license check.
5. Revoke or extend from the app or web dashboard.

## Legacy workflow (web HTML packer)

[drm.maipdf.com/pack.html](https://drm.maipdf.com/pack.html) still produces a self-contained locked HTML file for quick browser-based delivery. Use it when recipients will not install an app. Limitations are unchanged: network required at open time, **no OS-level screenshot block**.

## Comparison at a glance

| | Native `.maipdf` + app | Web locked HTML |
|---|---|---|
| Install required | Yes | No |
| Prevent screenshot | Yes (platform-dependent) | No |
| License revoke | Yes | Yes |
| Best for | Confidential PDFs | Quick handoff, low friction |

## Limits

- Internet needed for license check at open.
- Cannot stop someone photographing the screen with another device.
- 65 MB upload cap on the web packer; app follows the same backend limits.

---

**Related:** [Prevent screenshot (announcement)](/blog/en/prevent-screenshot-pdf-drm-native-app) · [Online vs Secure Share](/blog/en/online-vs-offline-pdf-security)

<div class="cta-container">
  <a href="https://drm.maipdf.com/" target="_blank" rel="noopener noreferrer" class="cta-button">
    Get MaiPDF Secure
  </a>
</div>
