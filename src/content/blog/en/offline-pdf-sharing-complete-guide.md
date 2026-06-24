---
title: "Protected PDF file sharing — complete overview"
description: "Choose between maipdf.com links, pack.html web HTML (PDF→ZIP), or .maipdf desktop app. Scenarios, security tiers, and links to full tutorials."
pubDate: "Feb 11 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/two%20comparison.png"
tags: ["Secure Share", "Locked HTML", ".maipdf", "PDF DRM"]
showDefaultCta: false
---

MaiPDF is **three delivery modes**, not one product with options. They differ in **what travels** (URL vs file), **where it opens** (browser vs app), and **whether OS screenshot can be blocked**.

Do not treat [pack.html](https://drm.maipdf.com/pack.html) web HTML and `.maipdf` desktop packing as "legacy vs recommended" — they are **different pipelines** with different security ceilings.

---

## Quick picker

| Your situation | Use |
|---|---|
| Fast share, swap PDF behind same link, per-open logs | [maipdf.com](https://www.maipdf.com) **link** |
| File must attach / USB / internal share, **no install** | [pack.html](https://drm.maipdf.com/pack.html) **web HTML** |
| Contract, courseware, confidential PDF, **prevent screenshot** | **MaiPDF Secure desktop app** → `.maipdf` |

---

## Tier 1 — Online link (maipdf.com)

**What happens:** upload PDF → configure expiry, opens, watermark, Fence View, email verification → share URL or QR → recipient reads in hosted browser viewer.

**Strengths:**

- Fastest send; no file attachment size politics
- Replace PDF behind the same link without re-mailing
- Richest access signals for ops teams

**Limits:**

- Document stays on MaiPDF infrastructure (not a portable file in recipient's inbox)
- **Cannot prevent screenshot** — watermark and viewer modes deter and trace, not block OS capture

**Full guide:** [PDF online DRM](/blog/en/pdf-online-drm-complete-guide) · [Share securely](/blog/en/share-pdf-securely)

---

## Tier 2 — Web HTML pack (pack.html)

**What happens:** upload in browser → AES-GCM-256 encrypt → key split → **webpack** locked HTML → **ZIP** download → recipient opens HTML locally → **Unlock** calls license server → PDF renders in browser.

**Strengths:**

- Portable **file** with server-enforced opens and expiry
- Revoke after send without recalling every attachment
- No recipient install or signup
- PDF not stored on our servers after pack

**Limits:**

- Internet required at **Unlock** (not air-gapped)
- **Cannot prevent screenshot**
- DevTools can extract PDF during a successful open
- Not the same as `.maipdf`

**Full guides:**

- [Complete pack walkthrough](/blog/en/how-to-create-offline-pdf-package-complete-guide)
- [4-step version with screenshots](/blog/en/how-to-create-offline-pdf-package-guide)
- [Team distribution](/blog/en/offline-pdf-drm-enterprise-solution)
- [Best practices](/blog/en/offline-pdf-package-distribution-best-practices)

---

## Tier 3 — Desktop `.maipdf` (MaiPDF Secure app)

**What happens:** pack in Windows/macOS (or mobile) app → export `.maipdf` → recipient installs app, signs in → native license check → **protected native viewer** with OS-level screenshot / recording controls where supported.

**Strengths:**

- **Prevent screenshot** (platform-dependent; test on target OS)
- Native viewer — no browser devtools path
- Device integrity checks
- Same revoke / expiry / device rules as web licenses

**Limits:**

- Recipients must install MaiPDF Secure
- Still needs network at unlock
- Cannot stop a second camera at the screen

**Full guide:** [Prevent screenshot complete guide](/blog/en/prevent-screenshot-pdf-drm-native-app)

---

## Comparison table

| | Online link | Web HTML pack | `.maipdf` app |
|---|---|---|---|
| Delivers | URL | HTML in ZIP | `.maipdf` file |
| Pack / create | maipdf.com upload | pack.html browser | Desktop app |
| Reader | Browser (hosted) | Browser (local HTML) | Native app |
| Install | No | No | Yes |
| Security tier | Online controls | Browser sandbox | OS-level |
| Prevent screenshot | No | No | **Yes** |
| Revoke after send | Yes | Yes | Yes |
| Rich access logs | Yes | Limited | License-focused |

---

## Common mistakes

1. **Calling web HTML ".maipdf"** — wrong format, wrong reader, wrong security expectations.
2. **Sending raw PDF + locked package** — recipient opens the unprotected copy.
3. **Expecting pack.html to block screenshots** — use the desktop app.
4. **Assuming "offline package" means air-gapped** — both file paths need network at unlock.
5. **Skipping recipient instructions** — especially "unzip before open" for ZIP-wrapped HTML.

---

## Related

- [Web vs app product page](/blog/en/offline-pdf-drm-mode)
- [Visual comparison](/blog/en/offline-vs-online-pdf-sharing-visual-comparison)
- [Introducing MaiPDF Secure (June 2026)](/blog/en/introducing-maipdf-secure-share)
