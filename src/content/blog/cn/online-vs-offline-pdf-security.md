<<<<<<< Updated upstream
---
title: "MaiPDF 怎么选：在线链接 vs 网页 HTML 包 vs .maipdf"
description: "三种交付方式，安全等级不同。网页打包（PDF→HTML→ZIP）和 .maipdf 原生打包不能当一回事。"
pubDate: "Jan 17 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/two%20comparison.png"
tags: ["防止截屏", "Secure Share", ".maipdf", "PDF分享"]
showDefaultCta: false
---

| 需求 | 用什么 | 安全等级 |
|---|---|---|
| 快发、可换链后文件 | [maipdf.cn](https://maipdf.cn) 链接 | 在线阅读 |
| 发文件、**对方不装 App** | [pack.html](https://drm.maipdf.com/pack.html) 网页打包 → HTML 进 ZIP | 浏览器，**不能防截屏** |
| **PDF 防止截屏** | `.maipdf` + [MaiPDF Secure App](https://drm.maipdf.com/) | 原生，系统级拦截 |

网页打包和 `.maipdf` 不是「推荐版 vs 旧版」，是 **两套 pipeline**。

**大陆用户：** 国内商店非首批 → [下载说明](/blog/cn/prevent-screenshot-pdf-drm-native-app)
=======
---
title: "Online Share vs Secure Share：选对 PDF 保护模型"
description: "深入对比 MaiPDF Online Share（maipdf.com 云端外链）与 MaiPDF Secure Share（drm.maipdf.com 加锁 HTML 文件），帮助你按文件真实流转方式挑对工具。"
pubDate: "Jan 17 2026"
updatedDate: "May 12 2026"
heroImage: "/maipdf2026/offline/two%20comparison.png"
tags: ["PDF安全", "Online Share", "Secure Share", "drm.maipdf.com", "MaiPDF"]
---

# Online Share vs Secure Share：选对 PDF 保护模型

<div class="intro-panel">
  <p>简历、报价单、作品集、机密合同——PDF 承载的不只是文件，还有你的时间与信任。一旦失控，后果难以挽回。MaiPDF 有两个解决相邻但不同问题的产品：<strong>Online Share</strong>（<a href="https://maipdf.com/">maipdf.com</a>，云端托管的 PDF 通过短链查看）与 <strong>Secure Share</strong>（<a href="https://drm.maipdf.com/">drm.maipdf.com</a>，自包含的加锁 HTML 文件，每次打开做服务端 license 校验）。选择不是"更安全还是更不安全"——而是你想控制<em>对链接的访问</em>还是<em>交付后的文件本身</em>。</p>
</div>

## 横向对比

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>维度</th>
        <th>Online Share（maipdf.com）</th>
        <th>Secure Share（drm.maipdf.com）</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>发出去的是什么</td>
        <td>一个短链（或二维码）</td>
        <td>一个自包含的加锁 <code>.html</code> 文件</td>
      </tr>
      <tr>
        <td>PDF 存在哪里</td>
        <td>MaiPDF 云端托管，通过短链在浏览器查看</td>
        <td>加密内嵌在收件人手里的 HTML 文件中；服务端只存 license 记录和一半的密钥</td>
      </tr>
      <tr>
        <td>打开时网络要求</td>
        <td>阅读全程需联网</td>
        <td>打开时一次性回调校验 license；<strong>不存在纯离线模式</strong></td>
      </tr>
      <tr>
        <td>加密方式</td>
        <td>传输与存储加密</td>
        <td>AES-256-GCM、分片密钥模型；PDF 本体不在服务器持久化</td>
      </tr>
      <tr>
        <td>交付后控制</td>
        <td>随时撤销/暂停/延期；也可替换底层 PDF</td>
        <td>随时撤销/暂停/延期、增加打开次数（在 <code>/manage</code> 或 dashboard）；<strong>不能替换 PDF 内容</strong>——要重新打包</td>
      </tr>
      <tr>
        <td>每次打开的服务端记录</td>
        <td>实时记录 IP、地区、设备、时间</td>
        <td>原子校验打开次数与过期；逐次访客遥测更轻量</td>
      </tr>
      <tr>
        <td>收件人体验</td>
        <td>点链接 → 在浏览器阅读</td>
        <td>双击 HTML → 点 "Open · Unlock" → 在浏览器阅读</td>
      </tr>
      <tr>
        <td>最佳场景</td>
        <td>日常文档、频繁更新的草稿、需要详细打开分析</td>
        <td>敏感或付费内容、希望文件交付后发送方仍保有权力</td>
      </tr>
    </tbody>
  </table>
</div>

## Online Share：在线外链的工作原理

<div class="method-section">
  <h3>1. 上传即生成短链 / QR</h3>
  <p>把 PDF 拖到 <a href="https://maipdf.com/">maipdf.com</a>，系统存档并返回一个短 URL 与二维码。</p>
  <h3>2. 实时权限可控</h3>
  <ul>
    <li>随时修改打开次数、过期时间，甚至直接替换底层 PDF 而短链不变</li>
    <li>如果链接发错人，立即撤销——下次刷新即被拒</li>
  </ul>
  <h3>3. 打开分析</h3>
  <p>后台为每次打开记录 IP、地区、设备、时间。</p>
  <h3>4. 查看器阻力（不是硬屏障）</h3>
  <ul>
    <li>禁用右键、CSS 中和打印</li>
    <li>可选每页水印</li>
  </ul>
  <p style="margin-top: 0.5rem; color: #6b7280; font-size: 0.95rem">有耐心的读者用浏览器开发者工具可以截获已解密的页面；水印提供取证线索，但不能阻断。</p>
</div>

<div class="pro-con-section">
  <div class="pro-section">
    <h3>优势</h3>
    <ul>
      <li>不需要重新发送：直接换文件、改权限即可</li>
      <li>任意带浏览器的设备即可读——无需账号、无需安装</li>
      <li>适合频繁更新的草稿、需要详细打开分析的场景</li>
    </ul>
  </div>
  <div class="con-section">
    <h3>取舍</h3>
    <ul>
      <li>需要全程联网——飞机、地铁、受限网络体验差</li>
      <li>PDF 存在 MaiPDF 服务器上，高合规场景需要先评估</li>
    </ul>
  </div>
</div>

## Secure Share：加锁 HTML 的工作原理

<div class="method-section">
  <h3>1. 一次性打包在 drm.maipdf.com</h3>
  <p>上传 PDF（≤ 65 MB），设置打开次数与过期，服务端用 AES-256-GCM 加密、生成 license，回返一个自包含的加锁 HTML 文件。</p>
  <h3>2. 每次打开都做服务端校验</h3>
  <p>收件人点击"Open · Unlock"时，HTML 内的查看器回调 <code>drm.maipdf.com</code> 校验 license、原子递减打开次数、确认未过期。校验失败显示"License has been revoked." 等。</p>
  <h3>3. 复制不会绕过 license</h3>
  <p>HTML 可被复制无数份，但服务端只认一个 license——次数耗尽后所有副本同时停摆。</p>
  <h3>4. 两种管理路径</h3>
  <ul>
    <li><strong>匿名：</strong>保存打包后显示的 License ID + 26 位 Modification Code，在 <code>/manage</code> 加次数、延期、暂停、恢复或删除——无需登录。</li>
    <li><strong>登录态：</strong>打包前用 Google 登录，每个 license 自动出现在 <code>/dashboard</code>，一键管理无需粘贴码。</li>
  </ul>
  <p style="margin-top: 0.5rem; color: #6b7280; font-size: 0.95rem">已打包的文件内容不能事后修改——纠正错字需要重新打包并撤销旧 license。</p>
</div>

<div class="pro-con-section">
  <div class="pro-section">
    <h3>优势</h3>
    <ul>
      <li>文件就在收件人手里（内网、U 盘、邮件附件），你仍保有撤销与延期的权力</li>
      <li>PDF 本体不在 MaiPDF 服务器持久化，只保留 license 行与一半的密钥</li>
      <li>适合"交付后仍可控"的强约束场景</li>
    </ul>
  </div>
  <div class="con-section">
    <h3>取舍</h3>
    <ul>
      <li>打开时收件人必须联网——Secure Share 不是气隔工具</li>
      <li>逐次访客遥测比 Online Share 简略：你看到的是剩余次数与过期状态，而不是每个读者的 IP 日志</li>
      <li>不能"线上改错字"——纠错需要重新打包一份</li>
    </ul>
  </div>
</div>

## 一句话选型

<div class="decision-guide">
  <ul>
    <li><strong>我想随时改权限、看谁打开过 → Online Share</strong>（<a href="https://maipdf.com/">maipdf.com</a>）</li>
    <li><strong>文件必须跟着收件人走，但我仍要事后撤销/延期 → Secure Share</strong>（<a href="https://drm.maipdf.com/">drm.maipdf.com</a>）</li>
    <li><strong>收件人完全没网 → 两个产品都不合适。</strong>Online Share 全程需联网，Secure Share 打开时需联网。真正的气隔分发请用本地加密工具或加密硬盘。</li>
  </ul>
</div>

## 实用 Tips

<div class="tips-table">
  <table>
    <thead>
      <tr>
        <th>产品</th>
        <th>实用建议</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Online Share</td>
        <td>
          <ul>
            <li>分享有泄漏风险的材料时开启每页水印——水印是取证线索，不是阻断手段</li>
            <li>默认设置较短过期；超时再延期，而不是创建无过期链接</li>
            <li>敏感链接建议一人一链，分析数据会告诉你谁打开了什么</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Secure Share</td>
        <td>
          <ul>
            <li>如果用 Google 登录打包，无需单独保存 Modification Code——dashboard 通过登录态证明所有权</li>
            <li>匿名打包请<strong>先把 Modification Code 存进密码管理器</strong>再离开结果页。无登录时遗失无法恢复</li>
            <li>事先确认收件人在打开时有网络访问。<strong>没有纯离线模式。</strong></li>
            <li>"仅 1 次阅读"用法：次数设 1、过期设短——标签页保持打开不消耗次数，关掉再开会消耗</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## 结语

<div class="conclusion-panel">
  <p>没有万能的加密方式，只有最适合的工作流。Online Share 适合需要短链 + 实时更新 + 详尽分析的场景；Secure Share 适合"文件交付后发送方仍保有权力"的场景。两个产品都坦诚承认浏览器 DRM 的局限——有耐心的读者用开发者工具可截获已解密的页面，手机对着屏幕拍照也无法防止。选对工具、配合较短过期与水印，比寄望于"绝对防泄漏"现实得多。</p>
  <p style="margin-top: 0.75rem"><strong>立即体验：</strong>Online Share 在 <a href="https://maipdf.com/">maipdf.com</a>，Secure Share 在 <a href="https://drm.maipdf.com/">drm.maipdf.com</a>。都免费，都不需要注册。</p>
</div>

<div class="related-articles">
  <h3>相关推荐</h3>
  <ul>
    <li><a href="../../cn/pdf-offline-html-package/">PDF 安全分享方案：一键生成自包含的加锁 HTML 文件</a></li>
    <li><a href="../../cn/offline-pdf-drm-mode/">MaiPDF Secure Share（加锁 HTML 包）：drm.maipdf.com 的 PDF 控权方案</a></li>
    <li><a href="../../cn/dynamic-watermarks-on-pdf/">PDF 动态水印：精确跟踪阅读行为</a></li>
  </ul>
</div>

<style>
  /* Base styles */
  .intro-panel {
    background: linear-gradient(to right, #f8fafc, #e2e8f0);
    border-left: 4px solid #3b82f6;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  
  /* Comparison table */
  .comparison-table {
    width: 100%;
    margin: 1.5rem 0;
    overflow-x: auto;
  }
  
  .comparison-table table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  
  .comparison-table th {
    background-color: #f1f5f9;
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    border: 1px solid #e2e8f0;
  }
  
  .comparison-table td {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    vertical-align: top;
  }
  
  .comparison-table tr:nth-child(even) {
    background-color: #f8fafc;
  }
  
  /* Method section */
  .method-section {
    margin: 1.5rem 0;
  }
  
  .method-section h3 {
    color: #3b82f6;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  
  .method-section ul {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .method-section li {
    margin-bottom: 0.5rem;
  }
  
  /* Pro/Con Sections */
  .pro-con-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .pro-section, .con-section {
    background: #f8fafc;
    padding: 1.25rem;
    border-radius: 0.5rem;
  }
  
  .pro-section h3 {
    color: #10b981;
    margin-top: 0;
    margin-bottom: 0.75rem;
  }
  
  .con-section h3 {
    color: #ef4444;
    margin-top: 0;
    margin-bottom: 0.75rem;
  }
  
  .pro-section ul, .con-section ul {
    margin-left: 1.25rem;
    margin-bottom: 0;
  }
  
  .pro-section li, .con-section li {
    margin-bottom: 0.5rem;
  }
  
  /* Decision Guide */
  .decision-guide {
    background: #f0f9ff;
    border-left: 4px solid #0ea5e9;
    padding: 1.25rem 1.5rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
  }
  
  .decision-guide ul {
    margin-left: 1.25rem;
    margin-bottom: 0;
  }
  
  .decision-guide li {
    margin-bottom: 0.75rem;
    font-size: 1.05rem;
  }
  
  /* Tips Table */
  .tips-table {
    width: 100%;
    margin: 1.5rem 0;
  }
  
  .tips-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .tips-table th {
    background-color: #f1f5f9;
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    border: 1px solid #e2e8f0;
  }
  
  .tips-table td {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    vertical-align: top;
  }
  
  .tips-table ul {
    margin-left: 1.25rem;
    margin-bottom: 0;
  }
  
  .tips-table li {
    margin-bottom: 0.5rem;
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
  
  /* Related Articles */
  .related-articles {
    margin: 2rem 0;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }
  
  .related-articles h3 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }
  
  .related-articles ul {
    margin-left: 1.25rem;
  }
  
  .related-articles li {
    margin-bottom: 0.5rem;
  }
  
  .related-articles a {
    color: #3b82f6;
    text-decoration: none;
  }
  
  .related-articles a:hover {
    text-decoration: underline;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .pro-con-section {
      grid-template-columns: 1fr;
    }
    
    .con-section {
      margin-top: 0;
    }
  }
</style>
>>>>>>> Stashed changes
