---
title: "MaiPDF Secure Share：网页打包 vs .maipdf 桌面 App"
description: "pack.html 是 PDF→HTML→ZIP 浏览器打包；.maipdf 是桌面 App 原生打包。安全等级不同。"
pubDate: "Jan 17 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["防止截屏", ".maipdf", "Secure Share", "PDF DRM"]
showDefaultCta: false
---

**Secure Share** 有两条线，共用 license 后台，**不是同一种打包**：

| | pack.html 网页打包 | 桌面 App `.maipdf` |
|---|---|---|
| 链路 | PDF→加密→HTML→ZIP | App 内打包 |
| 阅读 | 浏览器 | 只能 App 内 |
| **防止截屏** | ❌ | ✅ |
| 配图 | `/offlinepages/` 截图 | `/maipdf2026/offline/` 桌面截图 |

网页打包：对方不装 App 时用 → [完整教程](/blog/cn/how-to-create-offline-pdf-package-guide)（若有中文稿）

要 **PDF 防止截屏** → [桌面 App 专文](/blog/cn/prevent-screenshot-pdf-drm-native-app)

下载：[drm.maipdf.com](https://drm.maipdf.com/)（免费）
