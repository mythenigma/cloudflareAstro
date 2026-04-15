# Blog Governance Round 1

Scope: English + Chinese blog posts only.

## Action Counts
- en / keep: 197
- en / 301: 20
- en / noindex: 1
- cn / keep: 148
- cn / 301: 35
- cn / noindex: 0

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

## Direct Noindex Sources
- `en/_tmp_restore`

## Refinement Progress

Last updated in this tracker: 2026-04-15.

### Current Working Standard
- Keep fewer, stronger canonical pages instead of many near-duplicate SEO pages.
- Preserve useful ideas from redirected/legacy pages, but rewrite the canonical page instead of pasting old copy.
- Use a scan-friendly "newspaper" structure: short intro, clear section headings, compact tables, workflow blocks, scenario blocks, and direct slug-answer endings.
- Avoid long paragraphs, loose bullet stacks, repeated manual related-reading blocks, and generic "Final takeaway" sections.
- Prefer landscape `show_off` images when a visual supports the section; do not use images as decoration only.
- Do not mechanically set every `updatedDate` to the same day. Only update dates for substantial rewrites, and keep dates natural across pages.
- Do not run `build` during this content pass unless explicitly requested.

### Layout / Template Adjustments
- Updated `src/layouts/BlogPost.astro` mobile table behavior so tables fit narrow screens better:
- Mobile tables now use fixed layout, wrapping text, smaller padding, and no forced first-column `nowrap`.

### Sitemap Status
- `dist/sitemap-0.xml` and `dist/sitemap-index.xml` were refreshed from the current content files without running a full build.
- Current sitemap blog URL counts after `noindex` filtering:
- English blog URLs: 197
- Chinese blog URLs: 148
- Reduction from the first-round governance scope:
- English: 21 fewer URLs (`20` legacy 301 sources + `1` direct noindex)
- Chinese: 35 fewer URLs (`35` legacy 301 sources)

### Canonical Pages Already Refined

English:
- `en/how-to-upload-a-pdf-and-generate-a-secure-link`
- `en/share-pdf-online`
- `en/share-pdf-securely`
- `en/pdf-link-sharing-modern-alternative-email-attachments`
- `en/limit-pdf-views-drm`
- `en/pdf-online-viewing-without-download`
- `en/maipdf-secure-efficient-sharing`
- `en/modify-pdf-links`
- `en/pdf-sharing-with-qr-code-complete-guide`
- `en/share-design-portfolio-with-link`
- `en/convert-pdfs-to-shareable-links`
- `en/make-pdf-into-a-link`
- `en/pdf-to-shareable-link-tutorial`
- `en/host-pdf-online-secure-sharing-guide`
- `en/create-pdf-links-actually-get-opened-5-strategies`
- `en/control-pdf-downloads-permissions`

Chinese:
- `cn/upload-pdf-get-link`
- `cn/share-pdf-online`
- `cn/share-pdf-securely`
- `cn/pdf-set-view-count-limit-guide`
- `cn/pdf-online-viewing-without-download`
- `cn/maipdf-best-choice-secure-pdf-sharing`
- `cn/pdf-share-link-disable-download`
- `cn/enterprise-document-security-management`
- `cn/replace-pdf-keep-the-same-link`
- `cn/qr-code-pdf-sharing`
- `cn/share-design-portfolio-with-link`

### Notes From User Direction
- The page should feel like a professional 2026 SaaS/product content page, not an old SEO article.
- Readers should understand each block by scanning headings and tables; deeper reading should be optional.
- Avoid wasting vertical space with repetitive `heading + many bullets` layouts.
- Avoid portrait images where they make the page hard to lay out.
- Endings should directly answer the slug/query, for example: upload in MaiPDF, set options, share link/QR, no install, reader usually does not need to register.

### Next Priority Candidates
- Clean remaining old HTML-heavy or loose-list pages surfaced by `rg` for `intro-panel`, manual `Related reading`, `Final takeaway`, and many `###` subheadings.
- Continue with high-value English/CN PDF access, watermark, view-only, and business-use pages before touching lower-priority long-tail pages.
- Revisit legacy `301` implementation later: middleware redirects exist, but prerendered legacy source pages may still be generated unless the blog route excludes redirect sources.
