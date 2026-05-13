---
title: "团队用 Secure Share 分发受控 PDF：drm.maipdf.com 的实务做法"
description: "团队怎么用 MaiPDF Secure Share（drm.maipdf.com）做受控的 PDF 分发：加锁 HTML 文件 + 服务端 license 校验 + License ID/Modification Code 管理。诚实的能力与限制。"
pubDate: "Nov 28 2025"
updatedDate: "May 12 2026"
heroImage: "/offlinepages/offline-MaiPDF-Home-Page.png"
tags: ["Secure Share", "drm.maipdf.com", "PDF分发", "MaiPDF", "团队协作"]
---

# 团队用 Secure Share 分发受控 PDF：drm.maipdf.com 的实务做法

<div class="intro-panel">
  <p>团队需要把 PDF 文件交给收件人但又想<strong>保留事后控制权</strong>——撤销、延期、加次数。MaiPDF Secure Share（<a href="https://drm.maipdf.com/">drm.maipdf.com</a>）的解决思路是：服务端把 PDF 用 AES-256-GCM 加密、生成 license，回返一个自包含的加锁 HTML 文件。收件人每次打开都需联网做一次性 license 校验——通过则解密渲染，失败则保持密文。<strong>这不是企业级 DRM 套件，也不是离线方案</strong>，而是一个免费、轻量、对小团队足够实用的工具。</p>
</div>

![Secure Share 首页](/offlinepages/offline-MaiPDF-Home-Page.png)

## 适用范围（先讲清楚）

Secure Share 适合的团队场景：
- 想把文件直接发给收件人（U 盘 / 内网共享 / 邮件附件）
- 收件人在打开时能联网（不需要持续在线，但至少要打开那一刻有网）
- 接受"开发者工具理论上能截取已解密的 PDF 字节流"这种诚实边界
- 不需要严格的 SSO / 目录服务集成（产品支持 Google OAuth 个人登录，但没有企业目录对接）

**不适合的场景：**
- 真正的气隔环境——文件根本无法打开
- 防止截屏 / 翻拍——浏览器层面物理上做不到
- 需要 SSO / SAML / 企业 IDP 集成——目前不支持
- 单文件 > 65 MB——Cloudflare Workers 平台 body 大小限制

## 工作流模型

<div class="feature-section">
  <div class="feature-content">
    <h3>1) 加密打包</h3>
    <p>管理员在 <code>drm.maipdf.com</code> 上传 PDF，配置打开次数与过期，服务端用 AES-256-GCM 加密、生成 license，回返一个自包含的加锁 HTML 文件。</p>
    <ul>
      <li><strong>AES-256-GCM 分片密钥</strong>：服务端只存 license 行与一半的密钥</li>
      <li><strong>反自动化诱饵</strong>：12 选 1 候选密钥拖慢爬虫</li>
      <li><strong>可选每页水印</strong>：取证用</li>
    </ul>
  </div>
  <div class="feature-content">
    <h3>2) 服务端 license 校验</h3>
    <p>收件人每次"Open · Unlock"都会回调服务端，原子校验打开次数、确认未过期。</p>
    <ul>
      <li><strong>服务端原子</strong>：副本再多也只认一个 license</li>
      <li><strong>每次都校验</strong>：没有本地缓存绕过</li>
      <li><strong>必须联网</strong>：没有网络等于不能打开</li>
    </ul>
  </div>
</div>

## 技术架构（实际样貌）

```
┌─────────────────────────────────────────┐
│         打包阶段（管理员操作）            │
│  ┌───────────────────────────────────┐  │
│  │  上传 PDF（≤ 65 MB）              │  │
│  │  设置打开次数 + 过期               │  │
│  │  服务端 AES-256-GCM 加密            │  │
│  │  返回 1 个自包含 HTML 文件         │  │
│  │  + License ID + Modification Code  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         分发阶段（按你平时方式）          │
│  ┌───────────────────────────────────┐  │
│  │  邮件附件 / 网盘 / U 盘 / 内网      │  │
│  │  收件人无需账号、无需任何码         │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         打开阶段（收件人侧，需联网）       │
│  ┌───────────────────────────────────┐  │
│  │  双击 HTML                         │  │
│  │  点 "Open · Unlock"                │  │
│  │  查看器回调 drm.maipdf.com         │  │
│  │  服务端原子校验 license            │  │
│  │  校验通过 → 解密渲染 PDF           │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 安全框架（实际机制）

### 服务端 license 校验

**每次打开的流程：**
1. 收件人点击"Open · Unlock"
2. 查看器一次性回调 <code>drm.maipdf.com</code>
3. 服务端原子校验 license：剩余次数、过期状态、是否被撤销
4. 通过则返回密钥的另一半 → 查看器解密 → 渲染 PDF

**这个模型的好处：**
- 防止未授权打开（撤销立即生效）
- 副本无限——next open 仍要重新校验
- 没有本地缓存可绕过
- 反自动化诱饵密钥（12 选 1）拖慢批量爬虫

### 服务端策略

**配置项（只有这三个）：**
- 打开次数上限（整数，可视为无上限）
- 过期时间戳
- 显示文件名（可选）

**收件人侧的查看器阻力（注意：不是硬屏障）：**
- 禁用右键
- CSS 中和打印对话框
- 标签页失焦时遮蒙
- 可选每页水印（取证用）

### 诚实的安全边界

<strong>能防：</strong>
- 撤销后的打开（next open 服务端拒绝）
- 副本泛滥（不影响 license 计数）
- 无网络环境（直接打不开——这是优点也是限制）

<strong>不能防：</strong>
- 截屏 / 屏幕录像
- 手机翻拍屏幕
- 开发者工具截取已解密的 PDF 字节流
- 完全气隔的收件人（license 校验需要联网）

## 团队部署

### 部署场景

**场景 1：内部审阅 / 培训**
- 文件通过邮件、内网共享分发
- 收件人在打开时能联网即可
- 适合敏感程度中等、需要事后撤销的材料

**场景 2：客户资料包 / 产品手册**
- 把文件附在产品交付物里
- 设置较长过期 + 限定打开次数
- 必要时事后撤销

**场景 3：付费样章 / 商业报告**
- 短期开放、低次数限制
- 配合每页水印做取证线索

**不适合的场景：**
- ❌ 完全气隔的安全设施（不能联网，打不开）
- ❌ 防止内部员工拍照 / 截屏外流（物理上做不到）
- ❌ 要求 SSO / SAML / 企业目录绑定（产品仅支持 Google OAuth 个人登录）

### 实施考虑

**收件人侧的要求：**
- 现代 Web 浏览器（Chrome / Edge / Safari / Firefox）
- 启用 JavaScript
- <strong>打开时有网络连接</strong>（必须能访问 <code>drm.maipdf.com</code>）

**管理员侧的工具：**
- 匿名打包：保存 License ID + 26 位 Modification Code，在 <code>/manage</code> 管理
- 登录态打包：Google OAuth + dashboard，所有 license 一键管理

**没有的功能（避免误以为有）：**
- ❌ SSO / SAML 集成
- ❌ 目录服务 / LDAP 对接
- ❌ 集中化合规报告平台
- ❌ 付费企业版客户经理

如果团队需要这些能力，<strong>Secure Share 不是合适的工具</strong>，应该选择面向企业的商业 DRM 产品。

## 使用场景

### 场景 1：远程培训材料

**要求：**
- 远程学员的浏览器访问（能联网）
- 限定打开次数
- 培训期后过期
- 简单的活跃 license 管理

**实施：**
- 每份 5-10 次打开上限
- 30 天过期
- 每页水印（可选）
- 在 dashboard 或 <code>/manage</code> 跟进活跃状态

### 场景 2：机密文档审阅

**要求：**
- 受控的文档访问
- 短打开窗口
- 事后可撤销
- 取证线索

**实施：**
- 1-3 次打开上限
- 7 天过期
- 每页水印开启
- 一旦审阅完成立即在 <code>/manage</code> 撤销

### 场景 3：产品手册 / 客户资料包

**要求：**
- 长期可用
- 浏览器内查看
- 不允许任意复制 / 转发后仍然能打开

**实施：**
- 较长过期或不设过期
- 较高打开次数上限（或无上限）
- 每页水印（可选）
- 必要时事后撤销

## 最佳实践

### 配置建议

**敏感程度高的文档：**
- 1-2 次打开上限
- 24-48 小时过期
- 每页水印开启
- 配合 NDA / 法律协议（DRM 本身不能防截屏）

**标准商业文档：**
- 3-5 次打开上限
- 7-14 天过期
- 可选水印
- 一人一份（如需追溯泄漏来源）

**培训材料：**
- 5-10 次打开上限
- 30 天过期
- 课后通过 <code>/manage</code> 整体撤销

### 分发安全

**典型分发渠道：**
- 邮件附件（HTML 直接发，不需要解锁码）
- 内部共享 / 企业网盘
- U 盘（物理交付）
- 产品包装（随产品交付的资料）

**事后管理（核心能力）：**
- 撤销：在 <code>/manage</code> 设为 revoked，下次打开即被拒
- 暂停：暂时阻断访问，可恢复
- 延期：加打开次数 / 延长过期
- 删除：硬删除（30 天内可由 operator 恢复）

### 监控

**当前能看到的：**
- License 状态（active / paused / revoked / deleted）
- 剩余打开次数与过期时间
- 在登录态 dashboard 集中查看所有 license

**当前看不到的（诚实声明）：**
- 逐次访客的 IP、地区、设备日志（这是 Online Share 的能力）
- 哪个收件人在何时打开了哪个 license

## 技术规格

### 输出文件结构

实际打包产物是<strong>单个自包含的 HTML 文件</strong>，外面套一层薄 ZIP 包装：

```
MaiPDF-SecureShare-yourdocument-locked.zip
└── MaiPDF-SecureShare-yourdocument-locked.html
    └── （HTML 内含加密的 PDF + 查看器 + 客户端校验逻辑）
```

没有 <code>assets/</code> 子目录、没有外置 JS / CSS——单文件即全部。

### 每次打开的流程

1. <strong>双击 HTML</strong>：收件人在浏览器里打开
2. <strong>点击 Open · Unlock</strong>：查看器发起回调
3. <strong>服务端校验</strong>：原子检查打开次数、过期、撤销状态
4. <strong>返回密钥一半</strong>：与 HTML 里的另一半合成解密密钥
5. <strong>客户端解密渲染</strong>：PDF 显示在浏览器查看器内

<strong>关键：</strong>没有本地缓存"已验证状态"、没有"离线打开能力"。每次都重新走完整流程。

## 对比：Secure Share vs Online Share

| 维度 | Secure Share | Online Share |
|------|---------|---------|
| <strong>发出去的是什么</strong> | 一个加锁 HTML 文件 | 一个短链 / 二维码 |
| <strong>打开时网络</strong> | 一次性 license 校验 | 全程联网 |
| <strong>逐次访客遥测</strong> | 简略（剩余次数、过期） | 详尽（IP / 地区 / 设备 / 时间） |
| <strong>每页水印</strong> | 可选 | 可选 |
| <strong>事后撤销</strong> | ✅ 立即 | ✅ 立即 |
| <strong>事后换 PDF 内容</strong> | ❌ 需重新打包 | ✅ 同一链接换文件 |
| <strong>PDF 本体存储</strong> | 不在服务器持久化 | MaiPDF 云端托管 |
| <strong>典型场景</strong> | 文件需跟着收件人走 | 需详细打开分析 |

## 团队收益（诚实版）

**带来的：**
- 文件交付后仍能撤销 / 暂停 / 延期 / 加次数
- AES-256-GCM 加密，PDF 本体不在服务器持久化
- 反自动化诱饵密钥（12 选 1）增加爬虫成本
- 跨平台浏览器即可阅读，收件人无门槛
- 当前完全免费，运行在 Cloudflare Pages + D1 免费档

**不带来的（避免被销售话术误导）：**
- ❌ 完全离线工作的能力
- ❌ 防止截屏 / 翻拍 / 开发者工具提取
- ❌ SSO / SAML / 企业目录集成
- ❌ 客户经理 / 工单 SLA / 定制开发

如果你的预算和需求要求"企业级"的这些能力，请选择面向企业的商业 DRM 产品。如果你的诉求是"轻量、免费、对小团队足够实用、对发出去的文件保有控制权"，Secure Share 正好覆盖。

## 结论

Secure Share 不是企业级 DRM 套件——它是一个免费、轻量、开放给所有人的工具，把"加密 + license 校验 + 事后撤销"做对了。<strong>关键是认清它的边界，按场景选用。</strong>

**立即体验：** 打开 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>，拖入 PDF，点 <em>Pack & Download</em>。无需注册。

---

**相关资源：**
- [MaiPDF Secure Share（加锁 HTML 包）：drm.maipdf.com 的 PDF 控权方案](/blog/cn/offline-pdf-drm-mode)
- [加锁 HTML PDF 分享完整指南](/blog/cn/offline-pdf-sharing-complete-guide)
- [Online Share vs Secure Share：选对 PDF 保护模型](/blog/cn/online-vs-offline-pdf-security)

<style>
  .intro-panel {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2.5rem;
    border-radius: 1rem;
    margin: 2rem 0;
    font-size: 1.15rem;
    line-height: 1.7;
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
    margin: 0;
  }
  
  pre {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 1.5rem;
    overflow-x: auto;
    font-size: 0.9rem;
    line-height: 1.6;
    margin: 1.5rem 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  table th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem;
    text-align: left;
    font-weight: 600;
  }
  
  table td {
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
    background: white;
  }
  
  table tr:last-child td {
    border-bottom: none;
  }
  
  table tr:nth-child(even) td {
    background: #f8fafc;
  }
  
  h2 {
    color: #1e293b;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: 700;
    border-bottom: 3px solid #667eea;
    padding-bottom: 0.5rem;
  }
  
  h3 {
    color: #334155;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin: 0.75rem 0;
    line-height: 1.7;
  }
  
  strong {
    color: #667eea;
    font-weight: 600;
  }
</style>








