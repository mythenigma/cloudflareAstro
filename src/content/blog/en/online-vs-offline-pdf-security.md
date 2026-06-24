---
title: "MaiPDF sharing: link vs web HTML pack vs .maipdf"
description: "Three delivery modes at different security tiers. Web pack (PDF→HTML→ZIP) is not comparable to .maipdf native packing."
pubDate: "Apr 3 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/two%20comparison.png"
tags: ["Secure Share", ".maipdf", "Locked HTML"]
showDefaultCta: false
---

| Need | Use | Security tier |
|---|---|---|
| Fast share, swap file behind same link | [maipdf.com](https://maipdf.com/) link | Online viewer; watermark |
| Portable file, **no app install** | [pack.html](https://drm.maipdf.com/pack.html) web pack | Browser; **no** screenshot block |
| **Prevent screenshot** on PDF | `.maipdf` + [MaiPDF Secure app](https://drm.maipdf.com/) | Native; OS-level capture block |

The web packer produces **HTML in a ZIP** (PDF → encrypt → webpack bundle). `.maipdf` is packed and read in the **native app** — different pipeline, not a "recommended vs legacy" flavor of the same thing.

**China mainland app:** not first-wave on domestic stores → [download details](/blog/en/prevent-screenshot-pdf-drm-native-app)
