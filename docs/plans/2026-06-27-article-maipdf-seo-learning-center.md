# article.maipdf.com SEO Learning Center 改版计划

> **For Hermes:** Use this plan as the working sequence for the cloudflareAstro project.

**Goal:** 把 `article.maipdf.com` 从旧式产品落地页/文章列表，改成清晰承接 Google 搜索流量的 MaiPDF / Maiimg 内容中心，并重点纳入新上线 App 的防截图、设备绑定、`.maipdf` DRM 能力。

**Architecture:** `maipdf.com` 是总官网，表达 Online Sharing + App DRM 两条产品线；`drm.maipdf.com` 是 App DRM / `.maipdf` 专门站；`article.maipdf.com` 是 SEO 博客内容站，负责解释功能、场景、教程、对比和长尾问题，不承担主产品操作入口职责。

**Tech Stack:** Astro 5, Cloudflare Workers Static Assets, Markdown/MDX content, Tailwind/global CSS.

---

## Phase 1 — 首页重定位

**Objective:** 重写 `src/pages/index.astro`，让首页成为 MaiPDF Learning Center，而不是产品主页。

**Files:**
- Modify: `src/pages/index.astro`
- Reference: `src/consts.ts`

**Content direction:**
- Hero: `MaiPDF Secure Sharing Guides`
- Subcopy: Practical guides for online PDF sharing, App DRM, screenshot protection, watermarks, QR codes, and access control.
- Topic cards:
  - Online PDF Sharing
  - App DRM & `.maipdf`
  - Screenshot Protection
  - View Limits & Expiry
  - Watermark & Tracking
  - Maiimg Image Sharing
- Add comparison section: Browser sharing is fast; App DRM adds stronger screenshot/device controls.
- CTAs:
  - Read the guides → `/blog`
  - Try online sharing → `https://maipdf.com`
  - Learn App DRM → `https://drm.maipdf.com`

**Verification:**
- Run Windows Node build: `cmd.exe /c "cd /d C:\Users\chanz\Documents\GitHub\cloudflareAstro && npm run build:fast"`
- Capture desktop/mobile screenshots.

---

## Phase 2 — Header 与暗色模式修复

**Objective:** 修复顶部标题/导航/搜索在夜间模式和移动端的可读性问题。

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/styles/global.css`

**Design direction:**
- 建立统一 light/dark CSS variables。
- Header 使用高对比背景和文字，不再混用 `body.dark-mode`、`.dark`、`header.dark` 的不一致规则。
- 移动端减少顶部控件压迫感。
- 暗色模式下标题、链接、卡片、搜索框必须清晰可读。

**Verification:**
- Build pass.
- Inspect homepage and blog in desktop/mobile screenshots.

---

## Phase 3 — 博客首页重构

**Objective:** 把 `/blog` 从语言三列列表改成主题化内容导航。

**Files:**
- Modify: `src/pages/blog/index.astro`

**Content direction:**
- Top: Blog / Learning Center heading.
- Primary topic chips:
  - PDF Sharing
  - App DRM
  - Anti-Screenshot
  - View Limits
  - Watermark
  - QR Codes
  - Maiimg
- Keep language filters, but不要让语言列表成为唯一结构。
- Add featured/recommended guides before full list.
- Remove or replace weird `Discover more` topics if sourced from local components/data.

**Verification:**
- Build pass.
- Confirm no broken links.

---

## Phase 4 — 旧文章审计

**Objective:** 找出需要更新 App DRM / 防截图能力的旧文章。

**Files:**
- Inspect: `src/content/blog/en/*.md`, `src/content/blog/cn/*.md`, `src/content/blog/es/*.md`

**Search targets:**
- screenshot
- prevent download
- prevent forwarding
- DRM
- view limit
- watermark
- secure PDF sharing
- browser viewer
- offline PDF
- `.maipdf`

**Update rules:**
- 旧网页能力不要夸大成真正防截图。
- 加入明确区分：browser-based sharing vs App DRM.
- 加内链到 `https://drm.maipdf.com`。
- 把防截图、设备绑定、`.maipdf` 放入相关旧文章。

**Verification:**
- Build pass.
- Spot-check generated pages.

---

## Phase 5 — 新增英文 SEO 长尾内容

**Objective:** 围绕 App 防截图新能力新增英文内容，优先承接 Google 搜索。

**Candidate articles:**
1. `how-to-prevent-screenshots-of-a-pdf.md`
2. `browser-pdf-viewer-vs-app-drm.md`
3. `what-is-a-maipdf-file.md`
4. `secure-pdf-reader-with-screenshot-protection.md`
5. `pdf-device-binding-explained.md`
6. `online-pdf-sharing-vs-app-drm.md`

**Content requirements:**
- 真实解释：浏览器无法完全阻止系统截图，App DRM 才能提供更强控制。
- 强调防截图、设备绑定、撤销访问、动态水印、`.maipdf`。
- 内链到 `maipdf.com`、`drm.maipdf.com`、相关文章。

**Verification:**
- Build pass.
- Check sitemap generation.

---

## Phase 6 — 最终回归

**Objective:** 确认站点技术和内容方向稳定。

**Checks:**
- `npm run build:fast` passes.
- `/`、`/blog`、重点新文章截图正常。
- `/sitemap-index.xml` 和 `/sitemap-0.xml` 正常。
- 404 still returns 404.
- Dark mode readable.
- Mobile first screen communicates content-site purpose.
