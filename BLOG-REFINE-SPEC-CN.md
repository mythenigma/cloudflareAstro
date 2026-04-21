# CN Round 3b — 精修规则（子代理必读）

本文件是给精修 canonical 的子代理用的共享规则。读完再动笔。

---

## 1. MaiPDF 产品事实（只写这些真的有的功能）

### 1.1 两个站点

- **maipdf.com**（国际版）—— 覆盖全球，**邮箱白名单验证**、**Telegram 机器人提醒**、英文界面为主。
- **maipdf.cn**（中文版）—— 覆盖中国大陆，**手机号白名单验证（最多 50 个中国大陆手机号）**、**无 Telegram、无邮件提醒**（中文版的邮件到达率极低，基本不可用，不要写）。

**本轮精修的全部是 `blog/cn/` 下的中文博客**。CN 文章里：
- ❌ 绝对不要写 Telegram——大多数中国用户不知道这个东西
- ❌ 不要写"邮件通知/阅读提醒"（中文版基本不可用）
- ✅ 验证请写**手机号白名单（≤50 个大陆号）** 作为核心
- ✅ 可以提国际版 maipdf.com 有额外能力，但一笔带过即可

### 1.2 四个核心访问控制项（真的有）

| 控制项 | 说明 |
|---|---|
| 打开次数 | 链接总共还能被点开几次（1–1000 自定义） |
| 单次阅读时长 | 一次打开最长可读多久（1 分钟–24 小时），超时关页 |
| 过期时间 | 具体的失效日期，到期链接彻底失效 |
| 是否允许下载 | 纯在线阅读 vs 允许下载原文件 |

四项**独立，任何一项先触发都让链接失效**。

### 1.3 标准防护模式 vs FineView 模式

- **标准防护模式**：禁止下载 + 禁止打印（就是把下载开关关掉 + 打印锁住）
- **FineView 模式**：进阶使用场景（不要展开细节，避免写错——如果需要提，只说"进阶模式"即可，不要编具体机制）

### 1.4 动态水印（真的有）

- 水印内容：查看者的**邮箱或 IP**（根据国际版/中文版的验证方式而定；CN 上多是 IP）
- 效果：盖在每一页上，截图可溯源
- **不要写：截屏检测**（这是假的）
- **不要写：防截屏技术**（都是假话）

### 1.5 手机号白名单（CN 专属核心功能）

- 上传者添加最多 **50 个中国大陆手机号**
- 仅名单内号码能收到短信验证码
- 输入验证码后才能打开 PDF
- ❌ **不要写：境外手机号**（只支持大陆号）
- ❌ **不要写：一次添加上千号**（硬上限 50）

### 1.6 国际版手机号场景（EN）

国际版 maipdf.com **用邮箱白名单**，不用手机号。CN 博客不用写这一点。

### 1.7 QR 分享（真的有）

- 生成链接的同时可生成 QR 码
- QR 码上的所有访问控制（次数/有效期/下载/手机验证）和链接完全一致
- 扫 QR 的是链接，不是 PDF 文件本身——所以权限可控
- **不要写：QR 颜色/Logo/形状自定义**（没这功能）

### 1.8 文件替换（不换链接）

两种路径：

1. **游客模式**：用**修改码**作凭证（第一次上传时系统给的那串，注意另存）。替换时需要旧文件修改码 + 新上传文件修改码。
2. **注册+登录用户**：在**用户控制面板**里直接点替换，无需修改码。

- 链接 URL 保持不变
- 新文件的访问控制设置也会同时覆盖旧链接的
- 对方拿到的旧链接自动指向新文件+新设置

### 1.9 文件上限、格式

- 单文件 ≤ 100 MB
- 支持 PDF
- 不要写"支持 Word/Excel 直接上传"——没有这功能，需要先转成 PDF

### 1.10 离线 DRM（存在但不是本轮主题）

- 入口：`maipdf.com/pdf/drm.php`
- 流程：上传 PDF → 设打开次数 + 阅读码 → 下载加密 .html 包 → U 盘/局域网分发 → 浏览器打开输阅读码阅读（完全离线）
- **本轮所有 canonical 都只讲在线分享。** 需要离线时用一句话提"还有离线 DRM 工作流，另做"即可，不展开。

### 1.11 图片生成（MaiImg）

MaiPDF 也支持 PDF → 图片生成（每页变成带水印的图片）。本轮不深讲，Round 5 单独做。

### 1.12 注册 vs 游客

- 游客：可以上传、设权限、生成链接——全套都能用
- 注册：多了账户后台，可以看历史文件列表、统计、批量替换、无需修改码

---

## 2. 假功能黑名单（绝对不能写）

- ❌ SecureView（假模式名）
- ❌ FenceView（假模式名）
- ❌ 截屏检测 / 防截屏
- ❌ 地理围栏 / 区域限制 / IP 地域封锁
- ❌ 设备级限次（按设备 ID 单独计数）
- ❌ 访问次数按日/周/月重置
- ❌ 每个访客单独计次（实际是总额度）
- ❌ AI 分析 / 区块链存证 / UTM 参数追踪
- ❌ 异地访问自动告警
- ❌ 黑名单（仅有白名单）
- ❌ Telegram（CN 博客里不出现）
- ❌ 邮件提醒（CN 博客里不写阅读送达）
- ❌ QR 颜色/Logo 自定义

如果源文档里提到上面任一项，精华里 **删掉**，不要并入 canonical。

---

## 3. 常见源文档错误（需要清洗）

1. **"仅离线版"标签误植**：很多源文档标题/标签里写"（仅离线版）"，但正文讲的是在线链接分享。本轮全部按**在线功能**重写，删掉"（仅离线版）"等字样。
2. **过期后文件是否自动删除**：源文档说法冲突。**正确事实**：链接失效后文件仍在账户/历史里可管理，**统计也保留**；不要写"文件自动删除"。
3. **日历到期是否支持**：某篇源文说不支持——错的。**过期时间是 4 大控制项之一，必然支持**。
4. **访问日志里能看什么**：正确的字段是时间、次数剩余、最后访问、配手机验证时能看哪个号码。**不要写"精确地理位置"**，那是编的。

---

## 4. 语气与结构要求

### 4.1 语气

- **不是越小越安全** 这种口吻——思辨、实用、拒绝做样子
- 不要营销腔、不要"革命性"/"划时代"/"一键"这种空话
- 不要"随着数字化进程...." 类的八股开头
- 场景举例要**具体**（"报价 5 次+7 天"而不是"适合商业场景"）
- 长短句结合，少用纯列表
- 重要反常识要敢说（如 Cluster 4 的"低次数不等于高安全"）

### 4.2 结构模板（不是硬框架，按内容调）

1. H1（只有一个，同 title）
2. Intro 段（1 段，点题 + 挑一个反常识或独特视角）
3. Hero image（`/maipdf2026/` 下的图）
4. `## 一眼看懂` 简表（2-4 列，可选）
5. 3-8 个 H2 章节
   - 至少有一个 **"怎么做/UI 路径"** 章节（配图）
   - 至少有一个 **"和什么搭配用"** 章节
   - 至少有一个 **"常见误区"** 或 **"什么时候不适用"** 章节
6. `## 直接回答这个页面`（一段话，给只读结尾的人一个直接答案）
7. `## Related reading` 清单（4-6 条，全部验证过的兄弟 canonical）

### 4.3 表格约束

- 手机端友好：最多 **3-4 列**，不能更多
- 第一列别太长——中文 10 字以内；不然手机端 `word-break` 会挤成怪样
- 有价值才用表；不要为了填充用两列表

### 4.4 Frontmatter 要求

```yaml
---
title: "保持现有，可微调但不要大改"
description: "重写一条，~100 字以内，讲清楚这篇解决的具体问题"
pubDate: "保留原值"
updatedDate: "Apr 21 2026"     # 本轮统一改这个
heroImage: "/maipdf2026/xxx.png"  # 必须是已存在的图
tags: [...]                      # 保留或微调
showDefaultCta: true
---
```

**不要加 `noindex: true`**——canonical 要被 Google 收录。

### 4.5 图片路径

- 全部走 `/maipdf2026/` 目录
- 以下图片确认存在（可以直接用）：
  - `/maipdf2026/show_off/openlimit.png`
  - `/maipdf2026/show_off/securityshowoff.png`
  - `/maipdf2026/show_off/pdfshowstyle.png`
  - `/maipdf2026/show_off/viewercontainer_noprint_nodownlaod.png`
  - `/maipdf2026/show_off/pdf icon of no printing no downloading.png`
  - `/maipdf2026/show_off/share_pdf_online-show.png`
  - `/maipdf2026/show_off/share pdf wordwide.png`
  - `/maipdf2026/show_off/shareandsend.png`
  - `/maipdf2026/show_off/showpdf.png`
  - `/maipdf2026/show_off/goodlookingshow.png`
  - `/maipdf2026/show_off/landsacpe.png`
  - `/maipdf2026/show_off/replace2toshowoff.png`
  - `/maipdf2026/show_off/Replace1showoff.png`
  - `/maipdf2026/show_off/newpdfshow.png`
  - `/maipdf2026/show_off/self-destruct.png`
  - `/maipdf2026/show_off/facebookwhatsapp.png`
  - `/maipdf2026/Maipdf_LANDING_PAGE.png`
  - `/maipdf2026/newpdfshow.png`
  - `/maipdf2026/pdf native view on ui.png`
  - `/maipdf2026/page_redirect_to_accessRecord.png`
  - `/maipdf2026/how_to_control_panel.png`
  - `/maipdf2026/how_to_fill_access_record_for_check.png`
  - `/maipdf2026/maipdf_header_login_or_upload_file.png`
  - `/maipdf2026/choose_online_for_sharing_online.png`
  - `/maipdf2026/user_control_panel_alotof_functions.png`
  - `/maipdf2026/swap_file_easy_in_user_control_panel.png`
  - `/maipdf2026/replacefile-without-login.png`
  - `/maipdf2026/Result_of_qr_link.png`
  - `/maipdf2026/remove_ad_or_delete_ads.png`
  - `/maipdf2026/remove_ad_or_delete_ads_login.png`
  - `/maipdf2026/recharge_by_paypal_paypal-credit.png`
- **不要**用 `MaiPDF_settings_expiration_telegram.png`——CN 站不出现 Telegram
- **不要**写不存在的图片文件

注意：`show_off/email verify.png` 和 `show_off/email verification_only sepcified people can receive.png` 这两张里有邮箱验证 UI——**CN 博客不要用**。

### 4.6 Related reading 规则

- 只链**已经精修过或即将精修的 canonical**（不要链被 301 的源，不要链 noindex 的文件）
- 可链的 CN canonical 清单（全部都在 `src/content/blog/cn/`，都是 indexable）：
  - Cluster 1 — `upload-pdf-get-link`
  - Cluster 3 — `pdf-online-viewing-without-download`
  - Cluster 4 — `pdf-set-view-count-limit-guide` ✅ 已精修
  - Cluster 5 — `pdf-dynamic-watermark-security-guide`
  - Cluster 6 — `mobile-verification-document-security`
  - Cluster 7A — `pdf-qr-code-generation-guide`
  - Cluster 7B — `qr-code-pdf-sharing`
  - Cluster 7C — `mobile-qr-scan-read-pdf-guide`
  - Cluster 8A — `pdf-prevent-forwarding-guide`
  - Cluster 8B — `maipdf-print-restriction-guide`
  - Cluster 9A — `share-pdf-online`
  - Cluster 9B — `share-pdf-securely`
  - Cluster 10 — `maipdf-secure-efficient-sharing`
  - Cluster 11 — `share-design-portfolio-with-link`
  - Cross-cluster — `enterprise-document-security-maipdf-team`, `pdf-safe-sharing-for-training`
- 其他可链的兄弟 canonical（原已存在）：
  - `pdf-share-link-disable-download`
  - `pdf-safe-sharing-for-training`
- **别自己编一个 slug**——不在这个列表里的都视作死链

---

## 5. 精华合并方法论

1. **通读**每个源文档（包括 301 源、也包括当前 canonical）
2. 按主题聚合：为什么要做 / 怎么做 / 场景预设 / 搭配什么 / 后续管理 / 误区
3. **去重** + **清洗假功能** + **纠正事实错误**
4. 保留 canonical 原有**标志性表达**（"不是越小越安全"之类的口号句）
5. 补进源文档里真正有价值的东西：
   - 具体数字（"5 次 + 7 天" 之类的配方）
   - 反常识点（"事后调低总额会立即失效"）
   - UI 路径（"文件设置面板 → 勾选打开次数"）
   - 业务场景（招标/财报/面试/活动 ...）
6. **不要**简单拼接——用连贯的叙事重新组织，避免"A 源的第 1 段 + B 源的第 2 段"这种拼贴感
7. **篇幅**：原 canonical 大多 60-100 行，精修后通常 120-200 行。不要为了长而长；每行都要有信息。

---

## 6. 参考样板

**Cluster 4 已完成的 canonical**：`src/content/blog/cn/pdf-set-view-count-limit-guide.md`

动笔前建议读一遍找感觉。它包含了：
- Intro + 一眼看懂表
- 什么情况适合
- 方法论（三问法 + 公式）
- 场景预设表
- 4 大控制项统一表
- UI 路径（配图）
- 发出去之后还能改（含反常识"总额<已用立即失效"）
- 文件替换（两种路径都讲）
- 到达上限之后
- 组合拳（CN 手机验证 / 水印 / 禁下载）
- 访问日志怎么读
- 常见误区
- 什么时候它不够用（承接其他 canonical）
- 直接回答
- Related reading

---

## 7. 执行顺序

1. Read 当前 canonical（了解现状和声音）
2. Read 全部 301 源（找精华 + 找要清洗的）
3. 按本文 §4 结构重写
4. 验证 Related reading 每个 slug 都在 §4.6 的清单里
5. 用 Write 工具覆盖 canonical 文件（保留 frontmatter 原有字段+改 updatedDate）
6. **不要改任何源文件**（它们都已 301+noindex，不碰）
