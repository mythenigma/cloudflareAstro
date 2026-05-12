---
title: "How to Create a Locked HTML PDF Package for Sharing"
description: "A practical, non-hype guide to packing a PDF into a self-contained locked HTML file, opening it locally, and updating access when the policy changes."
pubDate: "Jan 21 2026"
tags: ["maipdf", "offline", "pdf"]
---

<div class="intro-panel">
  <p>Sometimes you need to put a PDF <em>directly in someone's hands</em> instead of behind a link — restricted networks, training rooms, internal distribution. The answer is to pack the PDF as a <strong>locked HTML file</strong>: one self-contained file the recipient saves and opens in their browser. The viewer does a one-shot online license check at open time, so this is portable, not literally air-gapped.</p>
</div>

## At a glance

```mermaid
flowchart TD
  A[Upload PDF] --> B[Configure rules]
  B --> C[Pack & download locked HTML]
  C --> D[Recipient opens HTML; viewer license-checks online]
```

## Four steps

<div class="steps-container">
  <div class="step-card">
    <div class="step-number">1</div>
    <h3>Upload the PDF</h3>
    <p>Drag a PDF onto the upload zone. The file stays in your browser until you click <em>Pack</em>.</p>
    <img src="/offlinepages/upload_section_offline_maipdf.png" alt="Upload section">
  </div>
  <div class="step-card">
    <div class="step-number">2</div>
    <h3>Configure rules</h3>
    <p>Set open count, expiry, and optionally toggle a per-page watermark. That is the full set of pack-time settings.</p>
    <img src="/offlinepages/security_setting.png" alt="Rule settings">
  </div>
  <div class="step-card">
    <div class="step-number">3</div>
    <h3>Pack &amp; download</h3>
    <p>The server encrypts the PDF and returns a single self-contained HTML file (delivered as a thin ZIP wrapper). Save the License ID + Modification Code shown next to the download.</p>
    <img src="/offlinepages/result_download_zip_file.png" alt="Download result">
  </div>
  <div class="step-card">
    <div class="step-number">4</div>
    <h3>Recipient opens the HTML</h3>
    <p>They unzip the wrapper if needed, then double-click the HTML. The viewer hits the licensing endpoint once to validate, and renders the PDF. Internet is required at open time.</p>
    <img src="/offlinepages/click_html_inside_zip_to_view.png" alt="Open the locked HTML">
  </div>
</div>

<div class="intro-panel">
  <p><strong>Try it:</strong> open <a href="https://drm.maipdf.com/">drm.maipdf.com</a>, drop a PDF, click <em>Pack &amp; Download</em>. No signup required.</p>
</div>

