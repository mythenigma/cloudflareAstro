# Stub / Placeholder Blog Post Cleanup Tracker

> **Created:** 2026-04-02
> **Issue:** 2026-01-15 有人从 GSC 404 导出清单批量生成了大量占位页面，内容极薄（只有 3 个万金油句子），对 SEO 有害。
> **Goal:** 逐条审查，决定 **重写 / 删除 / 保留**。

## Status Legend

| 标记 | 含义 |
|------|------|
| `[ ]` | 待处理 |
| `[R]` | 需要重写（有 SEO 价值的 slug） |
| `[D]` | 决定删除 |
| `[✓]` | 已完成处理 |

---

## Category A: "open-statistics-and-access-control-guide" 占位汇总页 (7 files)

之前有 50+ 篇好文章被 301 重定向到这些页面。重定向已在 middleware.ts 中删除。
这些页面本身内容极薄（3-9 行），建议重写或删除。

| # | Status | Language | File Path |
|---|--------|----------|-----------|
| 1 | `[✓]` | en | `src/content/blog/en/open-statistics-and-access-control-guide.md` — **DELETED** |
| 2 | `[ ]` | cn | `src/content/blog/cn/open-statistics-and-access-control-guide.md` |
| 3 | `[ ]` | de | `src/content/blog/de/open-statistics-and-access-control-guide.md` |
| 4 | `[ ]` | es | `src/content/blog/es/open-statistics-and-access-control-guide.md` |
| 5 | `[ ]` | fr | `src/content/blog/fr/open-statistics-and-access-control-guide.md` |
| 6 | `[ ]` | ja | `src/content/blog/ja/open-statistics-and-access-control-guide.md` |
| 7 | `[ ]` | ko | `src/content/blog/ko/open-statistics-and-access-control-guide.md` |

---

## Category B: Auto-Generated GSC 404 Stubs (92 files)

All marked with `<!-- Auto-generated from GSC 404 export on 2026-01-15. -->`
Content is identical template: 3 bullet points + 1 SVG diagram reference.

### B1. English (en/) — 35 files

| # | Status | File Path |
|---|--------|-----------|
| 8 | `[✓]` | `src/content/blog/en/dynamic-watermarks-on-pdf-cn.md` — **DELETED** |
| 9 | `[✓]` | `src/content/blog/en/easy-pdf-sharing.md` — **DELETED** |
| 10 | `[✓]` | `src/content/blog/en/educator-pdf-sharing-guide.md` — **DELETED** |
| 11 | `[✓]` | `src/content/blog/en/elegant-secure-sharing-resume-portfolio.md` — **DELETED** |
| 12 | `[✓]` | `src/content/blog/en/enterprise-document-security.md` — **DELETED** |
| 13 | `[✓]` | `src/content/blog/en/free-pdf-tools-to-boost-productivity.md` — **DELETED** |
| 14 | `[✓]` | `src/content/blog/en/image-sharing-security-guide.md` — **DELETED** |
| 15 | `[✓]` | `src/content/blog/en/maiimg-event-photo-distribution-guide.md` — **DELETED** |
| 16 | `[✓]` | `src/content/blog/en/maiimg-product-launch-image-hub.md` — **DELETED** |
| 17 | `[✓]` | `src/content/blog/en/maiimg-qr-code-generation.md` — **DELETED** |
| 18 | `[✓]` | `src/content/blog/en/maiimg-qr-code-sharing-guide.md` — **DELETED** |
| 19 | `[✓]` | `src/content/blog/en/maiimg-qrcode-generation-guide.md` — **DELETED** |
| 20 | `[✓]` | `src/content/blog/en/maiimg-real-estate-image-sharing-guide.md` — **DELETED** |
| 21 | `[✓]` | `src/content/blog/en/maiimg-social-media-campaign-calendar-guide.md` — **DELETED** |
| 22 | `[✓]` | `src/content/blog/en/maipdf-instant-link-generation-guide.md` — **DELETED** |
| 23 | `[✓]` | `src/content/blog/en/maipdf-view-count-setting-guide.md` — **DELETED** |
| 24 | `[✓]` | `src/content/blog/en/marketing-materials-dynamic-watermark.md` — **DELETED** |
| 25 | `[✓]` | `src/content/blog/en/network-verification-protocols.md` — **DELETED** |
| 26 | `[✓]` | `src/content/blog/en/pdf-access-control-view-limits.md` — **DELETED** |
| 27 | `[✓]` | `src/content/blog/en/pdf-access-control-view-limits-expiration.md` — **DELETED** |
| 28 | `[✓]` | `src/content/blog/en/pdf-access-control-viewing-limits.md` — **DELETED** |
| 29 | `[✓]` | `src/content/blog/en/pdf-dynamic-watermark-security-guide.md` — **DELETED** |
| 30 | `[✓]` | `src/content/blog/en/pdf-online-preview.md` — **DELETED** |
| 31 | `[✓]` | `src/content/blog/en/pdf-online-sharing-security-best-practices.md` — **DELETED** |
| 32 | `[✓]` | `src/content/blog/en/pdf-online-viewing-guide-browser-based-document-access.md` (slug 与标题路径对齐) |
| 33 | `[✓]` | `src/content/blog/en/pdf-qrcode-generation-tutorial.md` — **DELETED** |
| 34 | `[✓]` | `src/content/blog/en/pdf-safe-sharing-training-2.md` — **DELETED** |
| 35 | `[✓]` | `src/content/blog/en/pdf-security-best-practices.md` — **DELETED** |
| 36 | `[✓]` | `src/content/blog/en/pdf-sharing-control-revolution.md` — **DELETED** |
| 37 | `[✓]` | `src/content/blog/en/pdf-sharing-evolution-smart-control.md` — **DELETED** |
| 38 | `[✓]` | `src/content/blog/en/pdf-to-html-conversion.md` — **DELETED** |
| 39 | `[✓]` | `src/content/blog/en/pdf-to-shareable-link-tutorial.md` — **DELETED** |
| 40 | `[✓]` | `src/content/blog/en/programmer-document-security-maipdf.md` — **DELETED** |
| 41 | `[✓]` | `src/content/blog/en/safe-control-pdf.md` — **DELETED** |
| 42 | `[✓]` | `src/content/blog/en/wechat-pdf-sharing.md` — **DELETED** |
| 43 | `[✓]` | `src/content/blog/en/zero-cost-pdf-sharing.md` — **DELETED** |

### B2. Chinese (cn/) — 30 files

| # | Status | File Path |
|---|--------|-----------|
| 44 | `[ ]` | `src/content/blog/cn/convert-pdfs-to-shareable-links.md` |
| 45 | `[ ]` | `src/content/blog/cn/creative-portfolio-links-showcase-art-design-work-professionally.md` |
| 46 | `[ ]` | `src/content/blog/cn/designer-portfolio-sharing-tutorial/pdf-to-shareable-link-tutorial.md` |
| 47 | `[ ]` | `src/content/blog/cn/drm-limit-pdf-views-practical.md` |
| 48 | `[ ]` | `src/content/blog/cn/dynamic-watermarks-on-pdf.md` |
| 49 | `[ ]` | `src/content/blog/cn/fast-pdf-sharing-download-control.md` |
| 50 | `[ ]` | `src/content/blog/cn/how-to-share-pdf-online-securely-complete-guide.md` |
| 51 | `[ ]` | `src/content/blog/cn/how-to-share-pdfs-that-recipients-cant-download-or-copy.md` |
| 52 | `[ ]` | `src/content/blog/cn/image-sharing-security-guide.md` |
| 53 | `[ ]` | `src/content/blog/cn/instant-pdf-link-generation.md` |
| 54 | `[ ]` | `src/content/blog/cn/introducing-maiimg-secure-image-sharing-qr-codes.md` |
| 55 | `[ ]` | `src/content/blog/cn/limit-pdf-views-drm.md` |
| 56 | `[ ]` | `src/content/blog/cn/maiimg-qr-code-generation.md` |
| 57 | `[ ]` | `src/content/blog/cn/maiimg-secure-image-sharing-access-control.md` |
| 58 | `[ ]` | `src/content/blog/cn/minimalist-pdf-link-generator.md` |
| 59 | `[ ]` | `src/content/blog/cn/network-verification-protocols.md` |
| 60 | `[ ]` | `src/content/blog/cn/pdf-access-controls-practical-implementation.md` |
| 61 | `[ ]` | `src/content/blog/cn/pdf-security-best-practices-complete-guide.md` |
| 62 | `[ ]` | `src/content/blog/cn/pdf-security-set-view-limits-prevent-unauthorized-access.md` |
| 63 | `[ ]` | `src/content/blog/cn/pdf-sharing-benefits.md` |
| 64 | `[ ]` | `src/content/blog/cn/quick-pdf-links.md` |
| 65 | `[ ]` | `src/content/blog/cn/replace-email-attachments.md` |
| 66 | `[ ]` | `src/content/blog/cn/restrict-number-of-views-for-shared-pdf.md` |
| 67 | `[ ]` | `src/content/blog/cn/secure-document-distribution-for-corporate-teams.md` |
| 68 | `[ ]` | `src/content/blog/cn/secure-pdf-sharing-options.md` |
| 69 | `[ ]` | `src/content/blog/cn/share-design-portfolio-with-link.md` |
| 70 | `[ ]` | `src/content/blog/cn/share-pdf-online.md` |
| 71 | `[ ]` | `src/content/blog/cn/share-pdf-online-free-secure-tool.md` |
| 72 | `[ ]` | `src/content/blog/cn/share-pdf-securely.md` |
| 73 | `[ ]` | `src/content/blog/cn/skip-cloud-drive-hassle-share-health-reports-qr-code.md` |

### B3. German (de/) — 5 files

| # | Status | File Path |
|---|--------|-----------|
| 74 | `[ ]` | `src/content/blog/de/maiimg-bulk-image-sharing-guide.md` |
| 75 | `[ ]` | `src/content/blog/de/maiimg-event-photo-distribution-guide.md` |
| 76 | `[ ]` | `src/content/blog/de/maiimg-product-launch-image-hub.md` |
| 77 | `[ ]` | `src/content/blog/de/maiimg-quick-image-sharing-guide.md` |
| 78 | `[ ]` | `src/content/blog/de/maiimg-real-estate-image-sharing-guide.md` |

### B4. French (fr/) — 13 files

| # | Status | File Path |
|---|--------|-----------|
| 79 | `[ ]` | `src/content/blog/fr/controle-acces-pdf-guide.md` |
| 80 | `[ ]` | `src/content/blog/fr/creative-portfolio-links-showcase-art-design-work-professionally.md` |
| 81 | `[ ]` | `src/content/blog/fr/enterprise-pdf-document-management-guide.md` |
| 82 | `[ ]` | `src/content/blog/fr/filigranes-dynamiques-protection.md` |
| 83 | `[ ]` | `src/content/blog/fr/free-pdf-hosting.md` |
| 84 | `[ ]` | `src/content/blog/fr/generate-pdf-links-work-any-device.md` |
| 85 | `[ ]` | `src/content/blog/fr/partage-pdf-hors-ligne.md` |
| 86 | `[ ]` | `src/content/blog/fr/pdf-disable-printing-protection-guide.md` |
| 87 | `[ ]` | `src/content/blog/fr/pdf-dynamic-watermark-security-guide.md` |
| 88 | `[ ]` | `src/content/blog/fr/pdf-online-viewer-prevent-copy.md` |
| 89 | `[ ]` | `src/content/blog/fr/pdf-share-link-disable-download.md` |
| 90 | `[ ]` | `src/content/blog/fr/protocoles-verification-reseau.md` |
| 91 | `[ ]` | `src/content/blog/fr/secure-private-image-sharing-client-delivery.md` |

### B5. Japanese (ja/) — 4 files

| # | Status | File Path |
|---|--------|-----------|
| 92 | `[ ]` | `src/content/blog/ja/creative-portfolio-links-showcase-art-design-work-professionally.md` |
| 93 | `[ ]` | `src/content/blog/ja/dynamic-watermarks-advanced.md` |
| 94 | `[ ]` | `src/content/blog/ja/offline-pdf-drm-enterprise.md` |
| 95 | `[ ]` | `src/content/blog/ja/pdf-access-control-guide.md` |
| 96 | `[ ]` | `src/content/blog/ja/pdf-dynamic-watermark-security-guide.md` |

### B6. Korean (ko/) — 2 files

| # | Status | File Path |
|---|--------|-----------|
| 97 | `[ ]` | `src/content/blog/ko/enterprise-pdf-document-management-guide.md` |
| 98 | `[ ]` | `src/content/blog/ko/partage-pdf-en-ligne-securise-guide-complet.md` |

---

## Category C: Lorem Ipsum / Test Placeholder (2 files)

| # | Status | File Path | Notes |
|---|--------|-----------|-------|
| 99 | `[✓]` | `src/content/blog/en/second-post.md` — **DELETED** | 纯 Lorem ipsum 假文，无实际内容 |
| 100 | `[ ]` | `src/content/blog/fr/second-post.md` | Auto-generated stub |

---

## Summary

| Category | Count | Recommended Action |
|----------|-------|--------------------|
| A. 占位汇总页 | 7 | 重写为有价值内容，或删除 |
| B. GSC 404 自动生成 | 92 | 优先重写高价值 slug，其余删除 |
| C. Lorem ipsum | 2 | 直接删除 |
| **Total** | **101** | |

## How to use this file

1. 逐条审查：打开文件确认是 stub
2. 标记决定：`[R]` = 重写, `[D]` = 删除
3. 执行修改后改为 `[✓]`
4. 建议优先处理 en/ 的 35 个文件（影响最大）
