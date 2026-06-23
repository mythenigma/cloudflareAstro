---
title: "Pack a PDF as .maipdf (recommended) or locked HTML (legacy)"
description: "June 2026: pack PDFs in the MaiPDF Secure app as .maipdf for OS-level screenshot control. Web HTML packing at drm.maipdf.com remains for no-install delivery."
pubDate: "Apr 3 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["Secure Share", ".maipdf", "PDF DRM", "native app", "MaiPDF"]
showDefaultCta: false
---

<div class="intro-panel">
  <p><strong>June 2026.</strong> Recommended: pack in the <a href="https://drm.maipdf.com/">MaiPDF Secure app</a> → <code>.maipdf</code> → reader installs the app. Legacy: <a href="https://drm.maipdf.com/pack.html">web HTML packer</a> → browser viewer (no OS-level screenshot block).</p>
</div>

![MaiPDF Secure Share](/maipdf2026/offline/offlinedrm.png)

## Native app (recommended)

1. Install MaiPDF Secure (Play Store / App Store / [drm.maipdf.com](https://drm.maipdf.com/)).
2. Sign in, select PDF, set expiry, open limit, allowed emails, device cap.
3. Export `.maipdf` and send like any file.
4. Recipient opens **only in the app** after license check.
5. Revoke or extend from app or dashboard.

**Gets you:** prevent screenshot (platform-dependent), license revoke, trace watermarks.

## Web HTML pack (legacy)

1. Open [drm.maipdf.com/pack.html](https://drm.maipdf.com/pack.html).
2. Upload PDF, set rules, download locked HTML.
3. Recipient double-clicks → browser → one-shot license check at open.

**Use when:** recipients will not install an app. **Limit:** browser cannot block system screenshots.

## Pick one

| Need | Path |
|---|---|
| Prevent screenshot | `.maipdf` + app |
| No install | Web HTML (accept limits) |
| Fastest send, rich logs | [maipdf.com](https://www.maipdf.com) link |

---

**Related:** [Prevent screenshot](/blog/en/prevent-screenshot-pdf-drm-native-app) · [vs LockLizard](/blog/en/maipdf-secure-vs-locklizard-pdf-drm) · [Three sharing models](/blog/en/online-vs-offline-pdf-security)
