---
title: "Protected PDF packages: .maipdf workflow guide"
description: "Pack, distribute, and revoke .maipdf files with MaiPDF Secure. Includes legacy web HTML option."
pubDate: "Apr 1 2026"
updatedDate: "Jun 23 2026"
tags: ["Secure Share", ".maipdf", "PDF DRM", "native app"]
showDefaultCta: false
---

<div class="intro-panel">
  <p>This guide replaces older "locked HTML package" wording. **Portable protected PDF = <code>.maipdf</code> + MaiPDF Secure app</strong> (June 2026). Treat web HTML output as a legacy no-install fallback.</p>
</div>

## Before you pack

- Final PDF version ready (repack required for content changes).
- Know if readers **can install an app** — if not, use web HTML and accept browser limits.
- Save License ID + Modification Code (web pack) or use Google sign-in (app/dashboard).

## Distribution checklist

| Step | App (`.maipdf`) | Web HTML |
|---|---|---|
| Pack | In MaiPDF Secure | [drm.maipdf.com/pack.html](https://drm.maipdf.com/pack.html) |
| Send | Email / USB / cloud | Same |
| Reader needs | App install | Browser only |
| Screenshot control | OS-level (varies) | Watermark only |
| Revoke | App or dashboard | `/manage` or dashboard |
| Test before wide send | Open on target OS | Open on target browser |

## After delivery

- Extend opens or expiry when a reviewer needs more time.
- Revoke if leak suspected — next open fails on every copy.
- Do **not** also send the raw PDF alongside the protected file.

## Honest scope

Not air-gapped. Not a replacement for enterprise DRM procurement — see [vs LockLizard](/blog/en/maipdf-secure-vs-locklizard-pdf-drm) if IT is involved.

---

**Related:** [Offline sharing overview](/blog/en/offline-pdf-sharing-complete-guide) · [Enterprise distribution](/blog/en/offline-pdf-drm-enterprise-solution)
