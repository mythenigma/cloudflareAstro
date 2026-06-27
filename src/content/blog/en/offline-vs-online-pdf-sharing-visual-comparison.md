<<<<<<< Updated upstream
---
title: "MaiPDF sharing models (visual)"
description: "Online link vs pack.html web HTML vs .maipdf desktop app."
pubDate: "Jan 15 2026"
updatedDate: "Jun 23 2026"
tags: ["Secure Share", ".maipdf", "Locked HTML"]
showDefaultCta: false
---

Three paths — different security tiers.

![Sharing models](/diagram/en/offline-vs-online-pdf-comparison.svg)

| Path | What travels | Prevent screenshot? |
|---|---|---|
| Online link | URL | No |
| pack.html web pack | HTML in ZIP | No |
| Desktop app | `.maipdf` | Yes |

**Online link** — [maipdf.com](https://maipdf.com/), analytics, easy revoke.

**Web HTML pack** — [pack.html](https://drm.maipdf.com/pack.html), no install, browser limits.

**Desktop app** — [drm.maipdf.com](https://drm.maipdf.com/), portable file, OS-level capture control.
=======
---
title: "Offline vs Online PDF Sharing (Visual Comparison)"
description: "A short visual comparison of offline PDF packages vs online PDF links—when each makes sense."
pubDate: "Jan 15 2026"
tags: ["Offline PDF", "Online Sharing", "PDF Security", "Diagrams"]
---

# Locked HTML vs. Online PDF Sharing (Visual Comparison)

<div class="intro-panel">
  <p>Online sharing is best for <strong>live updates and per-open analytics</strong>. A locked HTML package is best when the file itself needs to live with the recipient. Neither path is truly offline — both rely on a network check to enforce rules.</p>
</div>

![File-vs-link PDF comparison](/diagram/en/offline-vs-online-pdf-comparison.svg)

## Side-by-side

<div class="feature-grid">
  <div class="feature-item">
    <h4>🔗 Online sharing</h4>
    <p><strong>What travels:</strong> a short link or QR code.</p>
    <p><strong>Strengths:</strong> identity verification, view limits, expiry, detailed open logs, swap the file content without re-sending.</p>
  </div>
  <div class="feature-item">
    <h4>📁 Locked HTML package</h4>
    <p><strong>What travels:</strong> a single self-contained file (laptop, USB, attachment).</p>
    <p><strong>Strengths:</strong> sender-side control travels with the artifact; predictable browser-based reading with internet only needed at open time.</p>
  </div>
</div>

<div class="intro-panel">
  <p><strong>Try them:</strong> <a href="https://maipdf.com/">maipdf.com</a> for online links · <a href="https://drm.maipdf.com/">drm.maipdf.com</a> for locked HTML packages.</p>
</div>

>>>>>>> Stashed changes
