# Blog Governance Round 1

Scope: English + Chinese + French + German + Japanese + Korean + Spanish blog posts.

## Action Counts
- en / keep: 197
- en / 301: 20
- en / noindex: 1
- cn / keep: 148
- cn / 301: 35
- cn / noindex: 0
- fr / keep: 74
- fr / 301: 0
- fr / noindex: 0
- de / keep: 129
- de / 301: 0
- de / noindex: 0

- ja / keep: 71
- ja / 301: 4
- ja / noindex: 0
- ko / keep: 44
- ko / 301: 4
- ko / noindex: 0
- es / keep: 112
- es / 301: 5
- es / noindex: 0

## Sitemap (current policy)
- **robots.txt** points to `https://article.maipdf.com/sitemap-index.xml`.
- **Generation**: `@astrojs/sitemap` at build time (`dist/sitemap-index.xml` -> `dist/sitemap-0.xml`).
- **Exclusions**:
  - Any blog markdown carrying frontmatter `noindex: true` (including governance 301 source placeholders) is excluded via `astro.config.mjs` sitemap `filter`.
  - `/blog-backup/` and `/fonts` are excluded.
  - Verified that **legacy redirect source URLs** (from `src/data/blog-legacy-redirects.mjs`) do **not** appear in the sitemap.
- **Sanity check (latest build)**: 774 total URLs, 770 `/blog/` URLs.

## Implemented 301 Sources
- `en/drm-limit-pdf-views` -> `en/limit-pdf-views-drm`
- `en/dynamic-watermarks-on-pdf-cn` -> `en/dynamic-watermarks-on-pdf`
- `en/first-post` -> `en/share-design-portfolio-with-link`
- `en/instant-pdf-link-generation` -> `en/how-to-upload-a-pdf-and-generate-a-secure-link`
- `en/limiting-pdf-views` -> `en/limit-pdf-views-drm`
- `en/maipdf-secure-efficient-pdf-sharing` -> `en/maipdf-secure-efficient-sharing`
- `en/modify-link` -> `en/modify-pdf-links`
- `en/pdf-link-generator-ultimate-tool-professional-sharing` -> `en/how-to-upload-a-pdf-and-generate-a-secure-link`
- `en/pdf-one-click-share-links-maipdf` -> `en/how-to-upload-a-pdf-and-generate-a-secure-link`
- `en/pdf-qrcode-generation-tutorial` -> `en/pdf-sharing-with-qr-code-complete-guide`
- `en/pdf-share-online` -> `en/share-pdf-online`
- `en/pdf-to-qr` -> `en/pdf-sharing-with-qr-code-complete-guide`
- `en/qr-codes-for-pdf-access` -> `en/qr-codes-for-document-distribution`
- `en/qr-codes-future-digital-distribution` -> `en/qr-codes-for-document-distribution`
- `en/qr-codes-pdf-distribution-modern-approach` -> `en/qr-codes-for-document-distribution`
- `en/quick-pdf-links` -> `en/how-to-upload-a-pdf-and-generate-a-secure-link`
- `en/second-post` -> `en/pdf-link-sharing-modern-alternative-email-attachments`
- `en/share-pdf-as-link-not-attachment` -> `en/pdf-link-sharing-modern-alternative-email-attachments`
- `en/transform-pdfs-shareable-links-3-steps` -> `en/how-to-upload-a-pdf-and-generate-a-secure-link`
- `en/upload-pdf-get-link` -> `en/how-to-upload-a-pdf-and-generate-a-secure-link`
- `cn/convert-pdfs-to-shareable-links` -> `cn/upload-pdf-get-link`
- `cn/creative-portfolio-links-showcase-art-design-work-professionally` -> `cn/share-design-portfolio-with-link`
- `cn/designer-portfolio-sharing-tutorial/pdf-to-shareable-link-tutorial` -> `cn/share-design-portfolio-with-link`
- `cn/drm-limit-pdf-views-practical` -> `cn/pdf-set-view-count-limit-guide`
- `cn/dynamic-watermarks-on-pdf` -> `cn/pdf-dynamic-watermark-security-guide`
- `cn/dynamic-watermarks-on-pdf-cn` -> `cn/pdf-dynamic-watermark-security-guide`
- `cn/fast-pdf-sharing-download-control` -> `cn/share-pdf-securely`
- `cn/how-to-share-pdf-online-securely-complete-guide` -> `cn/share-pdf-securely`
- `cn/how-to-share-pdfs-that-recipients-cant-download-or-copy` -> `cn/pdf-share-link-disable-download`
- `cn/image-sharing-security-guide` -> `cn/maiimg-secure-image-sharing-access-control`
- `cn/instant-pdf-link-generation` -> `cn/upload-pdf-get-link`
- `cn/introducing-maiimg-secure-image-sharing-qr-codes` -> `cn/maiimg-qr-code-sharing-guide`
- `cn/limit-pdf-views-drm` -> `cn/pdf-set-view-count-limit-guide`
- `cn/maiimg-qr-code-generation` -> `cn/maiimg-qrcode-generation-guide`
- `cn/minimalist-pdf-link-generator` -> `cn/maipdf-link-generation-guide`
- `cn/mobile-qr-code-pdf-reading` -> `cn/mobile-qr-scan-read-pdf-guide`
- `cn/network-verification-protocols` -> `cn/mobile-verification-document-security`
- `cn/one-click-pdf-link-qrcode` -> `cn/qr-code-pdf-sharing`
- `cn/one-click-pdf-sharing-wechat` -> `cn/wechat-pdf-sharing`
- `cn/pdf-access-controls-practical-implementation` -> `cn/pdf-access-limit-control-guide`
- `cn/pdf-qrcode-generation-tutorial` -> `cn/pdf-qr-code-generation-guide`
- `cn/pdf-security-best-practices-complete-guide` -> `cn/pdf-security-protection`
- `cn/pdf-security-set-view-limits-prevent-unauthorized-access` -> `cn/pdf-set-view-count-limit-guide`
- `cn/pdf-sharing-benefits` -> `cn/share-pdf-online`
- `cn/qrcode-pdf-sharing` -> `cn/qr-code-pdf-sharing`
- `cn/qrcode-pdf-sharing-revolution` -> `cn/qr-code-pdf-sharing`
- `cn/quick-pdf-links` -> `cn/upload-pdf-get-link`
- `cn/replace-email-attachments` -> `cn/share-pdf-online`
- `cn/replace-pdf-keep-link-maipdf` -> `cn/replace-pdf-keep-the-same-link`
- `cn/restrict-number-of-views-for-shared-pdf` -> `cn/pdf-set-view-count-limit-guide`
- `cn/scan-qrcode-read-pdf` -> `cn/mobile-qr-scan-read-pdf-guide`
- `cn/secure-document-distribution-for-corporate-teams` -> `cn/enterprise-document-security-management`
- `cn/secure-pdf-sharing-options` -> `cn/maipdf-best-choice-secure-pdf-sharing`
- `cn/share-pdf-online-free-secure-tool` -> `cn/share-pdf-online`
- `cn/skip-cloud-drive-hassle-share-health-reports-qr-code` -> `cn/secure-document-sharing-in-healthcare`
- `ja/first-post` -> `ja/share-design-portfolio-with-link`
- `ja/generate-pdf-links-work-any-device` -> `ja/pdf-one-click-share-links-maipdf`
- `ja/pdf-to-qr` -> `ja/qr-code-pdf-sharing-made-easy`
- `ja/qr-codes-future-digital-distribution` -> `ja/qr-codes-for-document-distribution`
- `ko/first-post` -> `ko/share-design-portfolio-with-link`
- `ko/maipdf-qrcode-generation-guide` -> `ko/qr-code-pdf-sharing-made-easy`
- `ko/partage-pdf-en-ligne-securise-guide-complet` -> `ko/pdf-sharing-introduction`
- `ko/pdf-to-qr` -> `ko/qr-code-pdf-sharing-made-easy`
- `es/dynamic-watermarks-on-pdf-cn` -> `es/pdf-dynamic-watermark-security-guide`
- `es/first-post` -> `es/share-design-portfolio-with-link`
- `es/pdf-to-qr` -> `es/qr-code-pdf-sharing-made-easy`
- `es/qr-codes-future-digital-distribution` -> `es/qr-code-pdf-sharing-made-easy`
- `es/quick-pdf-links` -> `es/upload-pdf-get-link`

## Direct Noindex Sources
- `en/_tmp_restore`
