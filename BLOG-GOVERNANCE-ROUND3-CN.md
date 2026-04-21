# Blog Governance Round 3 — Online MaiPDF Consolidation (CN)

> **Created:** 2026-04-21
> **Status:** ✅ **Round 3a (301s) + Round 3b (canonical 精修) 全部执行完毕 2026-04-21**
> **Scope:** `src/content/blog/cn/` 中 online maipdf 主题，与 EN Round 2 对齐。**不含**：`maiimg-*` / 离线 DRM / Privnote / 行业垂直页（分别留待 Round 4/5/6/7）。
>
> **Round 3a 结果：** 新增 **47 条 301** + 3 条链式改线，CN sitemap 从 148 → **101**（sitemap 总量 703 → 656）。所有 301 目标已校验可索引、0 条指向 404 或 noindex。
>
> **Round 3b 结果（精修）：** **16 个 canonical** 全部合并精修完成（Cluster 4 作样板先做 + 其余 15 个并行完成），平均长度从 60–100 行扩到 **115–193 行**，每篇并入对应 301 源的精华、清洗掉所有 spec §2 黑名单假功能（Telegram、SecureView、截屏检测、地理围栏、AI/区块链等）、纠正"仅离线版"误植和"失效即删除"等产品事实错误。Build 通过、sitemap 仍 101 篇、267 条 301 全部有效。
>
> **参考**：[`BLOG-GOVERNANCE-ROUND2-ONLINE.md`](BLOG-GOVERNANCE-ROUND2-ONLINE.md) 里的 "MAIPDF Product Knowledge Base"、"三条硬规则" 和图片清单本轮全部适用。**CN 精修硬边界**（都已在知识库里）：
> - ❌ 绝不提 **Telegram**（`maipdf.cn` 没有）
> - ❌ 绝不写"邮箱验证"做核心（CN 是**手机号白名单，≤50 个中国大陆号**）
> - ❌ 绝不把"阅读提醒"写成可靠功能（CN 送达率低，实际基本不可用）
> - 图片一律用 `/maipdf2026/`（`/maifle/` 和 `/cn2025May/` 是旧目录，精修时清理）

---

## 本轮 11 簇一次过（对齐 EN Round 2 结构）

### Cluster 1 — Upload → Link
**Canonical:** `upload-pdf-get-link`（Round 1 已确立）
**Round 1 已 301：** `convert-pdfs-to-shareable-links`, `instant-pdf-link-generation`, `quick-pdf-links`
**新 301（5）：**
- `maipdf-link-generation-guide` → `upload-pdf-get-link`
- `maipdf-instant-link-generation-guide` → `upload-pdf-get-link`
- `pdf-one-click-share-links-maipdf` → `upload-pdf-get-link`
- `pdf-quick-share-3-steps` → `upload-pdf-get-link`
- `pdf-to-shareable-link-tutorial` → `upload-pdf-get-link`
**链式改线（1）：** `minimalist-pdf-link-generator` 原 301 指向 `maipdf-link-generation-guide`，改为直接指向 `upload-pdf-get-link`（避免 301 → 301 链）
**Kept：** `make-pdf-into-a-link`（与 EN 对齐，保留差异化视角）

---

### Cluster 2 — Email 附件 → Link
> CN 把这簇折进 Cluster 9 了（`replace-email-attachments` 在 Round 1 就 301 到 `share-pdf-online`）。本簇只剩 1 篇要处理。

**新 301（1）：**
- `email-pdf-links` → `share-pdf-online`

---

### Cluster 3 — 在线阅读 / 不下载
**Canonical:** `pdf-online-viewing-without-download`（标题 "PDF 在线浏览但不下载：更适合正式分享的做法" 已是精修味）
**新 301（4）：**
- `pdf-online-preview` → `pdf-online-viewing-without-download`
- `pdf-online-viewing-guide` → `pdf-online-viewing-without-download`（"PDF在线浏览革命..." 纯营销填充）
- `pdf-online-sharing-security-best-practices` → `pdf-online-viewing-without-download`
- `how-to-make-pdf-browsable-online` → `pdf-online-viewing-without-download`
**Kept：** `pdf-online-viewer-prevent-copy`（防复制角度）, `pdf-online-drm-complete-guide`（DRM 角度）, `pdf-share-link-disable-download`（下载禁用 canonical，Round 1 已确立）, `how-to-make-a-download-link-for-a-pdf`（EN 对齐保留）

---

### Cluster 4 — 查看次数 / DRM
**Canonical:** `pdf-set-view-count-limit-guide`（Round 1 已确立，标题"怎么设才合理，不是越小越安全"已是精修味）
**Round 1 已 301：** `drm-limit-pdf-views-practical`, `limit-pdf-views-drm`, `pdf-security-set-view-limits-prevent-unauthorized-access`, `restrict-number-of-views-for-shared-pdf`
**新 301（6）：**
- `pdf-access-control-viewing-limits` → `pdf-set-view-count-limit-guide`（✓ spot-check 确认是三胞胎文件之一，"仅离线版"标签误植）
- `pdf-access-control-view-limits` → `pdf-set-view-count-limit-guide`（✓ 同上）
- `pdf-access-control-view-limits-expiration` → `pdf-set-view-count-limit-guide`（✓ 同上）
- `pdf-access-limit-tutorial` → `pdf-set-view-count-limit-guide`
- `maipdf-view-count-setting-guide` → `pdf-set-view-count-limit-guide`
- `maipdf-expiration-setting-guide` → `pdf-set-view-count-limit-guide`（✓ spot-check 确认"仅离线版"误植）
- `maipdf-expiration-self-destruct-guide` → `pdf-set-view-count-limit-guide`
- `pdf-temporary-sharing-link` → `pdf-set-view-count-limit-guide`

**链式改线（1）：** `pdf-access-controls-practical-implementation` 原指向 `pdf-access-limit-control-guide`（中转页，本轮要收掉），改为直接指向 `pdf-set-view-count-limit-guide`；`pdf-access-limit-control-guide` 本身也新增 301 → `pdf-set-view-count-limit-guide`
**Kept：** `pdf-link-view-limit-watermark`（水印+限次综合角度）, `access-control-permission-matrix`（权限矩阵概念页，架构角度，EN 没有对应但 CN 值得保留）

---

### Cluster 5 — 动态水印
**Canonical:** `pdf-dynamic-watermark-security-guide`（Round 1 已确立）
**Round 1 已 301：** `dynamic-watermarks-on-pdf`, `dynamic-watermarks-on-pdf-cn`
**新 301（3）：**
- `dynamic-watermark-technology` → `pdf-dynamic-watermark-security-guide`
- `marketing-materials-dynamic-watermark` → `pdf-dynamic-watermark-security-guide`（EN 对齐）
- `pdf-watermark-protection-tutorial` → `pdf-dynamic-watermark-security-guide`
**Kept：** `digital-watermarking-technology-technical-implementation`（技术实现深讲，EN 对齐）, `dynamic-qrcode-watermark`（QR+水印组合，独特角度）

---

### Cluster 6 — 手机号验证（CN 版 Email Verify）
**Canonical:** `mobile-verification-document-security`（Round 1 已确立）
**Round 1 已 301：** `network-verification-protocols`
**新 301（1）：**
- `mobile-verification-pdf-security-guide` → `mobile-verification-document-security`

> **精修时硬边界提醒**：写这个 canonical 时必须讲清"**仅限中国大陆手机号，白名单上限 50 个**"。超上限、境外号都是假功能，必须拒写。

---

### Cluster 7 — QR 分享（三 canonical，待决策）
**CN 现状比 EN 多一个 canonical**。EN 只有 A（tutorial）+ B（distribution use-cases）两个；CN 目前有三个：
- A：`qr-code-pdf-sharing`（通用分发）
- B：`pdf-qr-code-generation-guide`（生成教程）
- C：`mobile-qr-scan-read-pdf-guide`（手机扫码阅读）

**Round 1 已 301：** `one-click-pdf-link-qrcode` → A；`qrcode-pdf-sharing` → A；`qrcode-pdf-sharing-revolution` → A；`pdf-qrcode-generation-tutorial` → B；`scan-qrcode-read-pdf` → C
**新 301（4）：**
- `qr-code-pdf-sharing-made-easy` → `pdf-qr-code-generation-guide`（教程调性）
- `qrcode-share-pdf-3-steps` → `pdf-qr-code-generation-guide`（3 步教程）
- `maipdf-qrcode-generation-guide` → `pdf-qr-code-generation-guide`（教程重复）
- `qr-codes-future-digital-distribution` → `qr-code-pdf-sharing`（分发高层话题）

**🔶 待你决策（二选一）：**
- **方案 A（保 3 canonical）**：手机扫码阅读这个视角 CN 市场确实流量大（微信分享场景），C 有独立价值，保留。
- **方案 B（对齐 EN 结构收成 2 canonical）**：把 C 并入 A，`mobile-qr-scan-read-pdf-guide` → `qr-code-pdf-sharing`，精修时把手机角度的内容吸收进 A。

我默认倾向 **A**（CN 市场 context 不同），但请你拍。

---

### Cluster 8 — 防转发 / 禁打印
**Canonicals:**
- `pdf-prevent-forwarding-guide`（防转发）
- `maipdf-print-restriction-guide`（禁打印）
**新 301（2）：**
- `pdf-encryption-prevent-forwarding-complete-guide` → `pdf-prevent-forwarding-guide`（EN 对齐）
- `pdf-disable-printing-protection-guide` → `maipdf-print-restriction-guide`（EN 对齐）
**Kept：** `prevent-file-copying-protection-guide`（防复制自成一簇，EN 对齐）

---

### Cluster 9 — 通用安全伞（双 canonical，最大簇）
**Canonicals:**
- A：`share-pdf-online`（入门分享）
- B：`share-pdf-securely`（安全控制视角）
**Round 1 已 301 到 A：** `share-pdf-online-free-secure-tool`, `replace-email-attachments`, `pdf-sharing-benefits`
**Round 1 已 301 到 B：** `fast-pdf-sharing-download-control`, `how-to-share-pdf-online-securely-complete-guide`
**Round 1 其他相关：** `secure-pdf-sharing-options` → `maipdf-best-choice-secure-pdf-sharing`；`pdf-security-best-practices-complete-guide` → `pdf-security-protection`

**新 301 到 A（6）：**
- `host-pdf-online-secure-sharing-guide` → `share-pdf-online`
- `easy-pdf-sharing` → `share-pdf-online`
- `smart-pdf-sharing` → `share-pdf-online`
- `zero-cost-pdf-sharing` → `share-pdf-online`
- `free-pdf-tools-to-boost-productivity` → `share-pdf-online`
- `free-pdf-tools-no-download-registration` → `share-pdf-online`（15/10 个工具对比的 roundup 型填充文）

**新 301 到 B（2）：**
- `pdf-secure-sharing-control` → `share-pdf-securely`
- `safe-control-pdf` → `share-pdf-securely`（**重复内容**：与 `enterprise-document-security` 标题完全相同，归并到 B 更合适）

**Kept（5）：** `share-pdf-online` / `share-pdf-securely`（两个 canonical）、`safeguard-your-pdfs-online`（EN 对齐）、`free-pdf-hosting`（EN 对齐）、`free-pdf-sharing-tools-comparison-guide`（EN 对齐）、`maipdf-best-choice-secure-pdf-sharing`（Round 1 canonical）

**🔶 待你决策：** `pdf-security-protection`（Round 1 里承接了 `pdf-security-best-practices-complete-guide`）**是否要再一次 301 到 `share-pdf-securely`**（对齐 EN Round 2 —— EN 就把 `pdf-security-protection` 并进了 `share-pdf-securely`）？如同意，则：
- 新增 `pdf-security-protection` → `share-pdf-securely`
- 链式改线：`pdf-security-best-practices-complete-guide` 原 → `pdf-security-protection`，改为 → `share-pdf-securely`

---

### Cluster 10 — 产品介绍 / Workflow
**Canonical:** `maipdf-secure-efficient-sharing`
**新 301（6）：**
- `pdf-sharing-introduction` → `maipdf-secure-efficient-sharing`（EN 对齐）
- `pdf-sharing-control-revolution` → `maipdf-secure-efficient-sharing`（"革命"营销填充）
- `pdf-sharing-evolution-smart-control` → `maipdf-secure-efficient-sharing`（同上）
- `pdf-sharing-revolution-maipdf` → `maipdf-secure-efficient-sharing`（同上）
- `pdf-sharing-like-webpage` → `maipdf-secure-efficient-sharing`
- `pdf-sharing-stickers` → `maipdf-secure-efficient-sharing`（贴纸概念过于营销）
**Kept：** `maipdf-complete-workflow-guide-with-diagrams`（EN 对齐，图解工作流）

---

### Cluster 11 — Portfolio / Resume（双 canonical）
**Canonicals:**
- `share-design-portfolio-with-link`（作品集）
- `elegant-secure-sharing-resume-portfolio`（简历 + 作品集 + 报价单）
**Round 1 已 301：** `creative-portfolio-links-showcase-art-design-work-professionally`, `designer-portfolio-sharing-tutorial/pdf-to-shareable-link-tutorial`
**新 301（1）：**
- `designer-portfolio-sharing-tutorial`（父级文件）→ `share-design-portfolio-with-link`

---

## 额外：跨簇重复清理（标题雷同）

独立于 11 簇之外，清理 3 组明显的"双胞胎" SEO 填充：

| 保留（canonical 化） | 301 掉 | 备注 |
|---|---|---|
| `enterprise-document-security` | `safe-control-pdf`（已在 Cluster 9 列入）| 标题同样"企业文档安全不可忽视..." |
| `enterprise-document-security-maipdf-team` | `enterprise-document-security-team-version` | 标题同样"企业文档安全管理：MaiPDF团队版功能详解" |
| `pdf-safe-sharing-for-training` | `pdf-safe-sharing-training-2` | 标题同样"培训资料怎么发才安全..." 且 `-2` 后缀明显是误创建 |

> 注：这 3 组中的"保留"文件会在后续 Round 4（企业/合规簇）进一步审。

---

## 汇总数字（已执行）

| 操作 | 数量 |
|---|---|
| 新增 301（Cluster 1-11 主体）| 44 |
| 新增 301（跨簇重复清理）| 2（`enterprise-document-security-team-version`, `pdf-safe-sharing-training-2`）|
| 新增 301（Q3 批准：`pdf-security-protection` → `share-pdf-securely`）| 1 |
| 链式改线（Round 1 中转页收口）| 3（`minimalist-pdf-link-generator`, `pdf-access-controls-practical-implementation`, `pdf-security-best-practices-complete-guide`）|
| **合计新增 301** | **47** |
| CN sitemap 实际变化 | 148 → **101**（-47）|
| 全站 sitemap URL 变化 | 703 → **656**（-47）|

### Cluster 7 / 9 最终决策（已执行）

- **Cluster 7（QR 分享）**：✅ 保 **3 canonical**（A `qr-code-pdf-sharing` + B `pdf-qr-code-generation-guide` + C `mobile-qr-scan-read-pdf-guide`），CN 市场微信扫码场景 C 独立价值足够。
- **Cluster 9**：✅ `pdf-security-protection` → `share-pdf-securely`，同时链式改线 `pdf-security-best-practices-complete-guide` 直接指向 `share-pdf-securely`，对齐 EN Round 2 结构。

---

## 执行步骤（已完成 ✅）

1. ✅ 追加 47 条新 301 到 `src/data/blog-legacy-redirects.mjs`（按 11 簇分块 + 跨簇清理 + Q3 批注，附 Round 3 注释）
2. ✅ 更新 3 条已有条目（链式改线 Round 1 中转页）
3. ✅ 47 个源 `.md` 文件 frontmatter 加 `noindex: true`（通过 `scripts/_cn-round3-noindex.ps1` 批量完成，保留 BOM/CRLF）
4. ✅ `npm run build:fast` 重新生成 sitemap（703 → 656，CN 148 → 101，全部匹配预期）
5. ✅ 跑 `scripts/_check-redirects.ps1`：198 条活跃 301 全部指向可索引目标，0 个 301→404、0 个 301→noindex
6. ✅ 本文件追加"已执行"小节记录实际结果

## ✅ Round 3b 执行结果（2026-04-21，已完成）

**精修方法**：共享规则文档 [`BLOG-REFINE-SPEC-CN.md`](BLOG-REFINE-SPEC-CN.md) + 5 个并行子代理按簇分工。Cluster 4 先单独做样板后，其余 14 篇 + 1 篇跨簇 canonical 并行完成。

### 每篇精修后的产出

| Cluster | Canonical | 行数 | 吸并源数 |
|---|---|---|---|
| **4** | `pdf-set-view-count-limit-guide` | 167 | 0（样板，沿用 Round 3a 吸并结果）|
| **5** | `pdf-dynamic-watermark-security-guide` | 121 | 3 |
| **6** | `mobile-verification-document-security` | 145 | 1 |
| **8A** | `pdf-prevent-forwarding-guide` | 137 | 1 |
| **8B** | `maipdf-print-restriction-guide` | 164 | 1 |
| **1** | `upload-pdf-get-link` | 136 | 5 |
| **11** | `share-design-portfolio-with-link` | 115 | 1 |
| **X1** | `enterprise-document-security-maipdf-team` | 119 | 1 |
| **X2** | `pdf-safe-sharing-for-training` | 134 | 1 |
| **3** | `pdf-online-viewing-without-download` | 139 | 4 |
| **7A** | `pdf-qr-code-generation-guide` | 135 | 3 |
| **7B** | `qr-code-pdf-sharing` | 126 | 1 |
| **7C** | `mobile-qr-scan-read-pdf-guide` | 111 | 0（轻度 polish）|
| **9A** | `share-pdf-online` | 131 | 7（Cluster 9A 的 6 + Cluster 2 的 `email-pdf-links`）|
| **9B** | `share-pdf-securely` | 130 | 3 |
| **10** | `maipdf-secure-efficient-sharing` | 193 | 6 |

**合计**：16 个 canonical 精修，吸并 **38 个 301 源**的精华（其余 9 个 301 源的内容 Round 3a 已在当前 canonical 里，无需再并）。

### 清洗掉的内容（spec §2 黑名单）

- **假功能**：SecureView、FenceView、截屏检测、地理围栏、区块链存证、AI 异常行为、精确地理位置、设备指纹、访客标识限制、黑名单、按日/周重置次数、QR 颜色/Logo/形状自定义、量子水印
- **CN 不适用**：Telegram 机器人提醒（全部清除）、邮箱验证作为核心（仅在 9A 加 note 强调 CN 走手机号）、阅读邮件通知（CN 送达率低，不写）
- **产品事实错误**：「仅离线版」误植标签、「链接失效即文件删除」（改为「文件仍在账户」）、「支持 200MB」「支持境外手机号」、「Word/Excel 直传」等
- **营销腔**：「革命性」「新时代」「划时代」「智能」「3 秒生成」「99.9% 安全」「效率 +300%」、伪用户反馈、伪案例数据

### 事实订正

- **4 大控制项独立但叠加**：打开次数 / 单次阅读时长 / 过期时间 / 是否允许下载，任何一项先触发链接即失效
- **反常识**："新总额 < 已用次数"立即失效（Cluster 4/8A 多次强调）
- **文件替换工作流**：游客模式凭修改码 / 注册用户在控制面板直接操作（Cluster 4/1/3/10 多处覆盖）
- **CN 手机验证上限**：最多 **50 个中国大陆手机号**（Cluster 6 详讲，其他簇提及时统一口径）
- **标准防护模式 = 禁下载 + 禁打印**：一个开关的两面（Cluster 8B 核心立意）

### 互链结构

- **7A ↔ 7B ↔ 7C** 三篇互链成闭环，保留 3 canonical 的差异化角度：7A 讲"怎么生成"、7B 讲"什么场景用"、7C 讲"被扫方体验"
- **9A ↔ 9B** 互链：9A 是入门（怎么在线分享）、9B 是安全伞（怎么加控制）
- **Cluster 10** 作为入口地图，6 条 Related reading 把读者分流到 Cluster 1/4/5/6/7A/9B
- 所有内部链接 slug 均在 [`BLOG-REFINE-SPEC-CN.md`](BLOG-REFINE-SPEC-CN.md) §4.6 白名单内，0 死链

### Build 验证

- ✅ `npm run build:fast` 通过（13.11s）
- ✅ 两个 YAML 引号嵌套错误已修（`maipdf-print-restriction-guide`、`pdf-safe-sharing-for-training`——把 description 里的英文双引号改成中文「」引号）
- ✅ CN indexable 仍 101（未误删）
- ✅ Sitemap 101 篇 CN 条目，和文件统计完全匹配
- ✅ 267 条 active 301 全部指向 indexable 目标，0 条指向 404 或 noindex

---

## 用户决策记录（2026-04-21）

1. ✅ 整体方案照做（实际执行 47 条）
2. ✅ **Cluster 7**：保 3 canonical（方案 A）
3. ✅ **Cluster 9**：同意把 `pdf-security-protection` 并入 `share-pdf-securely`，并链式改线 `pdf-security-best-practices-complete-guide`
4. ✅ Round 3a 执行完成、经用户 GSC 验证无异常后，用一句"过"授权 Round 3b，精修已于同日完成

---

## ⏸ 下一步（待用户决策）

1. 抽审任意几篇精修后的 canonical，特别关注产品事实、语气、Related reading 结构
2. `git diff` / `git status` 审阅改动，`git add` + commit 本轮全部变更
3. `npm run deploy:fast` 把新 sitemap + 16 篇精修 canonical 发到生产
4. 等 GSC 重新抓取后看收录变化（理论上 CN 仍 101 条、但每篇内容深度显著增加，有利于排名）
5. 下一轮可选方向：
   - **Round 4** — MaiImg/图片分享的 CN 整顿（目前 CN noindex 里还有大量 `maiimg-*` 源）
   - **Round 5** — 离线 DRM 相关页面精修（`drm-*`, `offline-pdf-*`）
   - **Round 6** — Privnote / 行业垂直页（`privnote-*`, `secure-document-sharing-in-healthcare` 等）
