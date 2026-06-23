# MaiPDF 文章站 SEO 工作计划 (work.md)

> 站点: **article.maipdf.com** (Astro + Cloudflare Workers Static Assets)
> 最后更新: **2026-06-23**
> 本文件是唯一的工作计划，取代之前所有 governance / tracker / inventory 草稿。

---

## 0. TL;DR — 当前状态

- **技术问题(尾斜杠重复 / 404 / robots)已全部修复并上线。**
- **语言收缩完成**: 保留 **en / cn / es**，下线 **de / fr / ko / ja**。
- 站点现 **274 篇干净页**(en 128 / cn 96 / es 50)，薄页率 es 2% · en 14% · cn 19%。
- **2026-06 新产品线**: 原生 DRM App（**dongle**）本月刚上线，博客大量内容仍只写在线版 `maipdf.com`，**需要系统性改版**（见 §0.1、§6 P0）。
- **剩余核心工作 = 内容**: 旧文 AI 味重、排名差 → **重写为短稿、关键词前置**（见 §0.2）；优先 `防止截屏` / `prevent screenshot` 集群。

---

## 0.1 MaiPDF 产品生态认知（写博客必读）

> 2026-06-23 整理。改文章、写新稿、定 CTA 前先对照本节，避免把「在线分享」和「原生 DRM」混为一谈。

### 四个仓库 / 站点，各干各的

| 代号 / 仓库 | 线上地址 | 技术栈 | 干什么 |
|-------------|----------|--------|--------|
| **cloudflareAstro**（本仓库） | `article.maipdf.com` | Astro 5 + Cloudflare Workers | **SEO 内容站**：多语言博客，引流、教育、长尾排名 |
| **maipdf.com**（PHP 后端） | `maipdf.com` | PHP + MySQL | **Cloud Share 在线分享**：上传 PDF → 生成链接/二维码，浏览器内阅读；访问次数、过期、水印、Fence View、控制码撤链等 |
| **AustraliaGuide** | `drm.maipdf.com` | Cloudflare Pages + D1 | **DRM 产品线落地页 + API**：打包 `.maipdf`、许可证管理、设备绑定、Web 端 pack/dashboard |
| **dongle** | App 分发（见 `drm.maipdf.com` 下载） | Flutter（Win / macOS / Linux / Android / iOS） | **原生 DRM 阅读器 App**：本地加密打包、许可证校验、**OS 级防截图/防录屏**、设备完整性检测、Firebase 登录 |

### 为什么要有 dongle（原生 App）？

MaiPDF 在线版（`maipdf.com`）的核心限制是：**网页跑在浏览器沙箱里，无法调用操作系统级的屏幕捕获防护**。

- 在线版能做的：访问次数、过期、动态水印、Fence View、邮件验证、控制码改链——都是**浏览器内**的 DRM 风格控制。
- 在线版做不到的：**阻止用户用系统快捷键 / 系统 API 截图或录屏**（最多检测、水印追责，不能从底层挡住）。
- **dongle 的价值**：用 Flutter 一套代码出四个桌面/移动平台，通过原生能力（如 `SecureScreen`）在 **macOS / Windows / Android / iPhone** 上启用 OS 级防截图、防录屏。
- 注意：**防拍照**（拿另一台手机拍屏幕）任何方案都做不到；产品叙事里不要过度承诺。

一句话：**`maipdf.com` = 方便的链接分享；`drm.maipdf.com` + dongle = 需要更强泄露防护时的原生 DRM 方案。**

### 用户路径（博客 CTA 应对齐）

```
搜索 / 社交推荐
    ↓
article.maipdf.com（本博客，获客 + 教育）
    ↓
┌─────────────────────────────┬──────────────────────────────┐
│  轻度需求：发链接、控次数    │  重度需求：合同/教材/机密 PDF  │
│  → maipdf.com（免装 App）   │  → drm.maipdf.com            │
│                             │    → 下载 dongle 原生 App     │
│                             │    → 本地打包 .maipdf         │
│                             │    → OS 级防截图阅读          │
└─────────────────────────────┴──────────────────────────────┘
```

### dongle App 功能摘要（改博客时引用）

- **本地打包**：在 App 内选 PDF → 加密生成 `.maipdf` 包（内含 locked HTML reader）。
- **许可证生命周期**：创建 / 延期 / 吊销 / 删除；设备数限制；与 `drm.maipdf.com/api/` 同步。
- **安全阅读**：DRM 受保护查看器；各平台 SecureScreen / 同类原生防护。
- **管理界面**：App 内许可证管理页（`drm_license_manage_page.dart`）；Web 端 `drm.maipdf.com` dashboard 亦可管理。
- **身份**：Firebase + Google 登录（桌面版 release 需编译 OAuth 密钥，否则启动即报错页）。
- **设备完整性**：Root/越狱/调试环境检测， compromised 设备拒绝运行。

更细的架构、API 映射、开发笔记见 dongle 仓库内 **`work.html`**（约 20 个 tab 的内网式开发面板）。

### 本博客（article.maipdf.com）目前的问题

**绝大多数文章写于原生 App 出现之前**，存在系统性过时：

| 问题 | 现状 | 应改为 |
|------|------|--------|
| CTA 单一 | 几乎全指向 `maipdf.com` | 按场景分流：轻量 → 在线；强 DRM → `drm.maipdf.com` / App |
| 「DRM」含义模糊 | 多指浏览器内访问控制 | 区分 **在线 DRM** vs **原生 DRM（dongle）** |
| 防截图表述 | 偶有「screen capture detection」等 Web 能力描述 | 明确：**只有原生 App 能做 OS 级拦截**；在线版靠水印 + 访问控制 |
| 离线 / `.maipdf` | 部分文章提 offline HTML 包，未提新 App | 与 dongle 打包流程、`drm.maipdf.com` 对齐 |
| 产品时间线 | 无 2026-06 原生线 | 新稿/大改稿注明 MaiPDF Secure（原生）为 2026 新能力 |

### 写博客时的叙事原则

1. **不贬低在线版**：在线版仍是主流量入口，免注册、即传即分享。
2. **原生版讲「为什么」**：不是功能列表堆砌，而是「什么时候必须从网页升级到 App」——机密合同、付费教材、内训资料、需要防系统截图的场景。
3. **诚实边界**：防截图 ≠ 防拍照；水印是在线版的兜底追责手段。
4. **人人可用、不必高价**：MaiPDF Secure **免费可用**（当前），个人/学生/自由职业/公司均可下载使用；不要写成「仅小企业」或「必须企业采购」。传统 DRM（如 LockLizard）是**付费企业级**；MaiPDF 定位是「同类文档控制能力，不要企业价」。
5. **内链策略**：DRM 深度文 → `drm.maipdf.com`；实操教程 → 视场景链到 pack 页或 App 下载。
6. **本仓库只负责内容**，不动 dongle / AustraliaGuide 代码；但 frontmatter、正文、首页 CTA 都要反映新产品线。

### 中国大陆 App 分发（2026-06-23）

写中文下载说明时必须诚实：

| 事实 | 博文怎么说 |
|------|------------|
| **不是首批国内商店上架** | 华为 / 小米 / 应用宝等不在第一波 |
| **原因** | 须先完成**软件著作权登记**等大陆侧必要合规，再走商店审核 — 流程长 |
| **不是「试着能不能上」** | 合规办齐后再正式申请上架 |
| **现阶段怎么用** | 有**境外 Apple ID**、能访问 **Google Play** 或 **drm.maipdf.com** 的用户可先安装；桌面版可官网直链 |
| **人人可用 / 免费** | 与英文一致：个人、学生、自由职业、公司均可；无需企业高价采购 |

中文核心文：`cn/prevent-screenshot-pdf-drm-native-app` · `cn/maipdf-secure-vs-locklizard-pdf-drm` · `cn/online-vs-offline-pdf-security` · `cn/offline-pdf-drm-mode` · `cn/share-pdf-securely`（已加 callout）。

### 0.2 写作规范：简洁、像人写的、关键词前置（2026-06-23）

**背景：** 排名差，旧内容 AI 味重（长 intro、空泛形容词、重复同义句）。新文和改版文必须**短、直、可扫读**。

**篇幅：**
- 核心文 **≤ 80 行** markdown（对比文 / 选型文 **≤ 40 行**）
- 第一段 = **一句话结论**，不要背景铺垫

**关键词（必须进 title + description + 首段 + 至少一个 H2）：**

| 语言 | 主关键词 | 英文 tags | 中文 tags |
|------|----------|-----------|-----------|
| 防截图 | prevent screenshot / **防止截屏** | `prevent screenshot` | `防止截屏`, `防截图` |
| 产品 | MaiPDF Secure, .maipdf | `.maipdf`, `native app` | `.maipdf`, `原生App` |
| 类目 | PDF DRM | `PDF DRM` | `PDF DRM` |

**结构模板：**
1. 一句话结论（含主关键词）
2. 一张对比表 或 一个「怎么选」列表
3. 下载 / 大陆说明（如适用）— 3 条以内
4. FAQ ≤ 3 问
5. 一个 CTA

**禁止（AI 味来源）：**
- 「In today's digital landscape…」「在当今数字化…」
- 连写 3 段 intro-panel 才进正题
- Quick navigation 目录占半屏
- 同一段里重复「secure / protected / confidential」
- 无信息量的 feature-grid 堆砌
- emoji 标题（🛡️ 📊）— 改 plain H1

**改旧文策略：** 能缩成一张表 + 三 FAQ 的，**重写**别 patch；薄 stub 合并或 410。

### 标签迁移（2026-06-23）

旧文常见 `Offline PDF` / `HTML Package` / `H5` / `Locked HTML` —— 指 **web 打包 HTML** 时代。新文请用：

| 推荐 tags | 含义 |
|-----------|------|
| `Secure Share` | drm.maipdf.com 产品线 |
| `.maipdf` | 原生打包格式 |
| `native app` | MaiPDF Secure 阅读器 |
| `prevent screenshot` / `防止截屏` | OS 级防截图相关文 |
| `PDF DRM` | 通用 DRM 类目 |

**避免单独用** `Offline PDF`、`offline` 作主 tag（易误导为「无需联网」）。正文若提 web HTML pack，标注 **legacy / 轻量路径**。

已改版英文文（2026-06-23）：

**核心 / 公告**
- `prevent-screenshot-pdf-drm-native-app` · `maipdf-secure-vs-locklizard-pdf-drm` · `introducing-maipdf-secure-share`

**Secure Share / 打包（原 offline-HTML 叙事 → .maipdf + app）**
- `drm-digital-certificate-file-protection-guide` · `offline-pdf-drm-mode` · `online-vs-offline-pdf-security`
- `offline-vs-online-pdf-sharing-comparison` · `offline-vs-online-pdf-sharing-quick-choice` · `offline-vs-online-pdf-sharing-visual-comparison`
- `pdf-offline-html-package` · `how-to-create-offline-pdf-package-guide` · `how-to-create-offline-pdf-package-complete-guide`
- `offline-pdf-sharing-complete-guide` · `maipdf-h5-generation-guide` · `offline-pdf-package-distribution-best-practices`
- `offline-pdf-drm-enterprise-solution` · `flatten-pdf-harder-to-copy` · `pdf-to-html-conversion`

**在线安全文（加 June 2026 callout / 修正防截图表述）**
- `share-pdf-securely` · `pdf-online-drm-complete-guide` · `secure-pdf-sharing-options`
- `secure-document-sharing-in-healthcare` · `secure-document-distribution-for-corporate-teams` · `secure-portfolio-sharing-for-designers`
- `streamlined-document-sharing-upload-process` · `watermark-protection-basics` · `prevent-file-copying-protection-guide`
- `dynamic-watermarks-on-pdf` · `digital-watermarking-technology-technical-implementation` · `document-security-architecture-basics`
- `share-sales-pitch-decks-that-cant-be-forwarded` · `free-pdf-tools-to-boost-productivity`

**未改 / 低优先：** 纯 Maiimg、Privnote、已 noindex 且与 DRM 无关的长尾。

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

### P0 — 博客内容对齐 dongle / drm.maipdf.com（2026-06 新任务）

原生 App 本月刚做完，**现有 ~274 篇有效页多数只讲在线版**，需分批改版。原则见 §0.1。

**第一批（高流量 / 高误导风险）— 先改 en，再 cn/es：**

| 类型 | 示例 slug / 主题 | 改什么 |
|------|------------------|--------|
| DRM 总览 | `pdf-online-drm-complete-guide`、`offline-pdf-drm-*` | 加「在线 vs 原生」对比表；原生能力链到 `drm.maipdf.com` |
| 防截图 / 泄露 | `share-pdf-securely`、`secure-pdf-sharing-options`、`watermark-*` | 删掉/Web 化「防截图」暗示；写清：在线=水印追责，App=OS 级拦截 |
| 离线 / Secure | `offline-pdf-drm-mode`、`online-vs-offline-*`、`drm-digital-certificate-*` | ✅ 2026-06-23 已改：`.maipdf` + app；HTML pack 标 legacy |
| 首页 / 关于 | `src/pages/index.astro`、`about.astro` | 双产品线 CTA：Cloud Share + Secure（原生） |

**第二批 — 场景文内嵌升级提示：**

- 合同、教材、医疗、设计作品集等「高敏感」场景文 → 文末加「需要 OS 级防截图？→ drm.maipdf.com」
- 微信/WhatsApp/邮件分享类 → 保持 `maipdf.com` 为主 CTA，可选一句「机密文件用 Secure App」

**第三批 — 新增长尾（P2 合并）：**

- ✅ `en/prevent-screenshot-pdf-drm-native-app` — **2026-06-23 已发**：原生 App 公告
- ✅ `en/maipdf-secure-vs-locklizard-pdf-drm` — **2026-06-23 已发**：与 LockLizard 企业 DRM 诚实对比
- `maipdf app vs web sharing when to use`（可并入上文或另写）
- `pack maipdf file offline drm`（对接 `drm.maipdf.com/pack.html`）

**不改 / 低优先：** 纯 Maiimg 图片分享、Privnote 类无关文、已 410 的语言。

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
围绕竞品没有的功能做低竞争长尾(参考已排第 1 的 drm-limit-pdf-views 模式)。**优先原生 DRM / dongle 独有能力**（见 P0 第三批），其次才是在线版功能。

### P3 — 外链 / 权威度
- 把已有词条(Capterra / GetApp / SoftwareAdvice)与主站 maipdf.com 的链接，导向文章子域重点页。
- 中期可评估: 把博客从子域 `article.maipdf.com` 迁到主站子目录 `maipdf.com/blog`(继承根域权威度，SEO 大杠杆，但属较大迁移)。

---

## 7. 关键文件索引

| 文件 | 作用 |
|------|------|
| [work.md](work.md) | **本文件**：SEO 计划 + 产品生态认知（§0.1） |
| [wrangler.json](wrangler.json) | `html_handling: drop-trailing-slash` |
| [src/middleware.ts](src/middleware.ts) | 运行时 301 / 410 路由 |
| [src/data/blog-legacy-redirects.mjs](src/data/blog-legacy-redirects.mjs) | 301 旧→新映射 |
| [src/data/blog-gone.mjs](src/data/blog-gone.mjs) | 410 永久删除清单 |
| [public/robots.txt](public/robots.txt) | 抓取规则 |
| [astro.config.mjs](astro.config.mjs) | `trailingSlash:'never'`、sitemap 配置 |
| [src/pages/blog/index.astro](src/pages/blog/index.astro) | 博客首页语言分区(现 en/cn/es) |
| [src/pages/index.astro](src/pages/index.astro) | 站点首页 CTA（待加 Secure / drm 入口） |

### 生态外仓库（改博客时对照，不在本仓库）

| 仓库 | 路径 / 远程 | 备注 |
|------|-------------|------|
| **dongle** | `github/dongle`（本地常见 `~/Documents/GitHub/dongle`） | Flutter App；详读 `work.html` |
| **AustraliaGuide** | `drm.maipdf.com` 源码 | Cloudflare D1 API、pack/dashboard |
| **maipdf.com** | PHP 主站 | Cloud Share 在线分享 |
