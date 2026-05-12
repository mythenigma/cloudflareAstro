---
title: "Online Share vs. Secure Share: Choosing the Right PDF Protection Model"
description: "An in-depth comparison between MaiPDF Online Share (cloud-hosted links) and MaiPDF Secure Share (locked HTML files) to help you pick the right security model for the way your document actually travels."
pubDate: "Apr 3 2026"
updatedDate: "Apr 3 2026"
heroImage: "/maipdf2026/offline/two%20comparison.png"
tags: ["PDF Security", "Document Sharing", "Secure Share", "MaiPDF"]
---

# Online Share vs. Secure Share: Choosing the Right PDF Protection Model

<div class="intro-panel">
  <p>Resumes, quotes, portfolios, confidential contracts — PDFs carry your time and trust, and once leaked the consequences are hard to walk back. MaiPDF runs two products that solve overlapping but distinct problems: <strong>Online Share</strong> at <a href="https://maipdf.com/">maipdf.com</a> (cloud-hosted PDFs viewed via a short link) and <strong>Secure Share</strong> at <a href="https://drm.maipdf.com/">drm.maipdf.com</a> (a single self-contained locked HTML file with a server-checked license). The choice is not "more secure vs. less secure" — it's about whether you want to control <em>access to a link</em> or control <em>the file itself after delivery</em>.</p>
</div>


![Online Sharing vs DRM](/maipdf2026/offline/two%20comparison.png)

## Side-by-side comparison

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>Dimension</th>
        <th>Online Share (maipdf.com)</th>
        <th>Secure Share (drm.maipdf.com)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>What you send</td>
        <td>A short link (or QR code)</td>
        <td>A single self-contained locked <code>.html</code> file</td>
      </tr>
      <tr>
        <td>Where the PDF lives</td>
        <td>Hosted on MaiPDF cloud, viewed in the browser via the link</td>
        <td>Encrypted inside the HTML file the recipient holds; server keeps a license row and half of the key</td>
      </tr>
      <tr>
        <td>Network requirements</td>
        <td>Continuous internet connection while reading</td>
        <td>Internet required at opening time for the one-shot license check; no purely-offline mode</td>
      </tr>
      <tr>
        <td>Encryption</td>
        <td>Encrypted transmission and storage</td>
        <td>AES-256-GCM, split-key model; PDF itself never persisted on the server</td>
      </tr>
      <tr>
        <td>Post-delivery control</td>
        <td>Revoke/pause/extend at any time; can also replace the underlying PDF</td>
        <td>Revoke/pause/extend or add opens at any time via <code>/manage</code> or the dashboard; the underlying PDF cannot be replaced — you would pack a new file</td>
      </tr>
      <tr>
        <td>What the server knows about each open</td>
        <td>Real-time open events with IP, region, device, timestamp</td>
        <td>Open-count and expiry, enforced atomically; less detailed per-open telemetry</td>
      </tr>
      <tr>
        <td>Recipient experience</td>
        <td>Click link → reads in the browser</td>
        <td>Double-click HTML → "Open · Unlock" → reads in the browser</td>
      </tr>
      <tr>
        <td>Best fit</td>
        <td>Everyday documents, frequently-updated drafts, scenarios that need rich open analytics</td>
        <td>Sensitive or premium content, anything where the sender wants to keep authority over the file <em>after</em> it has been delivered</td>
      </tr>
    </tbody>
  </table>
</div>

## Online Share: how it works

<div class="method-section">
  <h3>1. Upload returns a short link or QR code</h3>
  <p>Drag and drop your PDF onto <a href="https://maipdf.com/">maipdf.com</a>. The system stores it and returns a short URL plus a QR code.</p>

  <h3>2. Live permission control</h3>
  <ul>
    <li>Change view count, expiry, or even replace the PDF while keeping the same link.</li>
    <li>If you shared the link with the wrong person, revoke it — the next refresh denies access.</li>
  </ul>

  <h3>3. Open analytics</h3>
  <p>The backend records each open with IP, region, device, and timestamp.</p>

  <h3>4. Viewer friction (not hard barriers)</h3>
  <ul>
    <li>Right-click is disabled and the print path is neutralized via CSS.</li>
    <li>Optional per-page watermarks can be displayed inside the viewer.</li>
  </ul>
  <p style="margin-top: 0.5rem; color: #6b7280; font-size: 0.95rem">A reader with browser developer tools can still capture a decrypted page; watermarks give a forensic trail, not a stop.</p>
</div>

<div class="pro-con-section">
  <div class="pro-section">
    <h3>Strengths</h3>
    <ul>
      <li>Replace files and change permissions without re-sending anything.</li>
      <li>Any device with a browser can read — no installation, no codes.</li>
      <li>Best for frequently-updated drafts and any scenario where you want detailed open analytics.</li>
    </ul>
  </div>

  <div class="con-section">
    <h3>Trade-offs</h3>
    <ul>
      <li>Needs a live internet connection to read — poor experience on flights, subways, or restricted networks.</li>
      <li>The PDF sits on a MaiPDF server. Highly-regulated workflows may require a compliance review of that.</li>
    </ul>
  </div>
</div>

## Secure Share: how it works

<div class="method-section">
  <h3>1. Packing happens once, on drm.maipdf.com</h3>
  <p>Upload the PDF (up to 65 MB), set the open-count and expiry, and the server encrypts the file with AES-256-GCM, generates a license, and hands back a single self-contained locked HTML file.</p>

  <h3>2. Every open does a server check</h3>
  <p>When the recipient clicks "Open · Unlock", the viewer inside the HTML calls <code>drm.maipdf.com</code> to verify the license, atomically decrement the open count, and confirm the expiry. Failed checks display "License has been revoked." or similar.</p>

  <h3>3. Copies do not multiply the license</h3>
  <p>The HTML can be copied a thousand times; the server tracks one license. Once the open count is exhausted, every copy of the HTML stops working.</p>

  <h3>4. Two management paths</h3>
  <ul>
    <li><strong>Anonymous:</strong> save the License ID + 26-character Modification Code shown after packing, and use <code>/manage</code> to add opens, extend expiry, pause, resume, or delete the license — no login required.</li>
    <li><strong>Signed-in:</strong> sign in with Google before packing, and every license you create shows up in the dashboard at <code>/dashboard</code> with one-click controls.</li>
  </ul>
  <p style="margin-top: 0.5rem; color: #6b7280; font-size: 0.95rem">The file content itself cannot be edited after packing. To publish a corrected version, pack a fresh file and revoke the old license.</p>
</div>

<div class="pro-con-section">
  <div class="pro-section">
    <h3>Strengths</h3>
    <ul>
      <li>The file lives where you sent it — internal file server, USB stick, email attachment — and you still keep the ability to revoke or extend it.</li>
      <li>The PDF is never persisted on the MaiPDF server; only a license row plus half of the encryption key are stored.</li>
      <li>Fits scenarios where the sender needs lasting authority over the artifact after delivery.</li>
    </ul>
  </div>

  <div class="con-section">
    <h3>Trade-offs</h3>
    <ul>
      <li>The recipient must be online at opening time for the license check — Secure Share is not an air-gapped tool.</li>
      <li>Per-open telemetry is less detailed than Online Share; you see remaining opens and expiry status, not a per-reader IP log.</li>
      <li>You cannot "fix a typo" inside the locked HTML — corrections require packing a new file.</li>
    </ul>
  </div>
</div>

## Pick the right tool in one sentence

<div class="decision-guide">
  <ul>
    <li><strong>I want to change permissions anytime and see who opened the file → Online Share</strong> at <a href="https://maipdf.com/">maipdf.com</a></li>
    <li><strong>The file must travel with the recipient, and I still want to revoke or extend access after delivery → Secure Share</strong> at <a href="https://drm.maipdf.com/">drm.maipdf.com</a></li>
    <li><strong>The recipient has no internet at all → neither tool fits.</strong> Both Online Share and Secure Share require connectivity (continuous for the former, one-shot at open-time for the latter). For truly air-gapped delivery, use a local-encryption tool or an encrypted drive.</li>
  </ul>
</div>

## Practical tips

<div class="tips-table">
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Practical tips</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Online Share</td>
        <td>
          <ul>
            <li>Enable per-page watermarks when sharing material that could plausibly leak — the watermark is a forensic trail, not a stop.</li>
            <li>Use a short expiry by default; extend rather than create-from-scratch when the review runs long.</li>
            <li>For sensitive links, prefer one recipient per link so analytics tell you who opened what.</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Secure Share</td>
        <td>
          <ul>
            <li>If you signed in with Google, you do not need to save the Modification Code separately — the dashboard at <code>/dashboard</code> proves ownership via your Google session.</li>
            <li>If you packed anonymously, store the Modification Code in a password manager <em>before</em> leaving the result page. There is no recovery flow if you lose it without signing in.</li>
            <li>Plan ahead: confirm the recipient has internet access at opening time. There is no purely-offline open path.</li>
            <li>For "one-time view" workflows, set open count to 1 and use a tight expiry — closing and reopening the tab consumes a view, leaving it open does not.</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## Conclusion

<div class="conclusion-panel">
  <p>There is no one-size-fits-all encryption method — only workflows best suited to your needs. Online Share is the right answer when you want a link, live updates, and detailed analytics; Secure Share is the right answer when you need the sender to keep authority over the file itself after it has been delivered. Both products are candid that browser-based DRM has limits — a determined recipient with browser developer tools can extract a decrypted page, and no DRM defeats a phone camera pointed at a monitor. Choose the product that matches how the file will actually travel, and use watermarks plus tight expiry rather than expecting unbreakable protection.</p>
  <p style="margin-top: 0.75rem"><strong>Try them:</strong> <a href="https://maipdf.com/">maipdf.com</a> for Online Share, <a href="https://drm.maipdf.com/">drm.maipdf.com</a> for Secure Share. Both are free and require no signup.</p>
</div>

<div class="related-articles">
  <h3>Related Articles</h3>
  <ul>
    <li><a href="../../en/pdf-offline-html-package/">PDF Secure Sharing Solution: One-Click Locked HTML File</a></li>
    <li><a href="../../en/offline-pdf-drm-mode/">MaiPDF Secure Share (DRM Mode): Locked PDF Packages You Can Send</a></li>
    <li><a href="../../en/dynamic-watermarks-on-pdf/">Dynamic PDF Watermarks: Precisely Track Reading Behavior</a></li>
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
