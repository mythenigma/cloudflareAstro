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

### 配图规则（2026-06-23，写博客必读）

| 素材目录 | 用于什么 | 禁止用于 |
|---|---|---|
| `/offlinepages/*.png` | **pack.html 网页打包**实操截图（上传、规则、下载、打开 HTML） | App / 桌面 `.maipdf` 教程 |
| `/maipdf2026/offline/*.png` | **MaiPDF Secure 桌面端**产品截图（`offlinedrm.png`、`inststruct.png`、`two comparison.png` 等） | 网页 pack 步骤文 |
| `/maipdf2026/show_off/*.png` | **maipdf.com 在线分享**营销插图（非真实 UI） | 冒充 App 或 pack.html 截图 |
| `/maipdf2026/*.png`（根目录） | **maipdf.com** 真实后台/上传/设置截图 | DRM App 教程 |
| `/diagram/**/*.svg` | 流程对比图 | 代替实操截图 |

**原则：** 一张图只出现在它真正对应的步骤旁；heroImage 与正文不重复贴同一张；App 文只有桌面截图（仓库里暂无手机 UI 截图）。

### Web pack 和 `.maipdf` 是两套东西（写博客严禁混为一谈）

| | Web pack（pack.html） | `.maipdf`（MaiPDF Secure App） |
|---|---|---|
| 在哪打包 | 浏览器打开 `drm.maipdf.com/pack.html` | 原生 App 内打包 |
| 技术链路 | **PDF → AES 加密 → webpack 打成自包含 HTML → ZIP 下载** | App 内加密生成 `.maipdf`（原生阅读器格式） |
| 在哪阅读 | 任意浏览器，解锁时联网验 license | **只能**在 MaiPDF Secure App 内打开 |
| 防截屏 | **不能**（浏览器 沙箱） | **能**（OS 级 SecureScreen 等） |
| 安全等级 | 低：devtools 可抓解密流；打印/保存只是 UX 摩擦 | 高：原生查看器 + 设备完整性检测 |
| 共用 | 同一套 license 服务器（D1） | 同一套 license 服务器 |

**错误写法（今天 batch 的问题）：** 把两者写成「两种打包方式」「推荐 vs legacy」「二选一 workflow」——读者会以为安全等级差不多。  
**正确写法：** Web pack 文只教 pack.html（HTML-in-ZIP）；防截屏 / `.maipdf` 单独成文；对比时明确 **安全等级不可比**，不是同一 pipeline。

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
- **实操教程**（pack 指南、防截屏、分发最佳实践）要有完整步骤、截图、FAQ、失败模式 —— **不要压成几十行的 stub**
- **对比 / 选型文** 可以较短，但仍需一张表 + 明确结论 + 内链到完整教程
- 第一段结论要清晰，但**不等于**可以删掉正文

**错误示范（2026-06-23 batch）：** 为追求「短」把 complete-guide 砍成 meta 废话 + 空表 → 比旧文更差。

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
---

## 2026-06-27 — article.maipdf.com Learning Center 改版记录

### 本轮已处理
- 新增执行计划: `docs/plans/2026-06-27-article-maipdf-seo-learning-center.md`。
- 首页 `src/pages/index.astro` 已从普通产品 landing 改为 MaiPDF Secure Sharing Guides / Learning Center。
- `/blog` 首页 `src/pages/blog/index.astro` 已改为按主题组织，包含推荐文章、最新文章和语言入口。
- Header / SearchBar / 全局样式做了第一轮暗色模式与移动端可读性整理。
- 新增旧文章审计计划: `docs/plans/2026-06-27-app-drm-content-audit.md`。
- 已按要求先从 GitHub 拉取最新 `origin/main`；拉取前本地改动已用 git stash 备份。

### 继续前注意
- 远端新增了 App DRM / 防截图相关文章和全局样式更新；后续修改必须基于最新 GitHub 内容继续。
- 后续继续内容方向: App DRM、`.maipdf`、防截图、设备绑定、撤销访问、Online Sharing 与 App DRM 区分。

### 2026-06-27 继续执行
- 新增英文 SEO 文章: `browser-pdf-viewer-vs-app-drm.md`、`what-is-a-maipdf-file.md`、`pdf-device-binding-explained.md`。
- 首页和 `/blog` 推荐文章已优先指向 App DRM / `.maipdf` / 防截图 / 设备绑定主题。

### 2026-06-27 素材接入
- 从 dongle 项目复制 App UI 素材到 `public/app-screenshots/`。
- 已在新增英文 SEO 文章中加入 App 截图：App overview、Protected viewer、License manager。

### 2026-06-27 产品方向校正
- 用户确认 PDF-to-HTML / locked HTML package 已不重要，后续内容应尽量不再强调。
- 已将主要 HTML package / PDF-to-HTML 旧文标记为 `noindex: true` 并加参考说明，避免继续作为 SEO 主线。
- `/blog` App DRM 主题匹配已移除 `offline` 关键词，避免把旧 HTML/offline 文章推到 App DRM 主题里。
- 防截图主文已移除 `pack.html` 对比，把当前路径收敛为 Online Cloud Sharing vs App DRM / `.maipdf`。

### 2026-06-27 新增 Secure PDF Reader 主文
- 新增英文 SEO 文章 `src/content/blog/en/secure-pdf-reader-with-screenshot-protection.md`。
- 文章使用 App Protected Viewer 与 DRM Pack Result 截图，重点解释 secure PDF reader、App DRM、`.maipdf`、防截图、设备绑定和水印追踪。
- 首页和 `/blog` 推荐文章已把该文放到第一位，强化 App DRM / 防截图主线。

### 2026-06-27 新增 Cloud Sharing vs App DRM 对比主文
- 新增英文 SEO 文章 `src/content/blog/en/online-pdf-sharing-vs-app-drm.md`。
- 文章明确区分 MaiPDF Online Cloud Sharing 与 App DRM / `.maipdf`：前者用于快速链接、二维码、水印、访问记录；后者用于防截图、设备绑定、撤销访问、受保护阅读器。
- 首页和 `/blog` 推荐文章已将该文放到第一位，用作两条产品线的主解释入口。

### 2026-06-27 新增撤销访问 SEO 文章
- 新增英文 SEO 文章 `src/content/blog/en/how-to-revoke-access-to-a-pdf-after-sending.md`。
- 文章承接 Online Cloud Sharing 与 App DRM 两条线，解释链接禁用、过期、访问次数、`.maipdf` license revoke、设备绑定和水印追踪。
- 首页和 `/blog` 推荐文章已加入该文，强化“发出去以后还能控制”的卖点。

### 2026-06-27 新增付费培训资料 SEO 文章
- 新增英文 SEO 文章 `src/content/blog/en/how-to-share-paid-training-pdfs-securely.md`。
- 文章面向 course creators / coaches / educators / corporate training，主打 paid workbook、course PDF、exam prep、培训手册的防转发、设备绑定、撤销访问、水印追踪和 App DRM / `.maipdf` 受保护阅读。
- 首页和 `/blog` 推荐文章已加入该文，强化“付费内容不能直接发原始 PDF”的转化场景。

### 2026-06-27 新增学生转发防护 SEO 文章
- 新增英文 SEO 文章 `src/content/blog/en/how-to-prevent-students-from-sharing-course-pdfs.md`。
- 文章面向 teachers / coaches / course creators，解释如何用受控链接、水印、过期、访问次数、设备绑定、撤销访问和 App DRM / `.maipdf` 减少学生转发课程 PDF。
- 已从付费培训资料文章内链到该文，形成 paid training → student forwarding 的长尾转化链路。

### 2026-06-27 新增 Online Course PDF DRM 主文 + 旧文改造
- 新增英文 SEO 主文 `src/content/blog/en/pdf-drm-for-online-courses.md`，作为 online courses / workbooks / notes / exam prep / training files 的上级入口。
- 已从 `how-to-share-paid-training-pdfs-securely.md`、`how-to-prevent-students-from-sharing-course-pdfs.md` 内链到该主文，并把首页和 `/blog` 推荐位加入该文。
- 已改造旧文：`educator-pdf-sharing-guide.md`、`distribute-educational-resources-with-limited-access.md`、`pdf-prevent-forwarding-guide.md`、`prevent-pdf-downloads-view-only.md`、`free-online-drm-for-pdf.md`。
- 旧文改造重点：明确 Online Cloud Sharing 是浏览器便捷分享；App DRM / `.maipdf` 才是设备绑定、撤销访问、受保护阅读器、防截图敏感场景的更强路径，并加到新主文/相关新文的内链。

### 2026-06-27 批量新增付费内容转化文章 + 旧文二次改造
- 批量新增英文 SEO 文章：`sell-pdf-workbooks-without-losing-control.md`、`protect-exam-prep-pdfs-from-sharing.md`、`how-to-revoke-course-pdf-access-after-refund.md`。
- 三篇分别覆盖 PDF workbook 售卖、防考试资料外泄、退款后撤销访问，均围绕 Online Cloud Sharing vs App DRM / `.maipdf`、设备绑定、license revoke、水印追踪和防截图边界。
- 继续改造旧文：`control-pdf-downloads-permissions.md`、`benefits-of-pdf-access-control.md`、`digital-watermarks-pdf-protection-guide.md`、`maipdf-print-restriction-guide.md`、`pdf-share-link-disable-download.md`、`limit-pdf-views-drm.md`，加入 2026 App DRM 分流提示和新主文内链。
- 首页和 `/blog` 推荐位更新为：Cloud Sharing vs App DRM、Online Course DRM、Sell PDF Workbooks、Exam Prep Protection、Refund Revocation、Secure PDF Reader。

### 2026-06-27 旧文重复清理与主文分流改造
- 删除英文重复/薄旧文 92 篇；这些旧 slug 在 `src/data/blog-legacy-redirects.mjs` 已有 301 到保留主文，删除后避免重复内容继续生成静态页面。
- 保留并强化主文：`share-pdf-online`、`how-to-upload-a-pdf-and-generate-a-secure-link`、`pdf-online-viewing-without-download`、`limit-pdf-views-drm`、`dynamic-watermarks-on-pdf`、`share-pdf-securely`、`maipdf-secure-efficient-sharing`、QR / email verification 等 canonical 页面。
- 批量改造 16 篇保留旧文，统一补 2026 update：Online Cloud Sharing 负责浏览器链接/二维码/过期/访问次数/水印；App DRM / `.maipdf` 负责设备绑定、license revoke、受保护阅读器和防截图敏感场景。
- 清理原则：重复或薄内容删除并走已有 redirect；能承接搜索意图的主文保留并加新 App DRM 内链。



## 2026-06-27 — 下一轮 App DRM / 企业与客户资料 SEO 批处理

- 新增 3 篇英文转化文章：
  - `src/content/blog/en/pdf-drm-for-corporate-training-manuals.md`：企业培训手册 / franchise manual / partner enablement / certification guide 场景，强调 Online Cloud Sharing 与 App DRM 分层。
  - `src/content/blog/en/protect-confidential-pdfs-before-sending.md`：客户 confidential PDF 发送前的保护清单，覆盖 link expiry、watermark、revocation、device binding。
  - `src/content/blog/en/pdf-drm-for-consultants-and-coaches.md`：consultants / coaches / advisors 的付费框架、worksheet、template pack、client report 保护场景。
- 批量改造 14 篇旧英文主文，补 `updatedDate: "Jun 27 2026"` 与 2026 App DRM update：说明旧文主要是 browser-based Online Cloud Sharing，高价值/需防截图/设备绑定/撤销访问的资料导向 `.maipdf` App DRM。
- 修正 live 内容和页面里指向已删除重复旧文的内部链接，改为对应 canonical 主文，减少无意义 301 跳转和站内链接分散。
- 清理 `maipdf-secure-vs-locklizard-pdf-drm.md` 中对 `pack.html` / web HTML package 的强调，改回当前主线：Online Cloud Sharing vs App DRM / `.maipdf`。
- 首页与 `/blog` 推荐位加入企业培训和 confidential client PDF 两条新转化入口。


## 2026-06-27 — 开门见山防截图免费工具文章

- 新增 `src/content/blog/en/free-pdf-screenshot-protection-software.md`：标题为 **Free PDF Screenshot Protection Software: What Actually Works**。
- 按用户反馈调整方向：不再继续扩散过多行业场景，改成直接回答搜索意图：普通 PDF / 密码 / 浏览器不能真正防截图；真正需要防截图应使用 protected native reader；MaiPDF App + `.maipdf` 是当前主推路径。
- 文中明确边界：浏览器可以禁下载/禁打印/水印/过期/统计，但不能完整控制 OS 截图；App DRM 可降低截图/录屏风险、支持设备绑定与 license revoke；任何软件都不能阻止另一台手机拍屏幕。
- 首页和 `/blog` 推荐位把 `free-pdf-screenshot-protection-software` 放到第一位，增强“免费防截图软件”这个直球搜索入口。


## 2026-06-27 — 大胆删除旧 HTML pack / PDF-to-HTML 方向

- 按用户反馈“该删的一样，大胆一点就删掉”，删除英文旧方向文章 15 篇，主要是 `pack.html`、locked HTML、PDF-to-HTML、offline HTML package、web pack、flatten PDF 等当前不再主推且容易分散 App DRM 叙事的内容。
- 删除文件包括：
  - `drm-digital-certificate-file-protection-guide.md`
  - `flatten-pdf-harder-to-copy.md`
  - `how-to-create-offline-pdf-package-complete-guide.md`
  - `introducing-maipdf-secure-share.md`
  - `maipdf-h5-generation-guide.md`
  - `offline-pdf-drm-enterprise-solution.md`
  - `offline-pdf-drm-mode.md`
  - `offline-pdf-package-distribution-best-practices.md`
  - `offline-pdf-sharing-complete-guide.md`
  - `offline-vs-online-pdf-sharing-comparison.md`
  - `offline-vs-online-pdf-sharing-quick-choice.md`
  - `offline-vs-online-pdf-sharing-visual-comparison.md`
  - `online-vs-offline-pdf-security.md`
  - `pdf-offline-html-package.md`
  - `pdf-to-html-conversion.md`
- 为上述旧 URL 补充 301 redirect，主要导向 `online-pdf-sharing-vs-app-drm`，截图/防复制相关导向 `free-pdf-screenshot-protection-software` 或 `secure-pdf-reader-with-screenshot-protection`。
- 同步清理 live 内容和页面里的站内链接，不再导向被删除旧文；保留 `maipdf-secure-vs-locklizard-pdf-drm.md`，但弱化绝对 OS-level 表述。


## 2026-06-27 — 西语文章大胆压缩到 17 篇核心页

- 按用户反馈“西班牙语117篇是开玩笑，压缩到17篇才合理”，删除西语低价值/重复/旧方向文章 100 篇，仅保留 17 篇核心西语页面。
- 保留范围：PDF 上传生成链接、在线分享、安全分享、无下载在线阅读、访问次数/过期、禁下载/禁打印/防复制、水印、二维码、医疗/教育/企业少量场景、免费 PDF hosting、Maiimg 图片分享。
- 删除的西语 URL 已补充 301 redirect，按主题导向对应 17 篇 canonical 西语主文，避免直接 404。
- 同步替换站内指向被删西语 slug 的链接。


## 2026-06-27 — 西语压缩规则修正：不是机械 17 篇，而是按内容厚度筛

- 用户指出 17 不是硬数字，重点是删除“非常非常短”的薄内容，而不是把所有西语强行压到固定数量。
- 重新统计刚删除的 100 篇西语文章正文长度：保留删除短薄/重复/旧方向文章，恢复正文较长且不属于旧 HTML/offline 方向的西语文章 26 篇。
- 恢复标准：正文约 600 词以上、非 `pack.html` / PDF-to-HTML / offline HTML 旧方向、具备独立搜索意图或完整正文结构。
- 同步移除这些恢复页面在 `blog-legacy-redirects.mjs` 中的 source redirect，避免已恢复页面被错误跳转。


## 2026-06-27 — 西语二次精简：删除仍然太短的保留页

- 二次检查恢复后的西语文章，发现原本保留的部分 canonical 页面正文仍低于约 350 词，属于“非常非常短”的薄内容。
- 删除这些短页 6 篇，并导向更长或更合理的西语主文：`maipdf-print-restriction-guide`、`maiimg-secure-image-sharing-access-control`、`educator-pdf-sharing-guide`、`image-link-generator-free-image-url-generator`、`pdf-dynamic-watermark-security-guide`、`pdf-share-link-disable-download`。
- 同时移除被恢复长文的错误 source redirect，保证恢复页面正常生成。


## 2026-06-27 — 中文文章第一轮合并精简

- 按“能合并就合并，取长补短，不是机械删/不删”的原则处理中文目录。
- 第一轮优先处理两类：
  1. 已经在 `blog-legacy-redirects.mjs` 里明确有 canonical 的中文重复页：删除源 Markdown，保留更强主文和 301 redirect。
  2. 当前不再主推的旧 HTML / H5 / offline package / PDF-to-HTML 方向：删除旧文，导向 App DRM / 防截图 / 在线阅读主线。
- 本轮删除中文源文件 92 篇，并保留/补充 redirect，避免旧 URL 直接 404。
- 同步替换站内 live 内容里指向被删中文 slug 的链接。


## 2026-06-27 — 中文文章第二轮短薄页合并

- 第一轮后继续检查剩余中文页面，发现仍有 14 篇正文较短但没有被旧 redirect 覆盖的薄内容。
- 本轮不是直接浪费旧 URL，而是按主题合并到更长主文：下载链接/替换链接 → 上传或 MaiPDF 总览；Maiimg 短文 → Maiimg 完整流程/链接生成；水印短文 → 动态水印主文；协作/合规短文 → 对应主文。
- 删除短薄中文源文件 14 篇，补充 redirect 并清理站内链接。


## 2026-06-27 — 删除文章改为 404，不再 redirect

- 用户说明清理目的：Google 上无意义旧链接太多，需要“数量减少，质量增加”，先让已删页面降下来，而不是继续把旧垃圾 URL 全部 redirect 到主文。
- 因此清理 `blog-legacy-redirects.mjs`：移除 `/blog/en/*`、`/blog/cn/*`、`/blog/es/*` 文章级旧 URL redirect 共 289 条。
- 当前策略：被删除的文章 URL 直接 404；仅保留非语言路径的少量历史 redirect。
- 同步检查站内内容，避免站内继续链接到已删除文章 URL。


## 2026-06-28 English App DRM structure pass

- User clarified: do not touch Maiimg for now; continue improving English MaiPDF article structure.
- Confirmed product framing: two main paths should be Online Cloud Sharing and App DRM / `.maipdf`; legacy HTML/package behavior can remain for existing users but should not be promoted as a main blog narrative.
- Audited English content: 130 English articles; no remaining `html package` / `PDF-to-HTML` / `locked HTML` / `offline HTML` wording detected in English markdown; Maiimg-related English articles intentionally left untouched in this pass.
- Added two reusable SVG explanatory graphics under `public/app-screenshots/`:
  - `maipdf-two-paths-decision-map.svg`
  - `maipdf-app-drm-workflow.svg`
- Updated core English App/DRM articles with clearer two-path explanation and visuals:
  - `src/content/blog/en/online-pdf-sharing-vs-app-drm.md`
  - `src/content/blog/en/free-pdf-screenshot-protection-software.md`
  - `src/content/blog/en/secure-pdf-reader-with-screenshot-protection.md`
- Added a concise legacy HTML note only inside the comparison article, positioning it as a supported legacy/convenience path, not the main security story.
- Verified with `npm run build:fast` twice via Windows npm; final build passed.


## 2026-06-28 English knowledge-tree internal linking pass

- User approved the proposed English knowledge-tree direction: strengthen core pages, do not touch Maiimg yet, and avoid adding images to low-value pages.
- Core App DRM pages updated:
  - `src/content/blog/en/what-is-a-maipdf-file.md`: added App DRM workflow SVG and related links to the core App/DRM cluster.
  - `src/content/blog/en/pdf-device-binding-explained.md`: added App DRM workflow SVG and related links to `.maipdf`, screenshot reader, revoke access, and App DRM overview pages.
- Reworked 8 older English PDF security pages so they explicitly explain MaiPDF's two-path model: Online Cloud Sharing for fast browser links/QR/expiry/watermark/access records, App DRM / `.maipdf` for protected reader, screenshot-aware controls, device binding, license checks, and revoke-after-send.
  - `share-pdf-securely.md`
  - `prevent-pdf-downloads-view-only.md`
  - `pdf-online-viewer-prevent-copy.md`
  - `pdf-prevent-forwarding-guide.md`
  - `free-online-drm-for-pdf.md`
  - `pdf-share-link-disable-download.md`
  - `limit-pdf-views-drm.md`
  - `dynamic-watermarks-on-pdf.md`
- Updated `free-online-drm-for-pdf.md` frontmatter to avoid misleading “No Software Needed” positioning; new framing is browser controls vs App DRM.
- Organized PDF-link cluster without deleting Maiimg or link-intent pages: kept `make-pdf-into-a-link` as the simple-intent page, improved related links across upload/link/control/email pages, and repositioned `generate-pdf-links-that-work-on-any-device` as a cross-device checklist rather than a standalone generic page.
- Verified there are 0 broken `/blog/en/...` internal links in markdown content.
- Ran `npm run build:fast` twice via Windows npm; first run had expected Astro duplicate-id cache warnings after content edits, second run was clean except the usual Vite empty chunk warning. Final build passed.


## 2026-06-28 Homepage/blog featured page alignment

- Reviewed `src/pages/index.astro` and `src/pages/blog/index.astro` after English knowledge-tree cleanup.
- Updated featured article slots on both home and blog index away from scenario articles and toward core product-definition pages:
  - `free-pdf-screenshot-protection-software`
  - `online-pdf-sharing-vs-app-drm`
  - `secure-pdf-reader-with-screenshot-protection`
  - `what-is-a-maipdf-file`
  - `pdf-device-binding-explained`
  - `how-to-revoke-access-to-a-pdf-after-sending`
- Rationale: top navigation should explain the product architecture first (Online Cloud Sharing + App DRM / `.maipdf`) before pushing vertical scenario pages.
- Ran `npm run build:fast`; build passed.


## 2026-06-28 Blog index start-here ordering

- Adjusted `/blog` page flow so `Recommended first reads` appears before topic browsing, with `id="start-here"`.
- Updated hero quick links from `Browse topics / Latest / App DRM site` to `Start here / Browse topics / Latest articles`, reducing early outbound distraction and sending readers first to the core MaiPDF product-architecture pages.
- Rationale: after the English knowledge-tree cleanup, readers and Google should see the canonical product explanation pages before scenario/topic lists.
- Ran `npm run build:fast`; build passed.


## 2026-06-28 Related guides cleanup

- User flagged bottom related articles were inconsistent: some articles had one manual related block, some had two, while `BlogPost.astro` already rendered automatic related posts through `RelatedPosts.astro`.
- Decision: one canonical related block should be owned by the template/component, not handwritten in Markdown. This avoids duplicated bottom sections and keeps design/selection consistent across the site.
- Rewrote `src/components/RelatedPosts.astro`:
  - Default limit is now 4 related guides.
  - Header is standardized/localized (`Related guides`, `相关阅读`, `Guías relacionadas`, etc.).
  - English pages use curated product clusters and explicit mappings for core pages: Online Cloud Sharing, App DRM / `.maipdf`, screenshot protection, device binding, revoke access, PDF link, access limits, watermark, education, enterprise, and Maiimg.
  - Non-English pages still stay same-language and use relevance/fallback scoring.
  - Cards now include title, short description, date, and consistent styling.
- Removed handwritten Related/Related guides/You might also like/相关文章/Artículos relacionados sections from Markdown content so each article only shows one automatic related block. Restored one Chinese content section in `share-pdf-online.md` that mentioned “相关阅读” in the heading but was not itself a related-links block.
- Verified remaining manual related-like headings in Markdown: 0.
- Ran `npm run build:fast` twice; first run had expected Astro duplicate-id cache warnings after many Markdown edits, second run was clean except the usual Vite empty chunk warning. Final build passed.


## 2026-06-28 free-online-drm-for-pdf mobile cleanup

- User shared a mobile screenshot of `/blog/en/free-online-drm-for-pdf` showing awkward mobile rendering and confusing wording around “Totally Free & No Login Required”.
- Rewrote `src/content/blog/en/free-online-drm-for-pdf.md` into cleaner Markdown instead of HTML-heavy custom blocks.
- Clarified the page as “browser-based access control” rather than full App DRM: Online Cloud Sharing is no-install/no-login for ordinary browser reading; App DRM / `.maipdf` requires the MaiPDF App for protected reader, screenshot-aware controls, device binding, and revoke-after-send.
- Removed custom benefit/use-case icon HTML that caused poor mobile layout and large image/icon behavior.
- Updated `updatedDate` to Jun 28 2026.
- Ran `npm run build:fast` twice; first build showed expected duplicate-id cache warning for the edited page, second build passed cleanly except the usual Vite empty chunk warning.

## 2026-06-29 free-online-drm-for-pdf content correction

- User clarified that the article still mixed Online Cloud Sharing screenshots/features with App DRM behavior; online replacement belongs to the online version, while the App version manages licenses and does not have a replace-file control panel flow.
- Rewrote `src/content/blog/en/free-online-drm-for-pdf.md` again around two clearly separated paths: Online Cloud Sharing controls browser links/QR/replacement; App DRM / `.maipdf` controls protected-file licenses.
- Added an App DRM section based on Flutter code (`dongle/lib/screens/drm_license_manage_page.dart`), covering My licenses, lookup, opens, expiry, max devices, recipients, device bindings, open events, revoke/delete/reactivate.
- Added generated SVG asset `public/app-screenshots/maipdf-app-license-management.svg` to represent the App license-management UI instead of reusing online-control screenshots.
- Replaced the numbered 1/2/3/4 decision area with inline number + title cards so the number and subheading appear on the same line.
- Updated `updatedDate` to Jun 29 2026.
- Ran Windows Node build via `cmd.exe /c "cd /d C:\\Users\\chanz\\Documents\\GitHub\\cloudflareAstro && npm run build:fast"` because the WSL npm symlink is broken; build passed. First run had expected duplicate-id cache warning for the edited page, second run was clean except usual Browserslist/empty chunk warnings.

## 2026-06-29 related App DRM article consistency pass

- Checked related English App DRM / `.maipdf` / Online Cloud Sharing articles for the same Online-vs-App confusion, especially replacement-file wording and license-management screenshots.
- Updated `online-pdf-sharing-vs-app-drm.md` to explicitly say online replacement belongs to Online Cloud Sharing, while App DRM manages the license (opens, expiry, devices, recipients, open events, revocation) and new protected content should be a new `.maipdf` package.
- Replaced older `maipdf-app-license-manager.png` references with the generated App license-management SVG in: `how-to-revoke-access-to-a-pdf-after-sending.md`, `how-to-revoke-course-pdf-access-after-refund.md`, `how-to-prevent-students-from-sharing-course-pdfs.md`, `pdf-device-binding-explained.md`, `protect-confidential-pdfs-before-sending.md`, and `sell-pdf-workbooks-without-losing-control.md`.
- Updated touched article `updatedDate` values to Jun 29 2026 where applicable.
- Verified no remaining English references to `maipdf-app-license-manager.png` and no obvious “App DRM replace/same-link” wording except the deliberate clarification that App DRM does not use online replacement.
- Ran Windows Node `npm run build:fast` twice; first run had expected duplicate-id cache warnings after edits, second run passed cleanly except existing Browserslist and Vite empty chunk warnings.

## 2026-06-29 how-to-open-a-maipdf-file article

- Added new English article `src/content/blog/en/how-to-open-a-maipdf-file.md` for the search intent “How to Open a .maipdf File”.
- Positioning: recipient-facing troubleshooting article explaining that `.maipdf` is opened with the MaiPDF App, not normal PDF readers; covers file picker/open-with flow, sign-in, license checks, expiry, open limits, device limit, wrong email, revoked license, and when to ask sender for help.
- Kept Online Cloud Sharing vs App DRM separation explicit: online links open in browser and support same-link replacement; `.maipdf` / App DRM opens in the app and is governed by license rules.
- Updated `src/components/RelatedPosts.astro` so `what-is-a-maipdf-file` links to this new guide and this new guide links back to key App DRM articles.
- Ran Windows Node `npm run build:fast`; build passed and generated `/blog/en/how-to-open-a-maipdf-file/index.html`; only existing Browserslist/empty chunk warnings remain.

## 2026-06-29 About / legacy visual alignment

- Rebuilt `src/pages/about.astro` from a diagram-gallery style page into a formal MaiPDF Secure product page with six sections: hero, Online Cloud Sharing vs App DRM cards, Secure App visual direction, security boundaries, legacy HTML/Offline note, and recommended reading.
- Removed the old About page's large bilingual diagram repository, purple/blue SaaS styling, Offline DRM-first copy, and outdated HTML-package positioning.
- Marked old/generic browser DRM pages with a legacy guidance card pointing readers to `online-pdf-sharing-vs-app-drm.md` as the canonical 2026 product explanation.
- Updated `online-pdf-sharing-vs-app-drm.md` to explicitly be the canonical entry page for Online Cloud Sharing vs App DRM and to state the new visual direction: white/light-gray surfaces, deep blue structure, green safety states, clear license status, less old purple-gradient SaaS decoration.
- Installed local Node.js v22.17.0 under `/home/adminjoe/.hermes/node` for WSL Astro builds, then ran `npm install --no-package-lock` and `npm run build:fast`; build passed.
- Verified `/about/` through local HTTP static preview so `/_astro` CSS loaded correctly; confirmed the page renders with the intended white/light-gray/deep-blue/green professional DRM style.
