---
title: "MaiPDF Secure Share（加锁 HTML 包）：drm.maipdf.com 的 PDF 控权方案"
description: "MaiPDF Secure Share 把 PDF 打包成一个自包含的加锁 HTML 文件，使用 AES-256-GCM 加密、打开次数与过期时间由服务端原子校验、可选每页水印。打开时需联网做一次性 license 校验。不是真正的离线工具。"
pubDate: "Jan 17 2026"
updatedDate: "May 12 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["PDF安全", "Secure Share", "drm.maipdf.com", "加锁HTML", "MaiPDF"]
---

# MaiPDF Secure Share（加锁 HTML 包）：drm.maipdf.com 的 PDF 控权方案

<div class="intro-panel">
  <p>MaiPDF Secure Share 现已独立部署在 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>，专注做一件事：把 PDF 打包成一个<strong>自包含的加锁 HTML 文件</strong>。收件人双击 HTML，浏览器一次性向服务端验证 license，PDF 才在页面里渲染。打开次数、过期时间、每页水印都内置；任何时候都可以从 <code>/manage</code> 撤销或延期。本文按站点 <code>/help</code> 页面的口径，说清这套方案能做什么、不能做什么。</p>
</div>

## 1️⃣ 核心定义

<div class="feature-section">
  <div class="feature-content">
    <p><strong>自包含 HTML 输出：</strong>服务端把 PDF 用 AES-256-GCM 加密后，连同查看器一起塞进一个 HTML 文件中。收件人在任意现代浏览器双击就能打开——不装 App、不装插件、不需要账号。</p>
    <p><strong>服务端校验 license：</strong>每次"Open · Unlock"会一次性回调 <code>drm.maipdf.com</code> 验证 license 是否仍在有效期、剩余次数是否未耗尽。没有这次握手，文件就是一段密文。<strong>不存在纯本地解密的模式</strong>——这是诚实的限制。</p>
  </div>
  <div class="feature-image">
    <img src="/maipdf2026/offline/inststruct.png" alt="MaiPDF Secure Share 使用流程" class="medium">
  </div>
</div>

## 2️⃣ 主要能力清单

<div class="features-table">
  <table>
    <thead>
      <tr>
        <th>能力维度</th>
        <th>Secure Share 能力</th>
        <th>备注</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>阅读策略</td>
        <td>设置打开次数上限 + 过期时间戳</td>
        <td>服务端原子校验，次数耗尽后所有 HTML 副本同时停摆</td>
      </tr>
      <tr>
        <td>查看器阻力</td>
        <td>禁用右键、CSS 中和打印对话框、标签页失焦时遮蒙</td>
        <td>这些只是 UX 阻力，不是不可破的屏障——见下方"限制"</td>
      </tr>
      <tr>
        <td>加密方式</td>
        <td>AES-256-GCM；服务端只存 license 行 + 加密密钥的一半</td>
        <td>PDF 本体不在服务器持久化保存</td>
      </tr>
      <tr>
        <td>反自动化</td>
        <td>服务端返回 12 个候选密钥（11 个为随机诱饵）</td>
        <td>显著拖慢 AI / 批量爬虫的密钥收割</td>
      </tr>
      <tr>
        <td>水印</td>
        <td>可选的每页水印</td>
        <td>提供取证线索，不能阻止截屏或拍照</td>
      </tr>
      <tr>
        <td>跨平台</td>
        <td>任意现代浏览器（Chrome / Edge / Safari / Firefox）</td>
        <td>Windows / macOS / Linux / iOS / Android——打开时需联网</td>
      </tr>
      <tr>
        <td>免安装</td>
        <td>产出物是一个自包含的 <code>.html</code> 文件</td>
        <td>收件人无需账号、插件或 App</td>
      </tr>
    </tbody>
  </table>
</div>

## 3️⃣ 创建流程（在 drm.maipdf.com 首页打包）

<div class="steps-container">
  <div class="step-item">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>把 PDF 拖到首页</h3>
      <p>打开 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>，将 PDF（≤ 65 MB）拖到上传区。点 Pack 之前，文件只在你浏览器里。</p>
      <img src="/offlinepages/upload_section_offline_maipdf.png" alt="PDF 上传界面" class="small">
    </div>
  </div>
  <div class="step-item">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>配置规则</h3>
      <p>设置打开次数上限和过期时间戳。可选：覆盖显示文件名、开启每页水印。这就是全部打包时的设置项。</p>
      <img src="/offlinepages/security_setting.png" alt="规则设置" class="small">
    </div>
  </div>
  <div class="step-item">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>点击「🔐 Pack &amp; Download」</h3>
      <p>服务端完成 AES-256-GCM 加密、生成 license，回返一个自包含 HTML 文件（如 <code>MaiPDF-SecureShare-yourdocument-locked.html</code>）。</p>
      <img src="/offlinepages/result_download_zip_file.png" alt="生成的加锁 HTML" class="small">
    </div>
  </div>
  <div class="step-item">
    <div class="step-number">4</div>
    <div class="step-content">
      <h3>保存好两组码</h3>
      <p>打包成功后会出现：</p>
      <ul>
        <li><strong>License ID</strong>：受保护文件的公开标识；</li>
        <li><strong>Modification Code</strong>：26 位机密。<strong>离开页面前必须存入密码管理器</strong>——除非你用 Google 登录打包，否则这是唯一管理 license 的凭据。</li>
      </ul>
    </div>
  </div>
  <div class="step-item">
    <div class="step-number">5</div>
    <div class="step-content">
      <h3>发送加锁 HTML</h3>
      <p>邮件、IM、网盘、U 盘——按你平时分发文件的方式即可。收件人双击 HTML，点击「Open · Unlock」，服务端校验通过后查看器在页面里渲染 PDF。</p>
      <img src="/offlinepages/click_html_inside_zip_to_view.png" alt="打开加锁 HTML" class="small">
    </div>
  </div>
</div>

<div class="note-box">
  <p><strong>事后管理：</strong>把 License ID + Modification Code 粘贴到 <a href="https://drm.maipdf.com/manage">drm.maipdf.com/manage</a> 即可加次数、延期、暂停、恢复或删除——无需登录。如果打包时已用 Google 登录，<a href="https://drm.maipdf.com/dashboard">/dashboard</a> 里可以一键管理你所有的 license，不需要粘贴 Modification Code。</p>
</div>

## 4️⃣ 真实技术机制

<div class="tech-features">
  <div class="tech-item">
    <div class="tech-icon">🔐</div>
    <div class="tech-content">
      <h3>AES-256-GCM 分片密钥</h3>
      <p>PDF 用 AES-256-GCM 加密。服务端只保存 license 行 + 一半的密钥；另一半随加锁 HTML 一起分发。任一边单独都无法解密。</p>
    </div>
  </div>
  <div class="tech-item">
    <div class="tech-icon">🌐</div>
    <div class="tech-content">
      <h3>服务端原子校验</h3>
      <p>每次点击「Open · Unlock」都会回调服务端，原子地校验并递减打开次数、确认未过期。标签页保持打开不消耗次数；关闭再开会消耗。</p>
    </div>
  </div>
  <div class="tech-item">
    <div class="tech-icon">🤖</div>
    <div class="tech-content">
      <h3>反自动化诱饵</h3>
      <p>为拖慢 AI/批量爬虫，服务端返回 12 个候选密钥，其中 11 个是随机诱饵——HTML 里的查看器知道选哪个，自动化收割不知道。</p>
    </div>
  </div>
  <div class="tech-item">
    <div class="tech-icon">💧</div>
    <div class="tech-content">
      <h3>可选每页水印</h3>
      <p>查看器可在 PDF 上叠加每页水印。截屏外流时可作取证线索，但<strong>不能阻止</strong>截屏发生。</p>
    </div>
  </div>
</div>

## 5️⃣ 诚实的限制

<div class="limitations-table">
  <table>
    <thead>
      <tr>
        <th>项目</th>
        <th>说明</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>单文件上限</td>
        <td>每个 PDF 最多 65 MB。这是 Cloudflare Workers 平台 body 大小限制，不是产品任意设定。</td>
      </tr>
      <tr>
        <td>打开时必须联网</td>
        <td>查看器必须连接 <code>drm.maipdf.com</code> 完成 license 校验才能解密。<strong>不存在纯离线模式</strong>——气隔环境的读者无法打开。</td>
      </tr>
      <tr>
        <td>开发者工具可破解</td>
        <td>查看器必须在浏览器里解密 PDF 才能渲染，理论上有耐心的读者用开发者工具可以截获解密后的字节流。查看器的右键阻断、CSS 中和打印、失焦遮蒙都是<strong>用户体验阻力，不是不可破的屏障</strong>。</td>
      </tr>
      <tr>
        <td>截屏与拍照</td>
        <td>屏幕上的像素一旦显示就脱离系统控制。水印能提供取证线索，但没有任何浏览器 DRM 能阻止手机对着屏幕拍照。</td>
      </tr>
      <tr>
        <td>价格</td>
        <td>MaiPDF Secure Share 目前完全免费，运行在 Cloudflare Pages 与 D1 的免费档上。若使用量超出免费档，未来可能加 IP 限流或付费档；<strong>已经打包的 license 会继续工作</strong>。</td>
      </tr>
    </tbody>
  </table>
</div>

## 6️⃣ 典型使用场景

<div class="use-cases-grid">
  <div class="use-case-card">
    <div class="use-case-icon">📚</div>
    <h3>教材/讲义</h3>
    <p>在无网教室发给学员本地阅读，课后到期失效。</p>
  </div>
  <div class="use-case-card">
    <div class="use-case-icon">📋</div>
    <h3>电子说明书</h3>
    <p>随产品附赠离线HTML，客户可离线查看但不能转存源PDF。</p>
  </div>
  <div class="use-case-card">
    <div class="use-case-icon">📖</div>
    <h3>图书样章试读</h3>
    <p>设置阅读2次、20分钟，鼓励购买正式版。</p>
  </div>
  <div class="use-case-card">
    <div class="use-case-icon">🔒</div>
    <h3>安全审阅</h3>
    <p>涉密报告在隔离网络环境中审阅，阅读完成即销毁。</p>
  </div>
</div>

## 结语

<div class="conclusion-panel">
  <p>MaiPDF Secure Share 把 PDF 打包成一个有服务端 license 校验、AES-256-GCM 加密、可选水印的自包含 HTML 文件。它的正确定位是<strong>"可控分发"</strong>：文件已经到对方手里，但你仍保留撤销、延期、暂停的权力。它不是对截屏、拍照或开发者工具提取的灵丹妙药——产品自己 <code>/help</code> 页面就这么说，本文也这么说。</p>
  <p style="margin-top: 0.75rem"><strong>立即体验：</strong>打开 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>，拖入 PDF，点 <em>Pack &amp; Download</em>。无需注册。</p>
</div>

---

## 您可能还喜欢：

- [MaiPDF动态水印功能：精准追踪阅读行为](../../cn/dynamic-watermarks-on-pdf-cn/)
- [设置PDF访问次数限制：有效控制文档传播](../../cn/setting-view-limits-cn/)
- [电子邮箱验证：增强PDF文档访问安全性](../../cn/email-verification-cn/)

<style>
  /* 基础样式 */
  .intro-panel {
    background: linear-gradient(to right, #f8fafc, #e2e8f0);
    border-left: 4px solid #3b82f6;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  /* 功能区域布局 */
  .feature-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
    margin: 2rem 0;
  }
  
  .feature-content {
    font-size: 1.05rem;
    line-height: 1.6;
  }
  
  .feature-image img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    float: none;
    margin: 0;
  }
  
  /* 表格样式 */
  .features-table, .limitations-table {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
  }
  
  .features-table th, .limitations-table th {
    background-color: #f1f5f9;
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    border: 1px solid #e2e8f0;
  }
  
  .features-table td, .limitations-table td {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    vertical-align: top;
  }
  
  .features-table tr:nth-child(even), .limitations-table tr:nth-child(even) {
    background-color: #f8fafc;
  }
  
  /* 步骤容器 */
  .steps-container {
    margin: 2rem 0;
  }
  
  .step-item {
    display: flex;
    margin-bottom: 2rem;
    align-items: flex-start;
  }
  
  .step-number {
    background: #3b82f6;
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 1.5rem;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: #3b82f6;
  }
  
  .step-content p {
    margin: 0;
    margin-bottom: 0.75rem;
    font-size: 1.05rem;
    line-height: 1.5;
  }
  
  .step-content ul {
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
  }
  
  .step-content img {
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    display: block;
    float: none;
    margin: 0.75rem 0;
    max-width: 100%;
  }
  
  /* 提示框 */
  .note-box {
    background: #f1f5f9;
    border-left: 4px solid #64748b;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    font-size: 1rem;
  }
  
  /* 技术特性 */
  .tech-features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .tech-item {
    background: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  
  .tech-icon {
    font-size: 2rem;
    margin-right: 1rem;
    color: #3b82f6;
  }
  
  .tech-content {
    flex: 1;
  }
  
  .tech-content h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: #1e3a8a;
  }
  
  .tech-content p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  /* 使用场景 */
  .use-cases-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .use-case-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    padding: 1.5rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .use-case-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }
  
  .use-case-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #3b82f6;
  }
  
  .use-case-card h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    color: #1e3a8a;
  }
  
  .use-case-card p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
    color: #475569;
  }
  
  /* 结论 */
  .conclusion-panel {
    background: #f1f5f9;
    border-left: 4px solid #3b82f6;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  /* CTA区域 */
  .cta-section {
    text-align: center;
    margin: 2.5rem 0;
  }
  
  .cta-button {
    display: inline-block;
    background: linear-gradient(to right, #3b82f6, #2563eb);
    color: white;
    font-weight: 600;
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .feature-section, .tech-features, .use-cases-grid {
      grid-template-columns: 1fr;
    }
    
    .step-item {
      flex-direction: column;
    }
    
    .step-number {
      margin-bottom: 0.75rem;
      margin-right: 0;
    }
    
    .tech-item {
      flex-direction: column;
    }
    
    .tech-icon {
      margin-bottom: 0.75rem;
      margin-right: 0;
    }
  }
</style>