# MaiPDF 文章站 SEO 工作计划 (work.md)

> 站点: **article.maipdf.com** (Astro + Cloudflare Workers Static Assets)
> 最后更新: **2026-06-03**
> 本文件是唯一的工作计划，取代之前所有 governance / tracker / inventory 草稿。

---

## 0. TL;DR — 当前状态

- **技术问题(尾斜杠重复 / 404 / robots)已全部修复并上线。**
- **语言收缩完成**: 保留 **en / cn / es**，下线 **de / fr / ko / ja**。
- 站点现 **274 篇干净页**(en 128 / cn 96 / es 50)，薄页率 es 2% · en 14% · cn 19%。
- **剩余核心工作 = 内容**: 扩写 37 篇「短但真」页 + 围绕独有功能做长尾。

---

## 1. 背景: GSC 三大问题

| # | 问题 | 现象 | 状态 |
|---|------|------|------|
| 一 | **尾斜杠重复** | 每篇文章 `/x` 和 `/x/` 都返回 200，canonical/sitemap 指无斜杠，但 CF 默认把带斜杠当规范 → "Crawled, not indexed" + 573 个 "Alternative page" | ✅ 已修 |
| 二 | **批量薄多语言** | de/fr/ko/ja 把同一批文章机翻铺量，薄且同质，拖累全站质量信号 | ✅ 已砍 |
| 三 | **404 / robots** | GSC 404 ~356、Blocked by robots ~216，历史遗留 URL | ✅ 已处理 |

---

## 2. 已完成的技术修复 (已上线)

### 2.1 尾斜杠 (问题一)
- **根因**: Workers Static Assets 默认 `html_handling: auto-trailing-slash`，把目录 `foo/index.html` 当成「带斜杠为规范」，与 canonical/sitemap/`trailingSlash:'never'` 全部冲突。中间件的 301 对预渲染页**不生效**(资源层直接返回，绕过 worker)。
- **修复**: [wrangler.json](wrangler.json) 加 `"html_handling": "drop-trailing-slash"` → 无斜杠 200、带斜杠 307→无斜杠。已验证线上: `/x`=200, `/x/`=307→`/x`。
- **严格 301 (可选，未做)**: CF 原生是 307。要 301 需在 **Cloudflare 后台 → Rules → Redirect Rules** 加一条 Dynamic Redirect:
  - 匹配: `(http.host eq "article.maipdf.com" and ends_with(http.request.uri.path, "/") and not http.request.uri.path eq "/")`
  - 动作: 301，Preserve query string=on
  - 目标表达式: `concat("https://article.maipdf.com", regex_replace(http.request.uri.path, "/+$", ""))`
  - 与 drop-trailing-slash 不冲突、不死循环。

### 2.2 语言收缩 (问题二)
- 删除 `src/content/blog/{de,fr,ko,ja}` 整目录。
- [src/middleware.ts](src/middleware.ts) 对 `/blog/(de|fr|ko|ja)/*` 返回 **410 Gone**。
- 为何砍 ja: 下线前 ja 71 篇里 56 篇(79%)是薄 stub，是质量最差语言。
- es 保留原因: 早期已重度合并(薄页仅 2%)，且已能排名。

### 2.3 404 / robots (问题三)
- [src/data/blog-gone.mjs](src/data/blog-gone.mjs): GSC 报告里彻底删除、无对应页的 URL → 中间件返回 **410**(114 条)。
- [src/data/blog-legacy-redirects.mjs](src/data/blog-legacy-redirects.mjs): 旧版 EN URL(无语言前缀)+ 改名 slug → **301** 到现行 `/blog/en/*`(255 条)。
- [public/robots.txt](public/robots.txt): **解除** `/blog-backup/` 和 `/_astro/` 屏蔽 —— 原来挡住反而让失效 URL 永远卡在 "Blocked by robots.txt"；解除后 Google 能爬到 410 → 自然移除。
- 删除临时残留 `_tmp_restore.md`。

---

## 3. 路由处理机制 (维护参考)

中间件 [src/middleware.ts](src/middleware.ts) 只对**没有静态资源**的路径生效(线上页由资源层直接返回，不进中间件，所以以下逻辑永远不会误杀线上页)。处理顺序:

1. 跳过 `/`、`/_astro/`、带扩展名的文件。
2. `/blog/(de|fr|ko|ja)/*` 或 `/blog-backup/*` → **410**。
3. 命中 `BLOG_LEGACY_REDIRECTS` → **301**。
4. 命中 `BLOG_GONE` → **410**。
5. 其它带尾斜杠 → **301** 去斜杠。

**怎么加新规则**:
- 旧 URL 有对应新页 → 加到 `blog-legacy-redirects.mjs`(`"旧路径": "新路径"`)。
- 旧 URL 彻底没了 → 加到 `blog-gone.mjs` 的 Set。
- 整个语言下线 → 删目录 + 在中间件第 2 步正则加语言代码。

> 注意: 改文章后要 `npm run build` 刷新 sitemap(构建时生成)。

---

## 4. 部署与验证

```bash
wrangler login        # 浏览器授权 Cloudflare
npm run deploy        # = npm run build && wrangler deploy
```

验证(PowerShell 用 `curl.exe` 而非 `curl`):
```bash
curl.exe -sI https://article.maipdf.com/blog/en/benefits-of-pdf-access-control     # 200
curl.exe -sI https://article.maipdf.com/blog/en/benefits-of-pdf-access-control/    # 307→无斜杠
curl.exe -sI https://article.maipdf.com/blog/ja/share-pdf-online                   # 410
```
部署后: GSC 三个报告(Not found / Alternative page / Blocked by robots)各点一次 **VALIDATE FIX**，几周内自然下降。

---

## 5. 现状质量画像

| 语言 | 收录页 | 薄页(<150词) | 薄页% |
|------|--------|--------------|-------|
| es | 50 | 1 | 2% ✅ |
| en | 128 | 18 | 14% |
| cn | 96 | 18 | 19% |
| **合计** | **274** | **37** | **14%** |

实测排名(证明能赢长尾): `how to limit pdf views drm secure link` → `drm-limit-pdf-views-practical` **排第 1**。
核心结论: **不是没被收录(site: 正常)，是通用词竞争不过老站；机会在低竞争长尾 + 独有功能。**

---

## 6. 剩余工作 (按优先级)

### P0 — 部署 (见 §4)
技术修复已提交，需你跑 `npm run deploy` 才上线。

### P1 — 扩写 37 篇「短但真」页 (60–149 词)
不是删除，是加厚。每篇补 MaiPDF **独有功能实操**(Telegram 实时通知、控制码改/撤链、QR 分享、免注册、Fence View)+ 步骤截图。优先 en。

| 词数 | 页面 |
|------|------|
| 68 | en/maiimg-quick-image-sharing-guide |
| 69 | cn/team-collaboration-pdf-workflow |
| 70 | cn/document-security-compliance-checklist |
| 71 | cn/maiimg-image-sharing-workflow-5-steps · cn/safeguard-your-pdfs-online |
| 73 | cn/digital-watermarking-technology-technical-implementation |
| 74 | cn/faster-pdf-loading-enhanced-performance |
| 75 | cn/modify-link |
| 77 | en/maiimg-bulk-image-sharing-guide |
| 80 | en/maiimg-creative-portfolio-sharing-workflow |
| 89 | en/maiimg-event-photo-delivery-guide |
| 93 | cn/social-media-pdf-sharing |
| 94 | en/pdf-sharing-features-overview-visual-guide |
| 96 | en/maiimg-product-launch-image-distribution |
| 102 | cn/how-to-make-a-download-link-for-a-pdf |
| 105 | cn/image-hosting-service-comparison-free-image-hosting |
| 111 | cn/image-sharing-introduction · en/offline-vs-online-pdf-sharing-quick-choice |
| 112 | en/bulk-image-gallery-delivery |
| 114 | cn/pdf-share-link-disable-download |
| 118 | en/share-images-smarter-way-maiimg |
| 122 | en/one-click-share-multiple-images-gallery-sharing |
| 124 | en/free-image-storage-online-image-storage · en/offline-vs-online-pdf-sharing-visual-comparison |
| 127 | cn/share-pdf-whatsapp |
| 130 | cn/compliance-document-distribution |
| 133 | cn/maiimg-secure-image-sharing-access-control |
| 135 | en/watermark-protection-basics |
| 136 | cn/wechat-pdf-sharing |
| 137 | en/safe-client-image-delivery-tool |
| 140 | cn/share-pdf-facebook · en/social-media-image-gallery-sharing-guide |
| 143 | en/privnote-encrypted-note-sharing-complete-guide · en/privnote-secure-self-destruct-messages-guide |
| 144 | es/enterprise-pdf-document-management-guide |
| 148 | cn/maiimg-social-media-campaign-calendar-guide |
| 149 | en/privnote-self-destruct-messages-use-cases |

### P2 — 长尾选题 (新内容)
围绕竞品没有的功能做低竞争长尾(参考已排第 1 的 drm-limit-pdf-views 模式)。待产出选题清单。

### P3 — 外链 / 权威度
- 把已有词条(Capterra / GetApp / SoftwareAdvice)与主站 maipdf.com 的链接，导向文章子域重点页。
- 中期可评估: 把博客从子域 `article.maipdf.com` 迁到主站子目录 `maipdf.com/blog`(继承根域权威度，SEO 大杠杆，但属较大迁移)。

---

## 7. 关键文件索引

| 文件 | 作用 |
|------|------|
| [wrangler.json](wrangler.json) | `html_handling: drop-trailing-slash` |
| [src/middleware.ts](src/middleware.ts) | 运行时 301 / 410 路由 |
| [src/data/blog-legacy-redirects.mjs](src/data/blog-legacy-redirects.mjs) | 301 旧→新映射 |
| [src/data/blog-gone.mjs](src/data/blog-gone.mjs) | 410 永久删除清单 |
| [public/robots.txt](public/robots.txt) | 抓取规则 |
| [astro.config.mjs](astro.config.mjs) | `trailingSlash:'never'`、sitemap 配置 |
| [src/pages/blog/index.astro](src/pages/blog/index.astro) | 博客首页语言分区(现 en/cn/es) |
