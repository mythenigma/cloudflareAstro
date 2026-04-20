# Blog Governance Round 2 — Online MaiPDF Consolidation (EN)

> **Created:** 2026-04-20
> **Completed:** 2026-04-20
> **Scope:** `src/content/blog/en/` 中 online maipdf 主题，合并重复主题页面。
> **Result:** 新增 **73 条 301**，sitemap 从 774 → **701** URL。

## 本轮最终决定（全部已执行）

### Cluster 1 — Upload → Link
**Canonical:** `how-to-upload-a-pdf-and-generate-a-secure-link`
**301'd (7):** `minimalist-pdf-link-generator`, `convert-pdfs-to-shareable-links`, `pdf-shareable-links`, `pdf-to-shareable-link-tutorial`, `streamlined-document-sharing-upload-process`, `secure-pdf-links`, `maipdf-instant-link-generation-guide`
**Kept (distinct angles):** `make-pdf-into-a-link`（你精修过）, `create-pdf-links-actually-get-opened-5-strategies`（engagement strategies）

### Cluster 2 — Email Attachment → Link
**Canonical:** `pdf-link-sharing-modern-alternative-email-attachments`
**301'd (2):** `replace-email-attachments`, `email-pdf-links`
**Kept:** `pdf-attachment-vs-link-email-best-practices`（对比角度）

### Cluster 3 — Online Viewer / No Download
**Canonical:** `pdf-online-viewing-without-download`
**301'd (6):** `pdf-online-viewer`, `pdf-online-preview`, `pdf-online-viewing-guide-browser-based-document-access`, `pdf-online-sharing-security-best-practices`, `how-to-make-pdf-files-browsable-online-making-document-sharing-unprecedentedly-simple`, `prevent-pdf-downloads-complete-guide-view-only-sharing`
**Kept:** `pdf-online-viewer-prevent-copy`, `pdf-online-drm-complete-guide`, `pdf-share-link-disable-download`, `prevent-pdf-downloads-view-only`, `how-to-make-a-download-link-for-a-pdf`

### Cluster 4 — View Limits / DRM
**Canonical:** `limit-pdf-views-drm`（延续 Round 1）
**301'd (16):** `drm-limit-pdf-views-practical`, `setting-view-limits`, `secure-pdf-view-limits`, `restrict-number-of-views-for-shared-pdf`, `share-smart-limit-pdf-access-by-view-count`, `view-limits-and-expiration`, `pdf-access-control-setting-view-limits-time-restrictions`, `pdf-access-control-view-limits`, `pdf-access-control-view-limits-expiration`, `pdf-access-control-viewing-limits`, `pdf-access-controls-practical-implementation`, `pdf-access-limit-control-guide`, `pdf-security-set-view-limits-prevent-unauthorized-access`, `pdf-set-view-count-limit-guide`, `pdf-temporary-sharing-link`, `control-pdf-downloads-permissions`
**Kept:** `pdf-link-view-limit-watermark`（水印+限次综合）, `benefits-of-pdf-access-control`（价值主张）

### Cluster 5 — Dynamic Watermark
**Canonical:** `dynamic-watermarks-on-pdf`（Round 1 已确立）
**301'd (5):** `digital-watermarks-pdf-protection-guide`, `pdf-dynamic-watermark-security-guide`, `marketing-materials-dynamic-watermark`, `pdf-watermarking-protect-documents-dynamic-security`, `watermark-intelligence-advanced-protection`
**Kept:** `digital-watermarking-technology-technical-implementation`（技术深讲）, `watermark-protection-basics`（入门）

### Cluster 6 — Email Verification Gate
**Canonical:** `email-verified-pdf-links`
**301'd (1):** `email-verification-for-pdf-access`

### Cluster 7 — QR Sharing（双 canonical）
**Canonical A (tutorial):** `pdf-sharing-with-qr-code-complete-guide`
**Canonical B (distribution use-cases):** `qr-codes-for-document-distribution`
**301'd to A (4):** `qr-code-pdf-sharing-made-easy`, `pdf-qr-code-generation-maipdf`, `create-qr-code-for-pdf-download`, `instant-pdf-sharing-with-qr-codes-how-it-works`
**301'd to B (2):** `mobile-qr-code-pdf-reading`, `mobile-qr-scan-read-pdf-guide`
**Kept:** `skip-cloud-drive-hassle-share-health-reports-qr-code`（垂直场景）

### Cluster 8 — Anti-forward / No-print
**Canonicals:** `pdf-prevent-forwarding-guide` / `maipdf-print-restriction-guide`
**301'd (2):** `pdf-encryption-prevent-forwarding-complete-guide` → prevent-forwarding; `pdf-disable-printing-protection-guide` → print-restriction
**Kept:** `prevent-file-copying-protection-guide`（防复制自成一簇）

### Cluster 9 — Generic Security Umbrella（双 canonical）
**Canonical A (intro):** `share-pdf-online`
**Canonical B (protection focus):** `share-pdf-securely`
**301'd to B (10):** `pdf-security-best-practices`, `pdf-security-best-practices-complete-guide-document-protection`, `pdf-security-features`, `modern-pdf-protection-tools`, `pdf-safe-sharing-training`, `pdf-safe-sharing-training-2`, `safe-control-pdf`, `secure-pdf-sharing-options`, `pdf-security-protection`, `fast-pdf-sharing-download-control`
**301'd to A (6):** `free-secure-pdf-sharing-tool-complete-guide`, `free-pdf-tools-to-boost-productivity`, `host-pdf-online-secure-sharing-guide`, `easy-pdf-sharing`, `smart-pdf-sharing`, `zero-cost-pdf-sharing`
**Kept:** `safeguard-your-pdfs-online`, `complete-pdf-security-comprehensive-protection`, `free-online-drm-for-pdf`, `free-pdf-sharing-tools-comparison-guide`, `free-pdf-hosting`

### Cluster 10 — Product Intro / Workflow
**Canonical:** `maipdf-secure-efficient-sharing`
**301'd (7):** `maipdf-a-practical-tool-for-controlled-pdf-sharing`, `pdf-sharing-introduction`, `pdf-sharing-benefits`, `pdf-sharing-control-revolution`, `pdf-sharing-evolution-smart-control`, `pdf-sharing-revolution-maipdf`, `pdf-links-smart-document-sharing-guide`
**Kept:** `maipdf-complete-workflow-guide-with-diagrams`, `maipdf-settings-explained-access-controls-on-the-upload-screen`, `pdf-sharing-features-overview-visual-guide`

### Cluster 11 — Portfolio & Resume（双 canonical）
**Canonicals:** `share-design-portfolio-with-link` / `resume-link-generator-share-cv-professionally-securely`
**301'd to portfolio (3):** `create-professional-portfolio-links-showcase-work-pro`, `creative-portfolio-links-showcase-art-design-work-professionally`, `design-portfolio-sharing-create-links-get-hired`
**301'd to resume (2):** `elegant-secure-sharing-resume-portfolio`, `share-resume-safely-link`
**Kept:** `freelancer-portfolio-links-win-more-clients-with-clear-sharing`, `secure-portfolio-sharing-for-designers`

---

## 执行方式

1. ✅ 73 条新 301 已追加到 [`src/data/blog-legacy-redirects.mjs`](src/data/blog-legacy-redirects.mjs)
2. ✅ 73 个源 `.md` 文件 frontmatter 加 `noindex: true`（含 BOM 文件处理）
3. ✅ `npx astro build` 通过；sitemap 自动排除 noindex
4. ✅ 核验：sitemap 774 → 701（恰好 -73）

## 下一轮建议

- **cn/ 补齐**：Round 1 已做 ~30 条 cn 301，按 EN 的 11 簇对齐补齐剩余
- **de/ / es/ / fr/ / ja/ / ko/**：用相同 11 簇结构各自评审
- **offline maipdf 整合**（13 篇）：主要整合 `offline-vs-online-pdf-sharing-*` 三连
- **maiimg 整合**（38 篇）：`maiimg-*-guide` 行业模板文可能有大量重叠
