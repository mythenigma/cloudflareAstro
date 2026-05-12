---
title: "How to Create a Locked HTML PDF Package: Complete Guide"
description: "Practical guide to packing a PDF as a self-contained locked HTML file, including packaging steps, recipient instructions, and honest limits."
pubDate: "Feb 11 2026"
heroImage: "/offlinepages/offline-MaiPDF-Home-Page.png"
tags: ["Offline PDF", "PDF Package", "Locked HTML", "DRM PDF", "offline"]
---

# How to Create a Locked HTML PDF Package: Complete Guide

<div class="intro-panel">
  <p>A locked HTML package is useful when you want the recipient to hold the <em>file itself</em> rather than a link — but it still needs internet at open time for the license check, so plan for that.</p>
</div>

![Packaging home](/offlinepages/offline-MaiPDF-Home-Page.png)

## When packaging makes sense

<div class="feature-grid">
  <div class="feature-item">
    <h4>Artifact lives with the recipient</h4>
    <p>The file needs to sit on a laptop, USB stick, or internal share — not behind a hosted link.</p>
  </div>
  <div class="feature-item">
    <h4>Intermittent connectivity</h4>
    <p>Training rooms or field ops where the device is online <em>at the moment of opening</em>, even if not continuously.</p>
  </div>
  <div class="feature-item">
    <h4>Sender wants lasting authority</h4>
    <p>You want to revoke, pause, or extend access <em>after</em> delivery — without recalling the file.</p>
  </div>
</div>

## Packaging workflow

<div class="steps-container">
  <div class="step-card">
    <div class="step-number">1</div>
    <h3>Finalize the source PDF</h3>
    <p>Pack from the version you actually want recipients to read — content cannot be edited after packing.</p>
  </div>
  <div class="step-card">
    <div class="step-number">2</div>
    <h3>Pack with rules baked in</h3>
    <p>Set open count, expiry, and optional per-page watermark. The server encrypts the PDF and returns a single self-contained HTML file.</p>
  </div>
  <div class="step-card">
    <div class="step-number">3</div>
    <h3>Test on a real device</h3>
    <p>Open the locked HTML on the same browser profile recipients will use, with a real network. Confirm "Open · Unlock" works end-to-end.</p>
  </div>
  <div class="step-card">
    <div class="step-number">4</div>
    <h3>Distribute</h3>
    <p>Send through approved channels — email, internal share, USB. The recipient saves the file and opens it in their browser.</p>
  </div>
  <div class="step-card">
    <div class="step-number">5</div>
    <h3>Keep the credentials</h3>
    <p>Save the <strong>License ID</strong> + <strong>Modification Code</strong> shown after packing. They are how you revoke or extend later.</p>
  </div>
</div>

## What a locked HTML package gives you

<div class="feature-grid">
  <div class="feature-item">
    <h4>✓ One portable artifact</h4>
    <p>Opens in any modern browser — no app, no plugin, no recipient signup.</p>
  </div>
  <div class="feature-item">
    <h4>✓ Rules enforced server-side</h4>
    <p>Open count and expiry are atomic on the server; once exhausted, every copy stops working.</p>
  </div>
  <div class="feature-item">
    <h4>✓ Post-delivery control</h4>
    <p>Revoke, pause, or extend access after delivery without re-sending the file.</p>
  </div>
</div>

## What it does <em>not</em> give you

<div class="feature-grid">
  <div class="feature-item">
    <h4>✗ Truly offline reading</h4>
    <p>The viewer needs internet at open time. Air-gapped readers cannot open the file.</p>
  </div>
  <div class="feature-item">
    <h4>✗ Defense against screenshots</h4>
    <p>Pixels on screen leave the system. Watermarks give a forensic trail, not a stop.</p>
  </div>
  <div class="feature-item">
    <h4>✗ Defense against devtools</h4>
    <p>A determined reader with browser developer tools can capture the decrypted PDF stream during a successful open.</p>
  </div>
</div>

## Operational best practices

- Use short expiry windows for sensitive content.
- Version-name the source PDF clearly (`DocName_vDate`) and repack when content changes.
- Maintain a list of who got which License ID, so revocations are targeted.

<div class="intro-panel">
  <p><strong>Bottom line:</strong> A locked HTML package works best when treated as a planned distribution artifact with a defined lifecycle — not as an unrestricted file dump, and not as a magic offline reader. The "offline" in "offline package" means <em>portable file you can hand over</em>, not <em>works air-gapped</em>.</p>
</div>
