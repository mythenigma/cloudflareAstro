---
title: "Secure Share 工作流程：drm.maipdf.com 怎么做 PDF 控权"
description: "通过流程图理解 MaiPDF Secure Share：上传 → AES-256-GCM 加密 → 生成加锁 HTML → 收件人打开时联网校验 license → 解密渲染。适合需要发出去文件却仍要保有控制权的场景。"
pubDate: "Jan 15 2026"
updatedDate: "May 13 2026"
tags: ["Secure Share", "drm.maipdf.com", "PDF安全", "加锁HTML"]
---

# Secure Share 工作流程：drm.maipdf.com 怎么做 PDF 控权

<div class="intro-panel">
  <p>很多团队有共同的需求：文件要交付给收件人（邮件、U 盘、内网共享），同时希望"<strong>交付后仍能撤销 / 延期 / 暂停</strong>"。MaiPDF Secure Share（<a href="https://drm.maipdf.com/">drm.maipdf.com</a>）的解决思路是：在服务端把 PDF 加密成 license-绑定的加锁 HTML 文件，每次打开都做一次性服务端 license 校验。<strong>注意：</strong>这不是"完全离线"——打开时需要联网。</p>
</div>

![Secure Share 工作流程](/diagram/zh-cn/offline-drm-flow.svg)

## 一句话理解 Secure Share

Secure Share 不是"把 PDF 发出去就不管了"，也不是"完全离线"。它是：把 PDF 用 <strong>AES-256-GCM 加密</strong>成自包含的 HTML 文件，每次打开都要回调服务端做<strong>一次性 license 校验</strong>，通过才解密。这样你把文件发给谁都没关系——服务端的 license 一改，所有副本同时停摆。

## 流程拆解

<div class="feature-grid">
  <div class="feature-item">
    <h4>🔐 1) 服务端加密打包</h4>
    <p>原始 PDF 上传后被 AES-256-GCM 加密，与查看器一起塞进一个 HTML 文件。服务端只存 license 行 + 一半的加密密钥；另一半随 HTML 分发。<strong>PDF 本体不在服务器持久化。</strong></p>
  </div>
  <div class="feature-item">
    <h4>📋 2) 规则写入 license</h4>
    <p>打开次数上限、过期时间、可选水印，都被写入服务端 license 记录。<strong>不</strong>固化到包里——靠服务端原子校验，所以撤销立即生效，不依赖本地状态。</p>
  </div>
  <div class="feature-item">
    <h4>🌐 3) 服务端原子校验</h4>
    <p>收件人每次"Open · Unlock"都会回调 <code>drm.maipdf.com</code>。服务端原子检查 license 状态、递减打开次数、确认未过期。通过才返回密钥另一半。</p>
  </div>
  <div class="feature-item">
    <h4>🤖 4) 反自动化诱饵</h4>
    <p>服务端返回 12 个候选密钥，11 个是随机诱饵。HTML 内的查看器知道选哪个，自动化爬虫不知道——拖慢批量收割。</p>
  </div>
</div>

## 加锁 HTML 到底是什么？

不是 ZIP + assets/ 资源目录，而是<strong>单个自包含的 HTML 文件</strong>（外面套层薄 ZIP 包装方便下载）：

```
MaiPDF-SecureShare-yourdocument-locked.zip
└── MaiPDF-SecureShare-yourdocument-locked.html
    └── 加密的 PDF（AES-256-GCM）
    └── 浏览器内查看器
    └── 客户端 license 校验逻辑
    └── 一半的加密密钥
```

没有外置 JS / CSS / 资源——所有东西都在一个 HTML 里。

## 什么时候选 Secure Share，而不是 Online Share？

<div class="feature-grid">
  <div class="feature-item">
    <h4>📁 更适合 Secure Share</h4>
    <ul>
      <li>文件要跟着收件人走（U 盘、附件、内网）</li>
      <li>对外交付要求"交付后仍可控"</li>
      <li>PDF 本体不能进公有云（合规要求）</li>
      <li>接受打开时收件人需要联网</li>
      <li>内容不会再频繁更新</li>
    </ul>
  </div>
  <div class="feature-item">
    <h4>🔗 更适合 <a href="https://maipdf.com/">Online Share</a></h4>
    <ul>
      <li>需要 IP / 地区 / 设备日志等详尽打开分析</li>
      <li>需要随时替换底层 PDF 而短链不变</li>
      <li>需要多端通过链接 / 二维码即时访问</li>
      <li>收件人能稳定访问网络</li>
    </ul>
  </div>
</div>

## 不适合 Secure Share 的场景

- ❌ 收件人完全断网（没法做 license 校验）
- ❌ 想阻止截屏 / 屏幕录像 / 拍照（物理上做不到）
- ❌ 想防开发者工具截取已解密的字节流（查看器必须在浏览器里解密才能渲染）
- ❌ 需要 SSO / SAML / 企业目录集成
- ❌ 单文件超过 65 MB（Cloudflare Workers 平台 body 大小限制）

## 实用建议

<div class="feature-grid">
  <div class="feature-item">
    <h4>从最严的规则开始</h4>
    <p>默认设较短过期、较少打开次数。需要放宽时随时从 <code>/manage</code> 加次数 / 延期，比"先放宽后收紧"安全。</p>
  </div>
  <div class="feature-item">
    <h4>打包后自测一次</h4>
    <p>在你自己的浏览器双击 HTML 跑一遍"Open · Unlock"，确认端到端打通。再发给收件人。</p>
  </div>
  <div class="feature-item">
    <h4>保管好凭据</h4>
    <p>匿名打包：License ID + 26 位 Modification Code 必须存到密码管理器——丢了无法管理。或用 Google 登录，dashboard 会替你记住。</p>
  </div>
  <div class="feature-item">
    <h4>一人一份（敏感内容）</h4>
    <p>需要追溯泄漏来源时，每个收件人对应单独的 license，配合每页水印取证线索。</p>
  </div>
</div>

<div class="intro-panel">
  <p><strong>立即体验：</strong>打开 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>，拖入 PDF，点 <em>Pack & Download</em>。无需注册。</p>
</div>
