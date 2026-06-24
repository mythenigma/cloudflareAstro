---
title: "如何创建加锁 HTML PDF 文件：drm.maipdf.com 完整步骤指南"
description: "用 MaiPDF Secure Share（drm.maipdf.com）把 PDF 打包成自包含的加锁 HTML 文件。完整步骤：上传、配置、Pack & Download、分发——以及诚实的能力边界。"
pubDate: "Nov 28 2025"
updatedDate: "May 13 2026"
heroImage: "/offlinepages/upload_section_offline_maipdf.png"
tags: ["Secure Share", "drm.maipdf.com", "加锁HTML", "PDF分发", "MaiPDF"]
---

# 如何创建加锁 HTML PDF 文件：drm.maipdf.com 完整步骤指南

<div class="intro-panel">
  <p>需要把 PDF<strong>直接交到收件人手里</strong>但又想保有事后控制权？本文只讲 <strong>pack.html 网页打包</strong>（PDF → 加密 → webpack HTML → ZIP，浏览器打开）。<strong>不是</strong> 桌面 App 的 <code>.maipdf</code> 打包。要 <strong>PDF 防止截屏</strong> → <a href="/blog/cn/prevent-screenshot-pdf-drm-native-app">桌面 App 专文</a>。</p>
  <p>工具地址：<a href="https://drm.maipdf.com/pack.html">drm.maipdf.com/pack.html</a>。每次打开需联网做 license 校验。</p>
</div>

![上传区](/offlinepages/upload_section_offline_maipdf.png)

## 为什么用加锁 HTML 而不是直接发 PDF？

**适合的使用场景：**
- ✅ 文件需跟着收件人走（U 盘、邮件附件、内网共享）
- ✅ 希望<strong>交付后仍能撤销 / 暂停 / 延期</strong>
- ✅ 收件人在打开时能联网（不需要持续在线，但打开那一刻必须有网）
- ✅ 培训材料、机密报告审阅、付费样章、客户资料包

**好处：**
- 一份自包含文件，任意现代浏览器直开
- AES-256-GCM 加密，PDF 本体不在服务器持久化
- 服务端原子校验打开次数与过期
- 可选每页水印
- 反自动化诱饵密钥（12 选 1）

## 什么是加锁 HTML 文件？

**定义：**
加锁 HTML 文件是 Secure Share 的产出物——一个自包含的 <code>.html</code>，里面塞了加密后的 PDF + 浏览器内查看器 + license 校验逻辑。它的特点：
- 在任意现代浏览器打开（Chrome / Edge / Safari / Firefox）
- 每次"Open · Unlock"都会回调 <code>drm.maipdf.com</code> 做服务端 license 校验
- 校验通过才解密渲染 PDF
- 副本无限——服务端只认 license

**核心能力：**
- ✅ 打开次数上限 + 过期时间（服务端原子校验）
- ✅ 可选每页水印
- ✅ 事后撤销 / 暂停 / 延期 / 加次数
- ✅ 浏览器内查看器（页面导航、缩放、全屏）
- ✅ 反自动化诱饵密钥
- ✅ 跨平台

**不要误以为它有的能力（诚实声明）：**
- ❌ <strong>完全离线工作</strong>——打开时必须联网做 license 校验
- ❌ 防止截屏 / 屏幕录像 / 翻拍
- ❌ 阻止开发者工具截取已解密的 PDF 字节流
- ❌ 逐次访客 IP / 地区 / 设备日志（这是 Online Share 的能力）

## 分步指南：打包加锁 HTML 文件

### 步骤 1：打开 drm.maipdf.com

![Secure Share 首页](/offlinepages/offline-MaiPDF-Home-Page.png)

**开始使用：**
1. 直接访问 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>
2. 看到上传区即可——无需注册、无需邮箱
3. 如果你想用 dashboard 集中管理多份 license，可以点右上角用 Google 登录；不登录也完全可以

**站点情况：**
- 当前完全免费
- 运行在 Cloudflare Pages + D1 免费档
- 无需注册账户即可使用
- 支持 5 种语言界面（en / zh / ja / de / fr）

### 步骤 2：上传 PDF

![Secure Share 上传区](/offlinepages/upload_section_offline_maipdf.png)

**上传流程：**

1. <strong>选择 PDF 文件</strong>
   - 拖拽到上传区，或点击选择
   - 文件留在浏览器里——点 Pack 之前不会上传
   - 单文件 ≤ <strong>65 MB</strong>（Cloudflare Workers 平台 body 大小限制，不是产品任意上限）

2. <strong>触发打包</strong>
   - 点 "Pack & Download"
   - 文件上传到服务端做 AES-256-GCM 加密
   - 服务端生成 license

**上传建议：**
- ✅ 确保是有效的 PDF 文件
- ✅ 文件 ≤ 65 MB（超出请压缩图片、降采样扫描件或拆分章节）
- ✅ 稳定的网络连接

**发生了什么：**
- 服务端用 AES-256-GCM 加密 PDF
- 生成 license 行（含一半的密钥）
- 把加密后的 PDF + 查看器 + 客户端逻辑塞进一个 HTML 文件
- 准备下载

### 步骤 3：配置规则

![规则设置](/offlinepages/security_setting.png)

**只有三个设置项（这是全部）：**

<strong>1. 打开次数上限</strong>
- 任意正整数（功能上不设硬上限——文档说"functionally unlimited"）
- 或不设上限
- 服务端原子校验：耗尽后所有副本同时停摆

<strong>2. 过期时间戳</strong>
- 日历选择具体日期时间
- 或不设过期
- 服务端原子校验：过期后所有副本同时停摆

<strong>3. 显示文件名（可选）</strong>
- 覆盖收件人在查看器里看到的标题
- 原始文件名包含敏感信息时有用

**关于"防下载 / 防打印 / 防复制"的真相：**
- 查看器禁用了右键、CSS 中和打印对话框、标签页失焦时遮蒙——但这些是<strong>用户体验阻力，不是不可破的屏障</strong>
- 有耐心的读者用浏览器开发者工具可截获已解密的字节流
- 截屏、屏幕录像、手机翻拍——浏览器层面物理上做不到防
- 想要更强保护？任何浏览器内 DRM 都做不到——这不是 Secure Share 的缺陷，而是物理限制

### 步骤 4：Pack & Download

![下载结果](/offlinepages/result_download_zip_file.png)

**打包流程：**

1. <strong>点击 Pack & Download</strong>
   - 服务端完成 AES-256-GCM 加密
   - 生成 license 行
   - 把所有东西塞进一个 HTML 文件

2. <strong>下载产物</strong>
   - 一个自包含的 <code>.html</code> 文件（外面有薄 ZIP 包装）
   - 文件名如 <code>MaiPDF-SecureShare-yourdocument-locked.html</code>
   - 不是"index.html + assets/ 资源包"——是单文件

3. <strong>关键：保存两组码</strong>
   - <strong>License ID</strong>：受保护文件的公开标识
   - <strong>Modification Code</strong>：26 位机密。<strong>离开页面前必须存入密码管理器</strong>——除非用 Google 登录打包，否则这是唯一管理 license 的凭据

**产物结构（实际样貌）：**

```
MaiPDF-SecureShare-yourdocument-locked.zip
└── MaiPDF-SecureShare-yourdocument-locked.html
    └── （HTML 内含加密 PDF + 查看器 + 校验逻辑）
```

没有 <code>assets/</code> 子目录、没有外置 JS / CSS——单文件即全部。

### 步骤 5：分发文件

**像分发任何普通文件那样：**

- 邮件附件（HTML 直接发，不需要解锁码）
- 内部共享 / 企业网盘
- U 盘物理交付
- 配合产品手册随产品交付

**收件人侧无需任何码即可打开**——所有访问规则在文件本身里。

**最佳实践：**
- ✅ 提前自己测试一次完整打开流程
- ✅ 给收件人说明：解压外层 ZIP、双击 HTML、需要联网
- ✅ 把 License ID + Modification Code 存到管理位置
- ✅ 敏感内容一人一份（便于追溯泄漏来源）

### 步骤 6：收件人打开

![打开加锁 HTML](/offlinepages/click_html_inside_zip_to_view.png)

**收件人侧的完整流程：**

1. <strong>解压外层 ZIP</strong>
   - 如果 OS 没自动解压，先解压拿到真正的 HTML 文件
   - 不要尝试直接在压缩包里打开（很多用户在此卡住）

2. <strong>双击 HTML</strong>
   - 在默认浏览器中加载
   - 看到 "Open · Unlock" 按钮的"受保护"页面

3. <strong>点击 Open · Unlock</strong>
   - 查看器一次性回调 <code>drm.maipdf.com</code>
   - 服务端原子校验 license（剩余次数、过期、撤销状态）
   - 通过则返回密钥的另一半

4. <strong>解密渲染 PDF</strong>
   - 查看器在浏览器内合成密钥并解密
   - PDF 在页面里渲染
   - 有页面导航、缩放、全屏等基本控件
   - 右上角显示"X 次剩余"

**收件人侧的硬要求：**
- 现代浏览器（Chrome / Edge / Safari / Firefox）
- 启用 JavaScript
- <strong>打开那一刻必须能联网</strong>——访问 <code>drm.maipdf.com</code>

**关于"次数何时被消耗"：**
- 每次成功的"Open · Unlock"消耗 1 次
- 标签页保持打开不消耗
- 关闭再打开消耗 1 次（提醒读者别频繁关闭重开）

## Secure Share 能力清单

### 提供的能力

- ✅ 打开次数上限（服务端原子校验）
- ✅ 过期时间（服务端原子校验）
- ✅ 可选每页水印
- ✅ 反自动化诱饵密钥（12 选 1）
- ✅ 事后撤销 / 暂停 / 延期 / 加次数
- ✅ 浏览器内查看器（基本导航控件）
- ✅ 查看器阻力（右键阻断、打印 CSS 中和、失焦遮蒙）

### 不提供的能力

- ❌ 完全离线工作（必须联网做 license 校验）
- ❌ 防止截屏 / 屏幕录像 / 拍照
- ❌ 防止开发者工具截取已解密的字节流
- ❌ 逐次访客的 IP / 地区 / 设备日志（这是 Online Share 的能力）
- ❌ SSO / SAML / 企业目录集成
- ❌ 浏览器指纹绑定（产品里没有这个机制）

## 技术细节

### 真实工作原理

<strong>AES-256-GCM 分片密钥模型：</strong>
- PDF 用 AES-256-GCM 加密
- 服务端只存 license 行 + 加密密钥的一半
- 另一半随加锁 HTML 一起分发
- 单边任一份都不能解密

<strong>服务端原子校验：</strong>
- 每次"Open · Unlock"都回调服务端
- 原子检查并递减打开次数
- 原子验证未过期、未撤销
- 通过则返回密钥另一半

<strong>反自动化诱饵：</strong>
- 服务端返回 12 个候选密钥
- 其中 11 个是随机诱饵
- 只有 1 个能合成正确解密密钥
- HTML 内的查看器知道选哪个，自动化爬虫不知道

<strong>没有"本地缓存验证状态"：</strong>
- 不存"已验证"标记到 localStorage
- 不绕过下次校验
- 每次打开都重新走完整流程
- 这才是撤销能立即生效的原因

## 最佳实践

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

### 3. 提供说明

**包括：**
- 如何解压ZIP
- 如何打开HTML文件
- 浏览器要求
- 故障排除提示
- 支持联系方式

### 4. 安全分发

**分发安全：**
- 使用安全传输方法
- 传输时加密
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

### 场景 3：书籍样章

**情况：**
- 付费样章
- 鼓励购买正版

**设置：**
- 2-3 次打开上限
- 3-7 天过期
- 可选水印

### 场景 4：机密报告审阅

**情况：**
- 短窗口审阅
- 事后立即停止访问

**设置：**
- 1 次打开上限
- 短期过期（如审阅窗口期）
- 每页水印开启
- 审阅完成在 <code>/manage</code> 立即撤销

⚠️ <strong>诚实补充：</strong>这种"自毁"是策略层面的——靠服务端 license 撤销，不是文件物理销毁。截屏 / 翻拍 / devtools 提取都防不住。

## 限制与诚实声明

### 文件大小

- 单文件 ≤ <strong>65 MB</strong>（Cloudflare Workers 平台 body 大小限制）
- 更大的文件需要压缩图片、降采样扫描件或拆分章节分别打包

### 浏览器兼容

- 任意现代浏览器（Chrome / Edge / Safari / Firefox）
- 需要启用 JavaScript
- Windows / macOS / Linux / iOS / Android

### 价格

- 当前完全免费，运行在 Cloudflare Pages + D1 免费档
- 未来可能加 IP 限流或付费档；已有 license 会继续工作

### 安全的诚实边界

<strong>能做：</strong>
- 服务端原子校验打开次数与过期
- 反自动化诱饵密钥（12 选 1）
- 事后撤销 / 暂停 / 延期
- 可选每页水印（取证线索）

<strong>不能做：</strong>
- 阻止截屏 / 屏幕录像 / 翻拍
- 阻止开发者工具截取已解密的字节流
- 真正的离线打开（必须联网做 license 校验）

## 故障排除

### 问题：HTML 打不开

**最常见原因：**
- 收件人没有网络访问（最常见）—— license 校验失败
- 浏览器禁用了 JavaScript
- 收件人没解压外层 ZIP，直接在压缩包里打开
- License 被撤销 / 已过期 / 打开次数耗尽

**解决方案：**
- 确认收件人能访问 <code>drm.maipdf.com</code>
- 启用 JavaScript
- 让收件人先解压外层 ZIP，找出 HTML 再双击
- 在 <code>/manage</code> 检查 license 状态——可加次数 / 延期 / 恢复

### 问题：希望防止截屏 / 复制

诚实回答：<strong>做不到</strong>。任何浏览器查看器都无法阻止屏幕被截图或翻拍——这是物理限制。

可缓解的措施：
- 较短过期、较少打开次数
- 每页水印做取证线索
- 限制收件人数量、一人一份
- 配合 NDA / 法律协议

## 结语

加锁 HTML 文件的正确心态是<strong>"可控分发"</strong>——文件离开你的电脑，但你仍保有撤销、延期、暂停的权力。它<strong>不是离线神器</strong>，<strong>不是防截屏神器</strong>。诚实的产品定位让你能挑对工具——并对它的边界保持清醒。

**立即体验：** 打开 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>，拖入 PDF，点 <em>Pack & Download</em>。无需注册。

---

**相关文章：**
- [加锁 HTML PDF 分享完整指南](/blog/cn/offline-pdf-sharing-complete-guide)
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

