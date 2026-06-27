---
title: "PDF 安全分享方案：一键生成自包含的加锁 HTML 文件"
description: "MaiPDF Secure Share（drm.maipdf.com）把 PDF 打包成一个自包含的加锁 HTML，AES-256-GCM 加密、打开次数与过期由服务端原子校验、可选每页水印。打开时需联网做一次性 license 校验。"
pubDate: "Jan 17 2026"
updatedDate: "May 12 2026"
heroImage: "/maipdf2026/offline/inststruct.png"
tags: ["PDF安全", "Secure Share", "drm.maipdf.com", "加锁HTML", "MaiPDF"]
noindex: true

---

> **Product direction note:** HTML package / PDF-to-HTML content is now de-emphasized. For current MaiPDF protected-reading workflows, prefer Online Cloud Sharing for fast browser links and App DRM / `.maipdf` for screenshot-aware protection, device binding, revocation, and protected reader controls.

# PDF 安全分享方案：一键生成自包含的加锁 HTML 文件

<div class="intro-panel">
  <p>有些场合，你需要把 PDF<strong>直接交到对方手里</strong>而不是让对方点链接：合同审阅、付费样章、内部报告。MaiPDF Secure Share（<a href="https://drm.maipdf.com/">drm.maipdf.com</a>）提供另一条路径——把 PDF 打包成一个<strong>自包含的加锁 HTML 文件</strong>：AES-256-GCM 加密、打开次数上限、过期时间、可选每页水印都内置。收件人双击 HTML，浏览器一次性向服务端校验 license，PDF 才在页面里渲染。任何时候都可以从 <code>/manage</code> 撤销或延期。</p>
</div>

## 1️⃣ 为什么需要离线阅读包？

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>场景</th>
        <th>旧方案</th>
        <th>遗留问题</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>出差路上审阅合同</td>
        <td>打印纸质版 / 本地 PDF</td>
        <td>打印成本高；文件难以收回</td>
      </tr>
      <tr>
        <td>无网教室发课件</td>
        <td>U 盘拷贝</td>
        <td>容易病毒感染；传播失控</td>
      </tr>
      <tr>
        <td>隔离网络会议</td>
        <td>局域网共享</td>
        <td>配置繁琐；权限粗放</td>
      </tr>
      <tr>
        <td>付费电子书试读</td>
        <td>直接发完整 PDF</td>
        <td>易被二次分发，无试读时限</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="key-need">
  <p><strong>核心需求：</strong> 离线可看 + 权限可控 + 免安装软件。</p>
</div>

## 2️⃣ MaiPDF Secure Share 的真实能力

<div class="features-table">
  <table>
    <thead>
      <tr>
        <th>功能</th>
        <th>实现方式</th>
        <th>可用性</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>一键生成加锁 HTML</td>
        <td>上传 PDF → 服务端用 AES-256-GCM 加密 → 下载一个自包含的 <code>.html</code> 文件</td>
        <td>免费，单文件 ≤ 65 MB</td>
      </tr>
      <tr>
        <td>访问控制</td>
        <td>打开次数上限（整数，可视为无上限）+ 过期时间戳，服务端原子校验</td>
        <td>免费</td>
      </tr>
      <tr>
        <td>查看器阻力</td>
        <td>禁用右键、CSS 中和打印对话框、标签页失焦时遮蒙</td>
        <td>免费——但这只是 UX 阻力，不是不可破的屏障</td>
      </tr>
      <tr>
        <td>每页水印</td>
        <td>查看器在每页上叠加可选水印</td>
        <td>免费</td>
      </tr>
      <tr>
        <td>反自动化诱饵</td>
        <td>服务端返回 12 个候选密钥，其中 11 个是随机诱饵</td>
        <td>免费，始终开启</td>
      </tr>
      <tr>
        <td>License 管理</td>
        <td>匿名：License ID + 26 位 Modification Code，在 <code>/manage</code> 管理；登录：Google OAuth + dashboard</td>
        <td>免费</td>
      </tr>
    </tbody>
  </table>
</div>

## 3️⃣ 三步生成加锁 HTML

<div class="steps-container">
  <div class="step-item">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>上传 PDF</h3>
      <p>打开 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>，把 PDF（≤ 65 MB）拖到上传区。点 Pack 之前，文件只在你浏览器里。</p>
      <img src="/offlinepages/upload_section_offline_maipdf.png" alt="PDF 上传界面" class="small">
    </div>
  </div>
  <div class="step-item">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>设置规则</h3>
      <p>打开次数上限：任意正整数，或不限。</p>
      <p>过期时间戳：日历选择，或不设。</p>
      <p>显示文件名（可选）：覆盖查看器里给收件人看的标题。</p>
      <p>这就是全部打包时的设置项。</p>
      <img src="/offlinepages/security_setting.png" alt="规则设置" class="small">
    </div>
  </div>
  <div class="step-item">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Pack &amp; Download</h3>
      <p>服务端用 AES-256-GCM 加密 PDF、生成 license，回返一个自包含 HTML 文件（如 <code>MaiPDF-SecureShare-yourdocument-locked.html</code>）。记得保存结果页显示的 <strong>License ID</strong> 和 <strong>Modification Code</strong>——除非用 Google 登录打包，否则 Modification Code 是后续管理 license 的唯一凭据。</p>
      <img src="/offlinepages/result_download_zip_file.png" alt="加锁 HTML 下载" class="small">
    </div>
  </div>
</div>

<div class="note-box">
  <p>收件人无需安装任何 App，双击 HTML 即可。点击"Open · Unlock"后，查看器会一次性回调 <code>drm.maipdf.com</code> 校验 license，通过后才解密并渲染 PDF。<strong>不存在纯离线模式</strong>：如果收件人完全断网，文件不会打开。</p>
</div>

## 4️⃣ 与传统方案横向对比

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>指标</th>
        <th>直接发 PDF</th>
        <th>专用 DRM 阅读器</th>
        <th>MaiPDF Secure Share</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>免安装</td>
        <td>✔</td>
        <td>× 需安装客户端</td>
        <td>✔ 任意现代浏览器直开</td>
      </tr>
      <tr>
        <td>无需联网即可阅读</td>
        <td>✔</td>
        <td>部分（依许可类型而定）</td>
        <td>× 打开时需联网做 license 校验</td>
      </tr>
      <tr>
        <td>权限粒度</td>
        <td>×</td>
        <td>细</td>
        <td>打开次数 + 过期，服务端原子校验</td>
      </tr>
      <tr>
        <td>事后撤销</td>
        <td>×</td>
        <td>✔</td>
        <td>✔ 通过 <code>/manage</code> 或登录态 dashboard</td>
      </tr>
      <tr>
        <td>成本</td>
        <td>0</td>
        <td>高（按席授权）</td>
        <td>当前免费</td>
      </tr>
      <tr>
        <td>部署复杂度</td>
        <td>低</td>
        <td>高</td>
        <td>低——无需注册</td>
      </tr>
    </tbody>
  </table>
</div>

## 5️⃣ 应用示例

<div class="use-cases-grid">
  <div class="use-case-card">
    <div class="use-case-icon">📚</div>
    <h3>培训讲义发放</h3>
    <p>打开 50 次、过期设在课后第二天</p>
    <p>课堂可看，结束后整体停摆</p>
  </div>
  <div class="use-case-card">
    <div class="use-case-icon">📖</div>
    <h3>电子书样章试读</h3>
    <p>打开 3 次、到期三天</p>
    <p>刺激购买正版，限制随手转发</p>
  </div>
  <div class="use-case-card">
    <div class="use-case-icon">🔒</div>
    <h3>机密报告审阅</h3>
    <p>打开 5 次、审阅窗口期内到期、每页带水印</p>
    <p>从 <code>/manage</code> 实时撤销或延期</p>
  </div>
  <div class="use-case-card">
    <div class="use-case-icon">📋</div>
    <h3>客户资料包</h3>
    <p>到期 7 天、每页水印</p>
    <p>客户在浏览器里直接打开；你可以不重新发送就延期或暂停访问</p>
  </div>
</div>

## 6️⃣ 常见 Q&A

<div class="faq-section">
  <div class="faq-item">
    <div class="faq-question">
      <p><strong>Q1 加锁 HTML 会被搜索引擎抓到吗？</strong></p>
    </div>
    <div class="faq-answer">
      <p>A 文件是你自主分发的本地资产，搜索引擎看不到——除非你把它放到公开 Web 服务器。License ID 本身是长随机串，猜中不切实际。</p>
    </div>
  </div>
  <div class="faq-item">
    <div class="faq-question">
      <p><strong>Q2 收件人完全没有网络怎么办？</strong></p>
    </div>
    <div class="faq-answer">
      <p>A 文件不会打开。每次"Open · Unlock"都会回调 <code>drm.maipdf.com</code> 校验 license——没有这次握手，加密的 PDF 保持密文状态。<strong>不存在纯离线模式</strong>。如果你需要气隔分发，这不是合适的工具。</p>
    </div>
  </div>
  <div class="faq-item">
    <div class="faq-question">
      <p><strong>Q3 文件大于 65 MB 怎么办？</strong></p>
    </div>
    <div class="faq-answer">
      <p>A 当前上限是 65 MB——这是 Cloudflare Workers 平台 body 大小限制，不是产品任意上限。可以压缩图片、降采样扫描件，或拆分章节分别打包。</p>
    </div>
  </div>
  <div class="faq-item">
    <div class="faq-question">
      <p><strong>Q4 加锁 HTML 能被收件人二次编辑或重新打包吗？</strong></p>
    </div>
    <div class="faq-answer">
      <p>A HTML 里的加密 PDF 绑定服务端 license——修改文件会导致解密失败、产生永远无法打开的废文件。但要诚实地说：有耐心的收件人理论上可以用浏览器开发者工具，在成功打开的瞬间截获解密后的 PDF 字节流。产品 <code>/help</code> 页对此完全坦诚。</p>
    </div>
  </div>
</div>

## 结论

<div class="conclusion-panel">
  <p>MaiPDF Secure Share 是<strong>发送方可控的分发工具</strong>，不是什么"离线神器"。它把单个 HTML 文件交给收件人——容易打开，但每次打开都被一次性服务端 license 校验把守，事后可撤销、暂停、延期。正确的心态是：文件已经离开你的电脑，但你仍保有控制权——同时也要诚实承认浏览器 DRM 对开发者工具提取和截屏拍照存在局限。</p>
  <p style="margin-top: 0.75rem"><strong>立即体验：</strong>打开 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>，拖入 PDF，点 <em>Pack &amp; Download</em>。无需注册。</p>
</div>

---

## 相关推荐：

- [MaiPDF 动态水印功能：精确追踪阅读行为](../../cn/dynamic-watermarks-on-pdf-cn/)
- [设置 PDF 阅读限制：有效控制文档分发](../../cn/safe-control-pdf/)
- [邮箱验证：提升 PDF 文档访问安全性](../../cn/mobile-verification-document-security/)

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
  /* Tables */
  .comparison-table, .features-table {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  
  .comparison-table th, .features-table th {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    padding: 1rem 0.75rem;
    text-align: left;
    font-weight: 600;
    border: none;
    font-size: 1.05rem;
  }
  
  .comparison-table td, .features-table td {
    padding: 0.875rem 0.75rem;
    border: none;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
    transition: background-color 0.2s ease;
  }
  
  .comparison-table tr:nth-child(even), .features-table tr:nth-child(even) {
    background-color: #f8fafc;
  }
  
  .comparison-table tr:hover, .features-table tr:hover {
    background-color: #e0f2fe;
  }  
  /* Key need */
  .key-need {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-left: 4px solid #0ea5e9;
    padding: 1.5rem 2rem;
    border-radius: 0.75rem;
    margin: 2rem 0;
    font-size: 1.2rem;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.1);
  }
    /* Steps container */
  .steps-container {
    margin: 2rem 0;
  }
  
  .step-item {
    display: flex;
    margin-bottom: 2rem;
    align-items: flex-start;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .step-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  }
  
  .step-number {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 1.5rem;
    flex-shrink: 0;
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
    font-size: 1.1rem;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-content h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
    color: #1e3a8a;
    font-weight: 700;
  }
  
  .step-content p {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1.05rem;
    line-height: 1.6;
    color: #475569;
  }
  
  .step-content img {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: block;
    float: none;
    margin: 1rem 0;
    max-width: 100%;
    transition: transform 0.2s ease;
  }
  
  .step-content img:hover {
    transform: scale(1.02);
  }  
  /* Note box */
  .note-box {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border-left: 4px solid #64748b;
    padding: 1.5rem 2rem;
    border-radius: 0.75rem;
    margin: 2rem 0;
    font-size: 1.05rem;
    line-height: 1.6;
    box-shadow: 0 4px 12px rgba(100, 116, 139, 0.1);
    position: relative;
  }
  
  .note-box::before {
    content: '💡';
    position: absolute;
    top: 1.5rem;
    left: 1rem;
    font-size: 1.2rem;
  }
  
  .note-box p {
    margin-left: 2rem;
  }  
  /* Use cases */
  .use-cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .use-case-card {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    padding: 2rem 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
    position: relative;
    overflow: hidden;
  }
  
  .use-case-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
  }
  
  .use-case-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
  
  .use-case-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    display: block;
    text-align: center;
  }
  
  .use-case-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    color: #1e3a8a;
    font-weight: 700;
    text-align: center;
  }
    .use-case-card p {
    margin: 0;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    line-height: 1.6;
    color: #475569;
    text-align: center;
  }
  
  /* FAQ Section */
  .faq-section {
    margin: 2rem 0;
  }
  
  .faq-item {
    background: white;
    border-radius: 12px;
    margin-bottom: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    overflow: hidden;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
  }
  
  .faq-item:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    transform: translateY(-2px);
  }
  
  .faq-question {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 1.5rem 2rem;
    margin: 0;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .faq-question p {
    margin: 0;
    font-size: 1.1rem;
    color: #1e3a8a;
    font-weight: 600;
  }
  
  .faq-answer {
    padding: 1.5rem 2rem;
  }
  
  .faq-answer p {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.6;
    color: #475569;
  }
  
  /* Conclusion and CTA */
  .conclusion-panel {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: white;
    padding: 2.5rem;
    border-radius: 1rem;
    margin: 3rem 0;
    box-shadow: 0 15px 35px rgba(15, 23, 42, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .conclusion-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  
  .conclusion-panel p {
    margin: 0;
    font-size: 1.2rem;
    line-height: 1.7;
    text-align: center;
  }
  
  .cta-section {
    text-align: center;
    margin: 3rem 0;
  }
  
  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }
  
  .cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
    color: white;
    text-decoration: none;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .use-cases-grid {
      grid-template-columns: 1fr;
    }
    
    .step-item {
      flex-direction: column;
      text-align: center;
    }
    
    .step-number {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
  
  /* FAQ section */
  .faq-section {
    margin: 2rem 0;
  }
  
  .faq-item {
    margin-bottom: 1.5rem;
  }
  
  .faq-question {
    margin-bottom: 0.5rem;
  }
  
  .faq-question p {
    font-size: 1.1rem;
    margin: 0;
  }
  
  .faq-answer {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.5rem;
  }
  
  .faq-answer p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
  }
  
  /* Conclusion */
  .conclusion-panel {
    background: #f1f5f9;
    border-left: 4px solid #3b82f6;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  /* CTA area */
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
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .use-cases-grid {
      grid-template-columns: 1fr;
    }
    
    .step-item {
      flex-direction: column;
    }
    
    .step-number {
      margin-bottom: 0.75rem;
      margin-right: 0;
    }
  }
</style>