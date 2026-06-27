<<<<<<< Updated upstream
---
title: "MaiPDF Secure Share: web pack vs .maipdf desktop app"
description: "Full comparison of pack.html (PDF→HTML→ZIP, browser) and MaiPDF Secure desktop app (.maipdf, OS screenshot block). Same license server, different products."
pubDate: "Apr 3 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["Secure Share", ".maipdf", "Locked HTML", "PDF DRM"]
showDefaultCta: false
---

[drm.maipdf.com](https://drm.maipdf.com/) hosts **two products** that share license infrastructure but must not be confused:

| Product | Where | Output | Reader |
|---|---|---|---|
| **Web packer** | [pack.html](https://drm.maipdf.com/pack.html) | HTML in ZIP | Browser |
| **MaiPDF Secure** | Desktop / mobile app | `.maipdf` | App only |

---

## Web pack (pack.html) — lower security tier

**Pipeline:** PDF → AES-GCM-256 encrypt → key split (HTML half + server half) → **webpack** self-contained HTML → ZIP download.

**Good for:**

- Recipients who will **not install** software
- Attachments, USB, internal shares when a **file** must travel
- Open limits, expiry, revoke, optional watermark

**Limits (pack.html FAQ, paraphrased):**

- Internet required at **Unlock**
- **Cannot prevent screenshot** — watermarks trace leaks, they do not block capture
- Determined user with **browser devtools** can extract decrypted PDF during an open
- Print/save blocking is UX friction (shortcuts, right-click), not a hard guarantee
- We do **not** store your PDF after pack — only license metadata + server key half

→ [Complete web pack guide](/blog/en/how-to-create-offline-pdf-package-complete-guide)

---

## MaiPDF Secure desktop app — higher security tier

**Pipeline:** pack inside native app → encrypted **`.maipdf`** → open only in app → license check → native protected viewer.

**Adds:**

- **Prevent screenshot / screen recording** (OS-dependent; Android strongest on mobile)
- Device integrity checks
- No browser devtools extraction path

![Desktop DRM entry](/maipdf2026/offline/offlinedrm.png)

→ [Prevent screenshot complete guide](/blog/en/prevent-screenshot-pdf-drm-native-app)

---

## Side-by-side

| | Web HTML pack | `.maipdf` + app |
|---|---|---|
| Pack where | Browser | Desktop / mobile app |
| Technical path | PDF→HTML→ZIP | Native encrypt |
| Install required | No | Yes |
| Security tier | Browser sandbox | OS-level controls |
| Prevent screenshot | **No** | **Yes** |
| Revoke after send | Yes | Yes |
| Network at open | Yes | Yes |
| Free (current) | Yes | Yes |

**Pick web pack** when install is a hard no and you accept browser limits.

**Pick `.maipdf`** when contracts, courseware, or confidential PDFs need capture control.

---

## Shared backend

Both paths use the same **license server** (opens, expiry, revoke). That does **not** mean the files or readers are interchangeable — a `.maipdf` will not open in the web HTML viewer and vice versa.

---

## Limits (both)

- Cannot stop a **second camera** at the screen
- 65 MB cap on web packer uploads
- Repack required when PDF content changes

<div class="cta-container">
  <a href="https://drm.maipdf.com/" target="_blank" rel="noopener noreferrer" class="cta-button">
    drm.maipdf.com
  </a>
</div>
=======
---
title: "MaiPDF Offline PDF DRM Mode: Secure Document Control in Offline Environments"
description: "Learn about MaiPDF's offline DRM functionality that allows controlling PDF access permissions, viewing duration, and print/copy operations in offline environments without specialized readers."
pubDate: "Apr 3 2026"
updatedDate: "Apr 3 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["PDF Security", "Document DRM", "Secure Share", "MaiPDF"]
---

# MaiPDF Secure Share (DRM Mode): Locked PDF Packages You Can Send

<div class="intro-panel">
  <p>MaiPDF Secure Share — hosted on <a href="https://drm.maipdf.com/">drm.maipdf.com</a> — turns a PDF into a single self-contained HTML file with AES-256-GCM encryption, per-page watermarks, view-count limits, and expiry. The reader double-clicks the HTML; their browser contacts the server once to check the license is still valid; the PDF then renders inside the page. This article describes what the product actually does, and what it does not do.</p>
</div>


![MaiPDF Secure Share — DRM for PDFs](/maipdf2026/offline/offlinedrm.png)

## 1️⃣ Core Definition

<div class="feature-section">
  <div class="feature-content">
    <p><strong>Self-contained HTML output:</strong> The site bundles an encrypted PDF plus a viewer into one HTML file. Recipients open it in any modern browser — no app, no plugin.</p>
    <p><strong>Server-checked license:</strong> Opening the file makes a single online call to <code>drm.maipdf.com</code> to verify that the license is still active and within its open-count and expiry rules. Without that handshake, the file remains encrypted ciphertext. There is no purely-local decryption mode.</p>
  </div>
  <div class="feature-image">
    <img src="/maipdf2026/offline/inststruct.png" alt="How to use MaiPDF Secure Share" class="medium">
  </div>
</div>

## 2️⃣ Main Feature List

<div class="features-table">
  <table>
    <thead>
      <tr>
        <th>Feature Dimension</th>
        <th>Secure Share Capability</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Reading Permissions</td>
        <td>Configurable open-count limit and expiry timestamp</td>
        <td>Enforced server-side and atomically; once exhausted, all copies of the HTML stop opening</td>
      </tr>
      <tr>
        <td>Viewer Friction</td>
        <td>Right-click disabled, print dialog neutralized via CSS, blur shield when tab is hidden</td>
        <td>These are UX friction, not unbreakable barriers — see Limitations below</td>
      </tr>
      <tr>
        <td>Encryption Method</td>
        <td>AES-256-GCM. The server stores only half of the encryption key plus a license row</td>
        <td>The PDF itself is never persisted on the server</td>
      </tr>
      <tr>
        <td>Anti-Automation</td>
        <td>The server returns 12 candidate keys with 11 random decoys</td>
        <td>Slows down AI / bulk-scraping clients that try to harvest keys</td>
      </tr>
      <tr>
        <td>Watermarks</td>
        <td>Optional per-page watermarks</td>
        <td>Useful as a forensic trail; does not prevent screenshots or photos of the screen</td>
      </tr>
      <tr>
        <td>Cross-platform</td>
        <td>Any modern browser (Chrome, Edge, Safari, Firefox)</td>
        <td>Windows / macOS / Linux / iOS / Android — internet required at opening time</td>
      </tr>
      <tr>
        <td>No Installation</td>
        <td>Output is a single self-contained <code>.html</code> file</td>
        <td>Recipients need no plugin, app, or account</td>
      </tr>
    </tbody>
  </table>
</div>

## 3️⃣ Creation Process (Pack on drm.maipdf.com)

<div class="steps-container">
  <div class="step-item">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Drop the PDF on the home page</h3>
      <p>Open <a href="https://drm.maipdf.com/">drm.maipdf.com</a> and drag a PDF (up to 65 MB) onto the upload zone. The file stays in your browser until you click Pack.</p>
      <img src="/offlinepages/upload_section_offline_maipdf.png" alt="PDF upload interface" class="small">
    </div>
  </div>

  <div class="step-item">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>Configure rules</h3>
      <p>Set the open-count limit and the expiry timestamp. Optionally override the display filename your reader sees. That is the full set of pack-time settings.</p>
      <img src="/offlinepages/security_setting.png" alt="Permission settings" class="small">
    </div>
  </div>

  <div class="step-item">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Click "🔐 Pack &amp; Download"</h3>
      <p>The server encrypts the PDF, generates a license, and returns a single self-contained HTML file (e.g. <code>MaiPDF-SecureShare-yourdocument-locked.html</code>).</p>
      <img src="/offlinepages/result_download_zip_file.png" alt="Generated locked HTML" class="small">
    </div>
  </div>

  <div class="step-item">
    <div class="step-number">4</div>
    <div class="step-content">
      <h3>Save your codes</h3>
      <p>Two codes appear after packing:</p>
      <ul>
        <li><strong>License ID</strong> — the public identifier of the protected file.</li>
        <li><strong>Modification Code</strong> — a 26-character secret. Save it in a password manager before leaving the page. It is the only way to manage the license later, unless you signed in with Google.</li>
      </ul>
    </div>
  </div>

  <div class="step-item">
    <div class="step-number">5</div>
    <div class="step-content">
      <h3>Send the locked HTML</h3>
      <p>Email it, drop it in Slack, upload it to Drive, put it on a USB stick — share it however you would share a regular file. Recipients double-click the HTML, click "Open · Unlock", and the viewer renders the PDF after the online license check succeeds.</p>
      <img src="/offlinepages/click_html_inside_zip_to_view.png" alt="Opening the locked HTML" class="small">
    </div>
  </div>
</div>

<div class="note-box">
  <p><strong>Managing the license later:</strong> paste your License ID + Modification Code at <a href="https://drm.maipdf.com/manage">drm.maipdf.com/manage</a> to add opens, extend expiry, pause, resume, or delete — no login required. If you signed in with Google when packing, the dashboard at <a href="https://drm.maipdf.com/dashboard">drm.maipdf.com/dashboard</a> lets you manage every license you have packed without pasting codes.</p>
</div>

## 4️⃣ How It Actually Works

<div class="tech-features">
  <div class="tech-item">
    <div class="tech-icon">🔐</div>
    <div class="tech-content">
      <h3>AES-256-GCM, split-key model</h3>
      <p>The PDF is encrypted with AES-256-GCM. The server stores a license row plus half of the encryption key; the other half travels with the locked HTML. Neither half alone can decrypt the file.</p>
    </div>
  </div>

  <div class="tech-item">
    <div class="tech-icon">🌐</div>
    <div class="tech-content">
      <h3>Server-side, atomic enforcement</h3>
      <p>Every "Open · Unlock" click hits the server, which atomically checks and decrements the open count and verifies the expiry. Leaving the tab open does not consume views; closing and re-opening does.</p>
    </div>
  </div>

  <div class="tech-item">
    <div class="tech-icon">🤖</div>
    <div class="tech-content">
      <h3>Anti-automation chaff</h3>
      <p>To slow down AI / bulk scrapers, the server returns 12 candidate keys with 11 random decoys, only one of which is the real key. The viewer in the HTML knows which to use; an automated harvester does not.</p>
    </div>
  </div>

  <div class="tech-item">
    <div class="tech-icon">💧</div>
    <div class="tech-content">
      <h3>Optional per-page watermarks</h3>
      <p>You can have the viewer render per-page watermarks on top of the PDF. These give you a forensic trail if a screenshot leaks; they do not stop screenshots from being taken.</p>
    </div>
  </div>
</div>

## 5️⃣ Honest Limitations

<div class="limitations-table">
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Maximum upload size</td>
        <td>65 MB per PDF. Above this, the upload is rejected. (Cloudflare Workers platform body-size limit, not arbitrary.)</td>
      </tr>
      <tr>
        <td>Internet required at opening time</td>
        <td>The viewer must reach <code>drm.maipdf.com</code> to verify the license before decrypting. There is no purely-offline mode; air-gapped readers will not be able to open the file.</td>
      </tr>
      <tr>
        <td>Determined readers with browser devtools</td>
        <td>The viewer must decrypt the PDF in the reader's browser to render it; that decrypted byte stream is, in principle, extractable by a patient user with developer tools. The viewer's right-click block, print-CSS neutralization, and tab-hidden blur shield are <strong>user-experience friction, not unbreakable barriers</strong>.</td>
      </tr>
      <tr>
        <td>Screenshots and photos</td>
        <td>Pixels on screen leave the system the moment they are displayed. Watermarks give a forensic trail; no browser-based DRM defeats a phone camera pointed at a monitor.</td>
      </tr>
      <tr>
        <td>Pricing</td>
        <td>MaiPDF Secure Share is currently free, running on Cloudflare Pages and D1 free tiers. If usage grows, per-IP rate limits or paid tiers may appear; existing licenses will continue to work.</td>
      </tr>
    </tbody>
  </table>
</div>

## 6️⃣ Typical Use Cases

<div class="use-cases-grid">
  <div class="use-case-card">
    <div class="use-case-icon">📚</div>
    <h3>Educational Materials</h3>
    <p>Distribute to students for offline classroom reading, expiring after class.</p>
  </div>
  
  <div class="use-case-card">
    <div class="use-case-icon">📋</div>
    <h3>Electronic Manuals</h3>
    <p>Include offline HTML with products, allowing customers to view offline but not extract the source PDF.</p>
  </div>
  
  <div class="use-case-card">
    <div class="use-case-icon">📖</div>
    <h3>Book Preview Chapters</h3>
    <p>Set 2 readings, 20 minutes, encouraging purchase of full version.</p>
  </div>
  
  <div class="use-case-card">
    <div class="use-case-icon">🔒</div>
    <h3>Secure Reviews</h3>
    <p>For confidential reports in isolated network environments, self-destroying after review.</p>
  </div>
</div>

## Conclusion

<div class="conclusion-panel">
  <p>MaiPDF Secure Share packages a PDF as a single self-contained HTML file with a server-checked license, AES-256-GCM encryption, and optional watermarks. It is best understood as <strong>controlled distribution</strong>: you keep the ability to revoke, extend, or pause access after the file has been sent, even though the file itself is in someone else's hands. It is not a magic bullet against screenshots, photographs, or determined extraction with browser developer tools — the product is candid about that, and so is this article.</p>
  <p style="margin-top: 0.75rem"><strong>Try it:</strong> open <a href="https://drm.maipdf.com/">drm.maipdf.com</a>, drop a PDF, click <em>Pack &amp; Download</em>. No signup required.</p>
</div>

---

## You might also like:

- [MaiPDF Dynamic Watermark Feature: Precise Tracking of Reading Behavior](../../en/dynamic-watermarks-on-pdf/)
- [Setting PDF View Limits: Effectively Control Document Distribution](../../en/setting-view-limits/)
- [Email Verification: Enhancing PDF Document Access Security](../../en/email-verification/)

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
  
  /* Feature area layout */
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
  
  /* Table styles */
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
  
  /* Steps container */
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
  
  /* Note box */
  .note-box {
    background: #f1f5f9;
    border-left: 4px solid #64748b;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    font-size: 1rem;
  }
  
  /* Technical features */
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
  
  /* Use cases */
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
>>>>>>> Stashed changes
