---
title: "Distributing protected .maipdf files at scale"
description: "Team workflow for packing, sending, and revoking .maipdf packages with MaiPDF Secure."
pubDate: "Apr 1 2026"
updatedDate: "Jun 23 2026"
tags: ["Secure Share", ".maipdf", "PDF DRM", "enterprise"]
heroImage: "/offlinepages/result_download_zip_file.png"
showDefaultCta: false
---

<div class="intro-panel">
  <p>Enterprise-style distribution = one protected artifact per release, central license control, revoke without recall logistics. Use <code>.maipdf</code> + app when screenshot matters; web HTML only if install is blocked by policy.</p>
</div>

## Pattern

1. **Pack once** — app or web packer; freeze version name
2. **Rules baked in** — expiry, opens, device cap
3. **Distribute** — portal, USB, encrypted mail, approved share
4. **Open** — license check; app or browser
5. **Policy change** — extend, pause, revoke from dashboard (no file recall)

## Admin tasks

| Task | How |
|---|---|
| Extend contractor opens | Dashboard or `/manage` codes |
| Audit active licenses | Signed-in dashboard |
| Revoke after leak | Set license revoked — all copies fail next open |
| Enterprise procurement | Consider [LockLizard](/blog/en/maipdf-secure-vs-locklizard-pdf-drm) if IT owns vendor review |

## App vs HTML at scale

| | `.maipdf` + app | Web HTML |
|---|---|---|
| Rollout | Push app install once | Zero install |
| Screenshot | OS-level control | Not available |
| Support burden | "Install MaiPDF Secure" | Browser compatibility |

---

**Related:** [Enterprise solution overview](/blog/en/offline-pdf-drm-enterprise-solution) · [vs LockLizard](/blog/en/maipdf-secure-vs-locklizard-pdf-drm)
