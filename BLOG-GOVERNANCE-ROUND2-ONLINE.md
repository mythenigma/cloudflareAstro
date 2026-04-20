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

---

## 📘 MAIPDF Product Knowledge Base（权威 — 2026-04-20 开发者亲述）

> **写新 canonical 或精修前，必须通读这节。**所有功能描述以此为准；不在这里的功能不要写。看到旧稿写了假功能（SecureView / SMS-for-EN / 地理限制 / QR 颜色定制 / UTM），不要合并进 canonical —— 直接丢掉。
>
> 图片不能替代文字解释：看到旧稿只甩一张 control panel 图当"讲清楚了"，必须在图附近补上实际的操作流程和前置条件。

### 两个站点

- **maipdf.com** — 国际版（EN 博客对应此站）
- **maipdf.cn** — 中文版（CN 博客对应此站）
- 分站原因：合规 + 访问速度；核心分享功能两边基本一致，但**验证方式和通知方式有本质差异**（见下）

### 核心控制项（两站都有，上传者可配置）

| 控制项 | 说明 |
|---|---|
| 打开次数 / Open count | 链接总/单人开启上限 |
| 单次阅读时长 / Per-session reading duration | 一次开启后最长可读时间 |
| 过期时间 / Expiry | 链接失效日期 |
| 是否允许下载 / Download on-off | 纯在线阅读 vs 允许下载原文件 |

### 保护模式（viewing modes）

- **标准防护模式 / Standard Protection** — 禁止下载 + 禁止打印
- **FineView** — 进阶使用场景模式（具体边界写深度文时先跟开发者确认）
- ❌ **"SecureView" / "FenceView" 不是真实模式名** —— 历史编造，所有现存 14 个文件共 25 处出现，必须在精修时清洗掉
- ⚠️ "Unrestricted" 是否为独立模式待开发者确认；暂理解为"未启用保护"的默认状态，不要作为正式模式名写

### 身份验证（**CN 和 EN 不同**）

| 站点 | 验证方式 | 机制 |
|---|---|---|
| maipdf.cn | 手机号白名单 | 上传者指定若干手机号，仅名单内的号码收到 SMS 验证码后可打开 |
| maipdf.com | 邮箱白名单 | 上传者指定邮箱列表，仅名单内邮箱收到验证邮件 |

- 国际版因覆盖地区多、不走 SMS，改用邮箱
- ❌ EN 博客**不要**写"SMS 验证"或"手机号白名单"
- ❌ CN 博客**不要**写"邮箱验证"作为核心验证方式

### 阅读提醒（**CN 和 EN 不同**）

| 站点 | 提醒方式 | 现状 |
|---|---|---|
| maipdf.cn | 邮件/站内 | 送达率低，多数进垃圾箱，**实际基本不可用** —— CN 博客不要炒作这个功能 |
| maipdf.com | **Telegram 机器人**实时提醒 | 用户绑定 bot 后收到访问通知。**调用量限制在 10,000 次以内** |

- ⚠️ 已精修的 `limit-pdf-views-drm.md` 里写"链接跨 10k 访问后系统转无限模式、停日志+停水印+停提醒" —— 这段跟开发者说的"Telegram 10k 调用上限"是否同一回事**待确认**，确认前不要在新文稿中复制这一整段说法

### 文件替换（**最容易写错，务必讲清**）

核心行为：**在不改变原分享链接的前提下**，把新 PDF 的文件内容 + 新的打开次数/过期/下载等**所有设置**直接导入覆盖旧链接。旧链接继续工作，但指向新文件 + 新配置 —— 接收方不需要拿新链接，也不需要重新分发。

两种使用模式：

1. **游客模式（未注册）** —— 用**新旧文件各自的"修改码"作为凭证**。输入修改码完成替换。这是旧稿最容易糊弄的地方，不要只放一张控制台截图就算讲完了 —— 必须说清"修改码在哪里拿到、如何输入、新旧两码都要"。
2. **注册 + 登录用户** —— 直接在**用户控制面板**后台可视化替换，无需修改码，更简便。

配套图片（精修时别搞混）：

| 图片 | 真实含义 |
|---|---|
| `replacefile-without-login.png` | 游客模式（免登录，用修改码）替换 |
| `swap_file_easy_in_user_control_panel.png` | 注册用户后台替换 |
| `Replace1showoff.png` / `replace2toshowoff.png` | 替换概念的展示图（不是具体操作步骤） |

### 其他真实功能

- 单文件上限 **100 MB**
- **动态水印** dynamic watermark — 阅读时把查看者邮箱/IP 盖在页面上，截图可溯源
- **QR 码** — 从分享链接派生；印刷最小建议 2×2 cm；所有链接上的控制（过期/次数/验证）扫码后同样生效
- **访问日志 access record** — 开启时间、来源、设备；支持用户后台复核

### ❌ 禁止写入的"假功能"清单

| 假功能 | 正确对应 |
|---|---|
| SMS / 手机号验证（EN 博客） | 邮箱白名单 |
| 邮箱验证（CN 博客作为主要验证） | 手机号白名单 + SMS |
| SecureView / FenceView 模式 | 标准防护 / FineView |
| 地理位置限制 / geo-fencing | ❌ 不存在 |
| QR 颜色/形状定制 | ❌ 不存在（保留默认黑白，可靠扫码更重要） |
| UTM 参数 / 推广标签 | ❌ 不存在 |
| 中文版可靠的阅读提醒 | ❌ 实际送达不可靠，不要写成可靠功能 |

---

## Round 2b — Canonical 精修（内容合并 + 手机端修复）

> **进行中** — 301 已生效，现在把各 canonical 从"薄/表格堆砌"精修为"真散文 + 真功能细节 + 合适图片"。
>
> ### 三条硬规则（每簇精修开工前重读一遍）
>
> **1. 合并各文精华，不是只修 canonical。**
> 被 301 的每一篇都要通读，把里面真正有用的观点 / 场景 / 细节 / 数据 / 反例搬进 canonical。301 的意义是"把所有内容合并到一个目的地"，不是"删掉 N 篇只留一篇"。开工先用 Agent 并行拉 inventory：canonical 现状 + 所有 301 源的精华点 + 要跳过的假功能。
>
> **2. 图片用最新的 `/maipdf2026/`。**
> hero + 2–4 张内文图，合理穿插，描述要具体（不要 `![](...)` 空 alt）。避免同簇两个 canonical 用同一张图。查上面"常用图片清单"挑最贴合的。**不要** 用 `/maipdf-images/`（旧目录）。
>
> **3. 手机端必须能看。**
> - ❌ 4+ col 表格（在 420px 上一定崩）
> - ❌ 2-col 纯填充表格（"Situation | Why it helps" 这种空话堆砌，改散文）
> - ✅ 2-3 col 表格只用于真正的结构化对比（规格参数、横向功能对比）
> - ✅ 宽信息改 H3 小节 + 短段落，或有序列表
> - ✅ 长 URL、长命令用 `<code>` 包裹避免撑破
> - 每次合并完脑内过一遍 "这在 iPhone 上竖屏读起来什么样"

> **质量底线：** 不用 4+ col 表格（手机端崩）；2-col 纯填充表格也一律改散文；只写 MaiPDF 真实功能（100MB 上限 / 2×2cm 打印 / 邮箱验证 / 文件替换保 URL / 10000 次触发日志等），不写假功能（SMS / 地理限制 / QR 颜色定制 / UTM）。
> **图片：** hero + 2-4 张内文图，合理间隔，避免同簇两个 canonical 用同一张 SVG。
>
> **✅ 图片路径规范（最新）：** 一律用 `/maipdf2026/`（含 `/maipdf2026/show_off/` 产品截图、`/maipdf2026/flowchart/` 流程图 SVG）+ `/diagram/en/` 的工作流 SVG。**不要用** `/maipdf-images/`（那是旧/过渡目录）。
>
> **常用图片清单（`/maipdf2026/` 下）：**
> - `MaiPDF_settings_expiration_telegram.png` — 控制面板设置
> - `swap_file_easy_in_user_control_panel.png` — 文件替换
> - `page_redirect_to_accessRecord.png` / `how_to_fill_access_record_for_check.png` — 访问记录
> - `get_email_verification_before_read.jpg` — 邮箱验证门
> - `dynamic_water_mark_example.jpg` — 动态水印示例
> - `Result_of_qr_link.png` — QR + 链接结果
> - `user_control_panel_alotof_functions.png` — 用户控制台总览
> - `how_to_control_panel.png` — 控制面板操作
> - `choose_online_for_sharing_online.png` — 选择在线分享模式
> - `pdf native view on ui.png` — PDF 原生阅读视图
> - `replacefile-without-login.png` — 免登录替换
>
> **`show_off/` 下：**
> - `shareandsend.png` — 链接+发送 hero
> - `share pdf wordwide.png` — 全球分享 hero
> - `email verify.png` / `email verification_only sepcified people can receive.png` — 邮箱验证 hero
> - `self-destruct.png` / `securityshowoff.png` / `openlimit.png` — 安全/限制类 hero
> - `viewercontainer_noprint_nodownlaod.png` / `pdf icon of no printing no downloading.png` — 禁打印/下载
> - `Replace1showoff.png` / `replace2toshowoff.png` — 文件替换展示
> - `facebookwhatsapp.png` — 社交平台分享
> - `goodlookingshow.png` / `pdfshowstyle.png` / `landsacpe.png` / `newpdfshow.png` — 阅读器外观
>
> **`flowchart/` 下（SVG）：** `en-qr-code.svg`、`en-qr-sharing-flow.svg` 等流程图
>
> **`/diagram/en/` 下（SVG）：** `pdf-qr-code-generation-workflow.svg`、`qr-code-distribution-workflow.svg`、`simple-qr-code-flow.svg` 等

### ✅ 已精修

| Canonical | 改动 | 依据 |
|---|---|---|
| `email-verified-pdf-links` (Cluster 6) | 104 → 126 行；加 30-sec fact / no-allowlist caveat / Contracts+NDAs / Course materials；4-col 表格改散文 | 合并 `email-verification-for-pdf-access` 精华 |
| `qr-codes-for-document-distribution` (Cluster 7B) | 28 → ~90 行；加 4 个行业 vertical / Digital vs Physical / 3 个 control preset / 离线 checklist（2×2cm / quiet zone / 3× 受众） / access log 解读 / "QR doesn't fix" 反炒作 | 合并 `mobile-qr-code-pdf-reading` + `mobile-qr-scan-read-pdf-guide` 精华 |
| `pdf-sharing-with-qr-code-complete-guide` (Cluster 7A) | 96 行 7 张 2-col 表格 → ~110 行 setup-focused 散文；加 100 MB 上限 / 200×200px 幻灯 / quiet zone / short-URL fallback / 5 条 test checklist / 文件替换保 QR | 合并 `qr-code-pdf-sharing-made-easy` 等 4 条精华 |
| `maipdf-secure-efficient-sharing` (Cluster 10) | 76 行 **7 张 2-col 废表** → ~110 行真散文；加实际 control 列表 / 5 scenario preset / access log 3 问 / 文件替换段 / 何时不该用的坦诚说明；图片加到 4 张（hero + settings + access log + file swap） | 手机端原表格渲染崩（用户截图确认）；Cluster 10 canonical 必须撑得起产品介绍 |

| `limit-pdf-views-drm` (Cluster 4) | 66 行 5 张 2-col 表 → ~140 行散文；加 audience×reads×1.5 公式 / 3-5 opens per session 实情 / 移动端刷新消耗 views / 9 个 scenario preset（含 press embargo + exam + event QR）/ 10,000 访问阈值自动禁日志+水印（MaiPDF 特有机制）/ 限额达到后的 access-limit-reached 页面+提升上限保 URL / access log 3 大信号 / 6 条 common mistake | 合并 `pdf-access-control-setting-view-limits-time-restrictions` + `pdf-access-control-viewing-limits` + `pdf-access-control-view-limits` + `drm-limit-pdf-views-practical` + `pdf-access-limit-control-guide` + `pdf-set-view-count-limit-guide` 精华；跳过 `setting-view-limits`/`secure-pdf-view-limits`/`pdf-access-controls-practical-implementation`（纯营销填充 + 假功能） |

### 🚧 待精修（按薄 canonical 优先）
- **Cluster 3** `pdf-online-viewing-without-download`（6 个 301 源）
- **Cluster 9A** `share-pdf-online`（6 个 301 源）
- **Cluster 9B** `share-pdf-securely`（10 个 301 源）
- **Cluster 1** `how-to-upload-a-pdf-and-generate-a-secure-link`（7 个 301 源）
- **Cluster 2** `pdf-link-sharing-modern-alternative-email-attachments`（2 个源）
- **Cluster 5** `dynamic-watermarks-on-pdf`（5 个 301 源）
- **Cluster 8** `pdf-prevent-forwarding-guide` / `maipdf-print-restriction-guide`
- **Cluster 11** `share-design-portfolio-with-link` / `resume-link-generator-share-cv-professionally-securely`

### 工作流

1. Agent 并行拉两份 inventory（canonical 现状 + 所有 301 源的精华点 / 要跳过的假功能）
2. 写/重写 canonical：intro-panel → 有名字的 H2 章节 → 真散文（不是 2-col 填充）→ 图片 hole 自然穿插 → Related reading（指回其他 canonical）
3. 改动写回 `Documents\GitHub\cloudflareAstro` 主 checkout（不是 worktree），**不 commit**，用户自己 commit + push
4. 本文件每完成一簇即追加记录

---

## 下一轮建议

- **cn/ 补齐**：Round 1 已做 ~30 条 cn 301，按 EN 的 11 簇对齐补齐剩余
- **de/ / es/ / fr/ / ja/ / ko/**：用相同 11 簇结构各自评审
- **offline maipdf 整合**（13 篇）：主要整合 `offline-vs-online-pdf-sharing-*` 三连
- **maiimg 整合**（38 篇）：`maiimg-*-guide` 行业模板文可能有大量重叠
