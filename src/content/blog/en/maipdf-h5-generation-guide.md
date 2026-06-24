---
title: "MaiPDF H5 / locked HTML package — pack.html guide"
description: "H5 and offline HTML mean pack.html: PDF to encrypted HTML in a ZIP. Not .maipdf desktop packing."
pubDate: "Mar 26 2026"
updatedDate: "Jun 23 2026"
heroImage: "/offlinepages/offline-MaiPDF-Home-Page.png"
tags: ["Secure Share", "Locked HTML", "PDF DRM"]
showDefaultCta: false
---

Older posts called it **H5** or **offline HTML**. That means the **web packer** at [pack.html](https://drm.maipdf.com/pack.html):

**PDF → AES encrypt → webpack locked HTML → ZIP download** → browser unlock.

| Step | Action |
|---|---|
| 1 | Open [pack.html](https://drm.maipdf.com/pack.html) |
| 2 | Upload PDF; set opens + expiry |
| 3 | Download ZIP; save License ID + Modification Code |
| 4 | Send file; recipient unlocks in browser |

Screenshots: [pack guide](/blog/en/how-to-create-offline-pdf-package-guide).

## Not the same as .maipdf

| | H5 / pack.html | `.maipdf` desktop app |
|---|---|---|
| Pack where | Browser | MaiPDF Secure app |
| Output | HTML in ZIP | `.maipdf` |
| Prevent screenshot | No | Yes |

→ [Prevent screenshot](/blog/en/prevent-screenshot-pdf-drm-native-app)
