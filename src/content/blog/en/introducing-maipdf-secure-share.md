---
title: "Introducing MaiPDF Secure Share on drm.maipdf.com"
description: "MaiPDF Secure Share is now live at drm.maipdf.com — pack a PDF as a single self-contained locked HTML file with AES-256-GCM encryption, open-count limits, expiry, and per-page watermarks. No signup required."
pubDate: "May 12 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["MaiPDF", "Secure Share", "PDF DRM", "Locked HTML", "Announcement"]
---

# Introducing MaiPDF Secure Share on drm.maipdf.com

<div class="intro-panel">
  <p>The protected-PDF side of MaiPDF now lives on its own subdomain: <a href="https://drm.maipdf.com/"><strong>drm.maipdf.com</strong></a>. You drop a PDF, set a few rules, and walk away with a <strong>single self-contained HTML file</strong> you can email, attach, drop on a USB stick, or send through any channel you already use. The recipient double-clicks it; their browser checks the license with our server once; the PDF appears inside the page. Revoke or extend access later from the same browser. No signup needed.</p>
</div>

![MaiPDF Secure Share — protect & share PDFs with DRM](/maipdf2026/offline/offlinedrm.png)

## What you get

<div class="feature-grid">
  <div class="feature-item">
    <h4>📦 One self-contained HTML file</h4>
    <p>The output is a single <code>.html</code> file (delivered in a thin ZIP wrapper). No app, no plugin, no recipient signup — opens in any modern browser.</p>
  </div>
  <div class="feature-item">
    <h4>🔐 AES-256-GCM, split-key</h4>
    <p>The PDF is encrypted with AES-256-GCM. We store only half of the key plus a license row — the PDF itself is never persisted on our server.</p>
  </div>
  <div class="feature-item">
    <h4>⏱️ Open count + expiry</h4>
    <p>Set how many opens the license allows and when it stops working. Both are enforced server-side and atomically.</p>
  </div>
  <div class="feature-item">
    <h4>💧 Per-page watermarks</h4>
    <p>Optional watermark overlay rendered by the viewer on each page — a forensic trail if a screenshot leaks.</p>
  </div>
  <div class="feature-item">
    <h4>🤖 Anti-automation chaff</h4>
    <p>The server returns 12 candidate keys with 11 random decoys to slow AI / bulk scrapers harvesting your file.</p>
  </div>
  <div class="feature-item">
    <h4>🌐 Browser-only viewer</h4>
    <p>The viewer renders inside the HTML — page nav, zoom, fit-to-width, fit-to-page, fullscreen, plus a remaining-opens badge.</p>
  </div>
</div>

## How to pack a PDF in four steps

![How to use MaiPDF Secure Share](/maipdf2026/offline/inststruct.png)

<div class="steps-container">
  <div class="step-card">
    <div class="step-number">1</div>
    <h3>Drop a PDF on the home page</h3>
    <p>Open <a href="https://drm.maipdf.com/">drm.maipdf.com</a> and drag a PDF (up to 65 MB) onto the upload zone. The file stays in your browser until you click <em>Pack</em>.</p>
  </div>
  <div class="step-card">
    <div class="step-number">2</div>
    <h3>Configure rules</h3>
    <p>Set the open-count limit and the expiry timestamp. Optionally turn on per-page watermarks or override the display filename your reader sees. That is the full set of pack-time settings.</p>
  </div>
  <div class="step-card">
    <div class="step-number">3</div>
    <h3>Click "🔐 Pack &amp; Download"</h3>
    <p>The server encrypts the PDF, generates a license, and hands back a single self-contained HTML file like <code>MaiPDF-SecureShare-yourdocument-locked.html</code>.</p>
  </div>
  <div class="step-card">
    <div class="step-number">4</div>
    <h3>Save your codes &amp; send</h3>
    <p>Two codes appear after packing: a <strong>License ID</strong> and a 26-character <strong>Modification Code</strong>. Store the Modification Code in a password manager — it is how you manage the license later without signing in. Then send the locked HTML through any channel you like.</p>
  </div>
</div>

## Two ways to manage your licenses

<div class="feature-grid">
  <div class="feature-item">
    <h4>🕶️ Anonymous</h4>
    <p>Pack without signing in. Save the License ID + 26-char Modification Code from the result page. Paste them at <a href="https://drm.maipdf.com/manage"><code>/manage</code></a> any time to check status, add opens, extend expiry, pause, resume, or delete the license. No account, no email.</p>
  </div>
  <div class="feature-item">
    <h4>🔑 Signed-in with Google</h4>
    <p>Sign in once with Google before packing, and every license you create shows up in the dashboard at <a href="https://drm.maipdf.com/dashboard"><code>/dashboard</code></a> with one-click controls. No code paste required — your Google session proves ownership.</p>
  </div>
</div>

## Honest about what it doesn't do

<div class="feature-grid">
  <div class="feature-item">
    <h4>✗ Not truly offline</h4>
    <p>The viewer must reach <code>drm.maipdf.com</code> once when the recipient clicks "Open · Unlock" to verify the license. Without internet at that moment, the file stays encrypted. Air-gapped readers cannot open it.</p>
  </div>
  <div class="feature-item">
    <h4>✗ Not unbreakable against devtools</h4>
    <p>The viewer must decrypt the PDF in the recipient's browser to render it. A determined reader with developer tools can capture that decrypted byte stream. The right-click block, print neutralization, and tab-blur shield are <em>user-experience friction, not unbreakable barriers</em>.</p>
  </div>
  <div class="feature-item">
    <h4>✗ Not screenshot-proof</h4>
    <p>Pixels on screen leave the system the moment they're displayed. Watermarks give a forensic trail; no browser-based DRM defeats a phone camera pointed at a monitor.</p>
  </div>
</div>

## How it compares to MaiPDF Online Share

![Online Sharing vs DRM](/maipdf2026/offline/two%20comparison.png)

<div class="feature-grid">
  <div class="feature-item">
    <h4>🔗 maipdf.com — Online Share</h4>
    <p><strong>What travels:</strong> a short link or QR code. The PDF is hosted on our cloud and viewed via the link. Continuous internet while reading; detailed per-open analytics; you can swap the file content behind the same link.</p>
    <p><strong>Best for:</strong> everyday documents, drafts in review, anything where you want a clickable link plus rich open logs.</p>
  </div>
  <div class="feature-item">
    <h4>📁 drm.maipdf.com — Secure Share</h4>
    <p><strong>What travels:</strong> a single self-contained HTML file. The PDF rides inside, encrypted. Internet needed only at open time. Open count and expiry are enforced; content cannot be swapped after packing.</p>
    <p><strong>Best for:</strong> sensitive or premium content where the artifact must live with the recipient and you still want to revoke or extend access after delivery.</p>
  </div>
</div>

## Built on Cloudflare

<div class="feature-grid">
  <div class="feature-item">
    <h4>⚡ Cloudflare Pages + Workers + D1</h4>
    <p>The site runs on Cloudflare's free tier. License checks are global-edge fast; the 65 MB upload cap is the Workers platform body-size limit, not an arbitrary choice.</p>
  </div>
  <div class="feature-item">
    <h4>🆓 Currently free</h4>
    <p>No paywall, no signup gate. If usage grows beyond the free tier, per-IP rate limits or paid tiers may appear — existing licenses will keep working with their existing codes.</p>
  </div>
  <div class="feature-item">
    <h4>🌍 Five languages</h4>
    <p>English, 中文, 日本語, Deutsch, Français — picked from a dropdown on every page, or auto-detected from your browser language.</p>
  </div>
</div>

<div class="intro-panel">
  <p><strong>Try it now:</strong> open <a href="https://drm.maipdf.com/">drm.maipdf.com</a>, drop a PDF, click <em>Pack &amp; Download</em>. No signup. For the full walkthrough and threat-model details, see the <a href="https://drm.maipdf.com/help">help page</a>.</p>
</div>
