---
title: "加锁 HTML PDF 分享完整指南：把文件交给收件人也保有控制权"
description: "MaiPDF Secure Share（drm.maipdf.com）把 PDF 打包成自包含的加锁 HTML 文件。完整指南：什么时候用、怎么用、有哪些限制——不是真正的离线工具。"
pubDate: "Nov 28 2025"
updatedDate: "May 12 2026"
heroImage: "/offlinepages/offline-MaiPDF-Home-Page.png"
tags: ["Secure Share", "drm.maipdf.com", "加锁HTML", "MaiPDF", "PDF分发"]
---

# 加锁 HTML PDF 分享完整指南：把文件交给收件人也保有控制权

<div class="intro-panel">
  <p>这里讲的"离线 PDF 分享"——MaiPDF Secure Share（<a href="https://drm.maipdf.com/">drm.maipdf.com</a>）——是把 PDF 打包成<strong>一个自包含的加锁 HTML 文件</strong>，让你像分发普通文件那样发出去（邮件、网盘、U 盘），同时还能事后撤销/延期。要明确：这不是"完全离线"工具——<strong>每次打开都要联网做一次性 license 校验</strong>。如果你需要真正的气隔分发，请用本地加密工具或加密硬盘，而不是这个产品。</p>
</div>

![Secure Share 首页](/offlinepages/offline-MaiPDF-Home-Page.png)

## 为什么需要加锁 HTML 文件

**适合的场景：**
- 文件需要跟着收件人走（U 盘、内网共享、邮件附件）
- 你希望<strong>交付后仍保留撤销/延期权力</strong>
- 收件人在打开时有网络（即使日常断网，打开时能连上即可）
- 培训现场、产品手册、机密报告审阅等

**带来的能力：**
- ✅ 一份自包含文件，任何现代浏览器直开
- ✅ AES-256-GCM 加密，PDF 本体不存在服务器
- ✅ 打开次数 + 过期由服务端原子校验
- ✅ 可选每页水印
- ✅ <code>/manage</code> 或登录 dashboard 实时管理
- ✅ 跨平台（Windows / macOS / Linux / iOS / Android）

## 不适合的场景（诚实地说）

**这些场景请不要用：**
- ❌ 完全气隔（收件人从来不联网）——文件根本无法打开
- ❌ 防止截屏或拍照——浏览器 DRM 物理上做不到
- ❌ 抵御开发者工具——查看器必须在浏览器里解密才能渲染，理论上可被截取字节流
- ❌ 频繁更换文件内容——加锁后内容不可修改，纠错需重新打包

## 工作原理

**打包：**
- 你在 <code>drm.maipdf.com</code> 上传 PDF（≤ 65 MB）
- 服务端用 AES-256-GCM 加密 PDF、生成 license
- 你下载一个自包含的 <code>.html</code> 文件（外面套了薄 ZIP）
- 同时拿到 License ID + 26 位 Modification Code

**收件人打开：**
- 双击 HTML（若 OS 未自动解压，先解压外层 ZIP）
- 浏览器加载查看器
- 查看器一次性回调 <code>drm.maipdf.com</code> 校验 license
- 校验通过后，查看器解密并渲染 PDF
- 没有这次握手，文件保持密文状态

**反自动化：**
- 服务端返回 12 个候选密钥，11 个是随机诱饵
- HTML 内的查看器知道选哪个，自动化收割工具不知道

## 分步指南：打包加锁 HTML 文件

### 步骤 1：打开 drm.maipdf.com

![Secure Share 首页](/offlinepages/offline-MaiPDF-Home-Page.png)

直接访问 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>——无需注册、无需邮箱、无需账号。如果你想用 dashboard 集中管理多份 license，可以点右上角用 Google 登录；不登录也完全可以打包。

### 步骤 2：上传 PDF

![上传 PDF 区域](/offlinepages/upload_section_offline_maipdf.png)

**上传：**
1. 拖动 PDF 到上传区，或点击选择文件
2. 文件留在你浏览器里——点 Pack 之前不会上传

**文件要求：**
- PDF 格式
- ≤ 65 MB（Cloudflare Workers 平台 body 大小限制，不是产品任意上限）
- 文件完整（无损坏）

### 步骤 3：配置规则

![规则设置](/offlinepages/security_setting.png)

**打开次数上限：**
1. 设置整数上限（例如 5、10、20），或不限
2. 服务端原子校验——耗尽后所有副本同时停摆

**过期时间：**
1. 选择具体日期时间，或不设
2. 过期后自动停止解密

**显示文件名（可选）：**
- 覆盖收件人在查看器里看到的标题
- 原始文件名包含敏感信息时有用

**关于"防止下载/打印/复制"的真相：**
- 查看器禁用了右键、CSS 中和打印对话框、标签页失焦时遮蒙
- 这些是<strong>用户体验阻力，不是不可破的屏障</strong>
- 有耐心的读者用浏览器开发者工具可截获已解密的字节流
- 想要更强保护？目前任何浏览器内 DRM 都做不到

### 步骤 4：点 Pack & Download

![下载结果](/offlinepages/result_download_zip_file.png)

**生成：**
1. 服务端完成 AES-256-GCM 加密 + 生成 license
2. 你下载一个自包含的 HTML 文件（外层有薄 ZIP 包装，文件名如 <code>MaiPDF-SecureShare-yourdocument-locked.html</code>）

**关键：保存两组码**
- **License ID**：受保护文件的公开标识
- **Modification Code**：26 位机密。<strong>离开页面前必须存入密码管理器</strong>——除非你登录了 Google，否则这是唯一管理 license 的凭据

### 步骤 5：分发文件

**像分发任何文件那样发出去：**

| 渠道 | 说明 |
|---|---|
| 邮件附件 | 加锁 HTML 文件直接发，无需密码 |
| 内部共享/网盘 | 上传后给链接 |
| U 盘 | 物理交付 |
| 产品包装 | 配合产品手册附赠 |

收件人无需任何码也能打开——所有访问规则在文件本身里。

### 步骤 6：收件人打开

![打开加锁 HTML](/offlinepages/click_html_inside_zip_to_view.png)

**打开流程：**
1. 收件人解压外层 ZIP（如果 OS 未自动解压）
2. 双击 HTML
3. 浏览器加载查看器
4. 点击"Open · Unlock"
5. 查看器一次性回调 <code>drm.maipdf.com</code> 校验 license
6. 校验通过——PDF 在页面里渲染

**收件人侧的要求：**
- 现代浏览器（Chrome / Edge / Safari / Firefox）
- 启用 JavaScript
- <strong>打开时有网络连接</strong>——没有这次握手，加密 PDF 保持密文状态

## 加锁 HTML vs 在线分享

### 加锁 HTML 的优势（Secure Share）

**文件就在收件人手里：**
- ✅ 可放 U 盘、内网共享、邮件附件
- ✅ 不依赖某个 URL 在线
- ⚠️ 但打开时仍需联网做 license 校验，不是气隔工具

**事后控制：**
- ✅ 撤销、暂停、延期、加次数都可
- ✅ 撤销后下次打开即被拒
- ❌ 不能替换底层 PDF 内容——纠错要重新打包

**反爬阻力：**
- ✅ 反自动化诱饵密钥（12 选 1）
- ✅ 可选每页水印（提供取证线索）

### 在线分享的优势（Online Share）

**实时与分析：**
- ✅ 每次打开记录 IP、地区、设备、时间
- ✅ 可随时替换底层 PDF 而短链不变
- ✅ 撤销后下次刷新即被拒

**便捷：**
- ✅ 一次发链，多端可读
- ✅ 二维码生成
- ❌ 需要全程联网阅读

## 离线分享最佳实践

### 1. 设置适当的限制

**对于机密文档：**
- 1-3次总查看
- 短期过期（7天）
- 启用所有限制

**对于商业文档：**
- 3-5次总查看
- 中等过期（14-30天）
- 基本限制

**对于培训材料：**
- 5-10次总查看
- 长期过期（30-90天）
- 基本限制

### 2. 分发前测试

**始终测试：**
1. 生成测试包
2. 本地解压和打开
3. 验证限制是否有效
4. 测试查看限制
5. 检查过期
6. 验证离线功能

### 3. 提供清晰的说明

**包括：**
- 如何解压ZIP
- 如何打开HTML文件
- 浏览器要求
- 故障排除提示
- 支持联系方式

### 4. 安全分发

**分发安全：**
- 使用安全传输方法
- 使用安全传输方法
- 验证收件人
- 监控分发
- 如泄露则撤销

## 常见使用场景

### 场景1：教育材料

**情况：**
- 分发课程材料
- 离线课堂阅读
- 课后过期

**设置：**
- 5-10次查看限制
- 1天过期
- 启用所有限制

### 场景2：产品手册

**情况：**
- 与产品一起包含
- 离线客户访问
- 防止PDF提取

**设置：**
- 无限查看
- 长期过期
- 下载防护

### 场景3：书籍预览

**情况：**
- 样章
- 有限访问
- 鼓励购买

**设置：**
- 2-3 次打开上限
- 短期过期（如 3-7 天）
- 可选水印

### 场景4：机密报告审阅

**情况：**
- 机密文档
- 审阅完成即停摆
- 可远程撤销

**设置：**
- 1 次打开上限
- 短期过期（如审阅窗口期）
- 每页水印（取证用）

⚠️ <strong>仍要诚实承认：</strong>截屏、翻拍、devtools 提取这些都防不住。涉密内容应结合法律协议、限制收件人数量等额外手段。

## 限制和诚实声明

### 文件大小

- 单文件 ≤ <strong>65 MB</strong>（Cloudflare Workers 平台 body 大小限制）
- 更大的文件需要压缩图片、降采样扫描件或拆分章节分别打包

### 浏览器兼容性

- 任意现代浏览器（Chrome / Edge / Safari / Firefox）
- 需要启用 JavaScript
- Windows / macOS / Linux / iOS / Android

### 价格

- MaiPDF Secure Share 目前完全免费，运行在 Cloudflare Pages 与 D1 的免费档上
- 如使用量超过免费档，未来可能加 IP 限流或付费档；已有 license 会继续工作

### 安全的诚实边界

❌ <strong>不防：</strong>
- 截屏与屏幕录像（浏览器层面物理上做不到）
- 手机翻拍屏幕
- 开发者工具截获已解密的字节流
- 完全无网络的环境（license 校验需要联网）

✅ <strong>能做：</strong>
- 阻断右键、CSS 中和打印、失焦遮蒙（UX 阻力）
- 服务端原子校验打开次数与过期
- 反自动化诱饵密钥（12 选 1）
- 事后撤销、暂停、延期
- 可选每页水印（取证线索）

## 故障排除

### 问题：文件打不开

**可能原因：**
- 收件人完全没有网络（最常见！license 校验失败）
- 浏览器禁用了 JavaScript
- 收件人没解压外层 ZIP，直接在压缩包里打开
- License 已被撤销/过期/打开次数耗尽

**解决方案：**
- 确认收件人能访问 <code>drm.maipdf.com</code>
- 启用 JavaScript
- 解压外层 ZIP 找出真正的 HTML 再双击
- 在 <code>/manage</code> 检查 license 状态——可加次数或延期

### 问题：希望阻止截屏/复制

诚实回答：<strong>做不到</strong>。任何浏览器查看器都无法阻止屏幕被截图或被手机翻拍——这是物理限制，不是产品缺陷。如果你的内容真的不能被任何方式留存，<strong>它不应该被分享</strong>。

可缓解的措施：
- 设置较短过期、较少打开次数
- 每页水印做取证线索
- 限制收件人数量
- 配合法律协议或 NDA

## 结语

加锁 HTML 分享的正确心态是<strong>"可控分发"</strong>——文件已经离开你的电脑，但你仍然保有撤销、延期、暂停的权力。它不是离线神器，不是防截屏神器，也不是防开发者工具神器。<strong>用对工具，配合较短过期与水印，比寄望于"绝对防泄漏"现实得多。</strong>

**立即体验：** 打开 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>，拖入 PDF，点 <em>Pack & Download</em>。无需注册。

---

**相关文章：**
- [PDF 安全分享方案：一键生成自包含的加锁 HTML 文件](/blog/cn/pdf-offline-html-package)
- [Online Share vs Secure Share：选对 PDF 保护模型](/blog/cn/online-vs-offline-pdf-security)
- [MaiPDF Secure Share（加锁 HTML 包）：drm.maipdf.com 的 PDF 控权方案](/blog/cn/offline-pdf-drm-mode)

<style>
  /* Base styles */
  .intro-panel {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    margin: 2rem 0;
    font-size: 1.1rem;
    line-height: 1.6;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .intro-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .intro-panel p {
    position: relative;
    z-index: 1;
  }
</style>

