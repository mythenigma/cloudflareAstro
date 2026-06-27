<<<<<<< Updated upstream
---
title: "Offline PDF DRM for teams: distributing controlled HTML packages at scale"
description: "Team playbook for pack.html: admin workflow, recipient path, policy changes at scale, and when to escalate to .maipdf desktop packing."
pubDate: "Apr 1 2026"
updatedDate: "Jun 23 2026"
tags: ["Secure Share", "Locked HTML", "PDF DRM", "PDF package"]
author: "Alex Rivera"
heroImage: "/offlinepages/result_download_zip_file.png"
showDefaultCta: false
---

Enterprise and team leads ask for **offline PDF DRM** when the document **file** must sit on the recipient's laptop, USB, or internal share — while the sender keeps **revoke, expiry, and open limits** after delivery.

On MaiPDF, that usually means **web packing** at [pack.html](https://drm.maipdf.com/pack.html): PDF → AES encrypt → webpack HTML bundle → **ZIP**. Recipients open in a browser; each unlock phones home once.

**Important:** this article is **pack.html only**. `.maipdf` packing in the MaiPDF Secure **desktop app** is a separate, higher-security path for [prevent screenshot](/blog/en/prevent-screenshot-pdf-drm-native-app). Same license backend, different pipeline.

"Offline" means **portable file**, not **air-gapped**. Plan for internet at unlock.

---

## The deployable pattern

Three properties every team rollout needs:

1. **Pack as locked HTML** — one self-contained artifact per release (HTML inside ZIP).
2. **Bake rules at pack time** — open count and expiry enforced server-side on every unlock.
3. **Keep an update path** — License ID + Modification Code (or signed-in dashboard) for extend / revoke **without recalling files from every inbox**.

```mermaid
flowchart TB
  A[Prepare canonical PDF] --> B[Pack at pack.html]
  B --> C[Set open limit + expiry + watermark]
  C --> D[Distribute through approved channel]
  D --> E[Recipient opens HTML in browser]
  E --> F{Policy change?}
  F -->|Extend / revoke| G[Admin at /manage or dashboard]
  G --> E
  F -->|Content change| H[Repack new version + new license]
  H --> D
```

---

## Admin workflow (once per release)

### Upload

Drop the PDF on [pack.html](https://drm.maipdf.com/pack.html). Max 65 MB. Sign in with Google if you want dashboard management without storing Modification Codes in a spreadsheet.

![Upload screen](/offlinepages/upload_section_offline_maipdf.png)

### Configure rules

Align opens and expiry with the **review window**, not calendar defaults:

- Board pack for 8 people, 2 reads each → at least `16` opens, buffer to `24`
- External auditor, 5-day window → expiry = audit end + 1 day

![Rule settings](/offlinepages/security_setting.png)

### Pack and download

Save **License ID** and **Modification Code** from the result page. Store them in your release ticket.

![Download result](/offlinepages/result_download_zip_file.png)

---

## Recipient workflow (every time)

1. Save the ZIP or HTML from the approved channel.
2. **Extract** the HTML if delivered as ZIP.
3. Double-click → **Open · Unlock** in browser (network required).
4. Read in the same tab to avoid spending extra opens.

![Open locked HTML](/offlinepages/click_html_inside_zip_to_view.png)

---

## Policy changes without file recall

![Manage license](/offlinepages/result-check-change.png)

| Team scenario | What admins do |
|---|---|
| Contractor needs 3 more opens | Add opens via `/manage` or dashboard |
| Bid deadline extended | Push expiry |
| Employee offboarded mid-review | Revoke license — all copies die on next unlock |
| Leak suspected | Revoke immediately; issue new pack only to cleared list |
| PDF content updated | **Repack** — you cannot patch a locked HTML file in place |

---

## Locked HTML vs online link vs `.maipdf`

| | pack.html (this article) | maipdf.com link | `.maipdf` desktop app |
|---|---|---|---|
| Delivers | File | URL | File |
| Reader | Browser | Browser | Native app |
| Install | No | No | Yes |
| Prevent screenshot | No | No | Yes |
| Per-open analytics | Limited | Rich | License-focused |
| Best for | File must travel, no install | Fast share, swap behind link | Capture-sensitive PDFs |

**Escalation rule:** if legal or infosec asks for screenshot control, stop distributing via pack.html and move to the desktop app — do not argue that watermarks are "enough."

---

## Rollout checklist for IT / ops

- [ ] Standard recipient instruction block in the wiki (see [distribution best practices](/blog/en/offline-pdf-package-distribution-best-practices))
- [ ] Named owner per License ID
- [ ] Version naming convention for source PDFs
- [ ] Process for revoking when people leave
- [ ] Decision tree: pack.html vs `.maipdf` vs maipdf.com link
- [ ] Test pack on target browser before mass send

---

## Related

- [Complete pack guide](/blog/en/how-to-create-offline-pdf-package-complete-guide)
- [Distribution best practices](/blog/en/offline-pdf-package-distribution-best-practices)
- [Prevent screenshot (.maipdf)](/blog/en/prevent-screenshot-pdf-drm-native-app)

<div class="intro-panel">
  <p><strong>Pack one now:</strong> <a href="https://drm.maipdf.com/pack.html">pack.html</a> — drop a PDF, click <em>Pack &amp; Download</em>. Anonymous packs work; sign in for dashboard management.</p>
</div>
=======
---
title: "Offline PDF DRM for teams: distributing controlled packages at scale"
description: "How teams can distribute offline PDF packages (HTML-in-ZIP) with open limits and expiration, and keep an update path for access changes."
pubDate: "Apr 1 2026"
updatedDate: "Apr 1 2026"
tags: ["Offline PDF","PDF DRM","Enterprise Distribution","Access Control","H5"]
author: "Alex Rivera"
heroImage: "/offlinepages/result_download_zip_file.png"
---

<div class="intro-panel">
  <p>Enterprises talk about "offline PDF DRM" when they want to put the document <em>file itself</em> in the recipient's hands — instead of behind a link — while keeping sender-side control. The artifact still needs internet at open time to enforce the rules; "offline" here means <em>portable file you can hand over</em>, not <em>works air-gapped</em>.</p>
</div>

## The deployable pattern

<div class="feature-grid">
  <div class="feature-item">
    <h4>1. Pack as locked HTML</h4>
    <p>A single self-contained HTML file (delivered as a thin ZIP wrapper) — recipients save and double-click it.</p>
  </div>
  <div class="feature-item">
    <h4>2. Bake in the rules</h4>
    <p>Open count and expiration are set at pack time and enforced server-side at every open.</p>
  </div>
  <div class="feature-item">
    <h4>3. Keep an update path</h4>
    <p>License ID + Modification Code let admins extend, pause, or revoke after distribution — without recalling the file.</p>
  </div>
</div>

## Distribution model

```mermaid
flowchart TB
  A[Prepare PDF] --> B[Pack as locked HTML]
  B --> C["Set rules: open limit + expiration"]
  C --> D[Distribute file to recipients]
  D --> E[Recipient opens HTML; viewer does a one-shot online license check]
  E --> F{"Policy change needed?"}
  F -->|No| G[Done]
  F -->|Yes| H["Admin uses codes to check/update access"]
  H --> E
```

## What admins do (once)

<div class="steps-container">
  <div class="step-card">
    <div class="step-number">1</div>
    <h3>Upload the PDF</h3>
    <p>Drop the file onto the upload zone at <a href="https://drm.maipdf.com/">drm.maipdf.com</a>.</p>
    <img src="/offlinepages/upload_section_offline_maipdf.png" alt="Upload screen">
  </div>
  <div class="step-card">
    <div class="step-number">2</div>
    <h3>Configure rules</h3>
    <p>Set the open-count limit and the expiry timestamp. Optionally turn on per-page watermarks.</p>
    <img src="/offlinepages/security_setting.png" alt="Rule settings">
  </div>
  <div class="step-card">
    <div class="step-number">3</div>
    <h3>Pack &amp; download</h3>
    <p>Receive a single self-contained HTML file. Save the License ID + Modification Code shown on the result page — they unlock all future management.</p>
    <img src="/offlinepages/result_download_zip_file.png" alt="Download result">
  </div>
</div>

## What recipients do (every time)

<div class="steps-container">
  <div class="step-card">
    <div class="step-number">→</div>
    <h3>Save, open, unlock</h3>
    <p>Double-click the HTML. The viewer reaches the licensing endpoint, atomically checks the open count and expiry, and renders the PDF if the license is still valid. Internet is required at open time.</p>
    <img src="/offlinepages/click_html_inside_zip_to_view.png" alt="Open the locked HTML file">
  </div>
</div>

## Updates and policy changes

<div class="feature-grid">
  <div class="feature-item">
    <h4>Extend opens for a contractor</h4>
    <p>A reviewer needs 3 more opens to finish their cycle — add them from <code>/manage</code> using your codes. Next open enforces the new cap.</p>
  </div>
  <div class="feature-item">
    <h4>Check audit status</h4>
    <p>Confirm whether a packed file is still active, paused, or revoked — no recipient action required.</p>
  </div>
  <div class="feature-item">
    <h4>Revoke after delivery</h4>
    <p>If a recipient leaves or a leak is suspected, set the license to <code>revoked</code>. Every copy of the HTML stops opening on the next attempt.</p>
  </div>
</div>

![Use License ID + Modification Code to check or change access](/offlinepages/result-check-change.png)

## Locked HTML vs. online links

<div class="feature-grid">
  <div class="feature-item">
    <h4>Pick locked HTML when</h4>
    <p>The artifact must live with the recipient — USB, internal share, email attachment — and sender-side control needs to travel with it.</p>
  </div>
  <div class="feature-item">
    <h4>Pick an online link when</h4>
    <p>Recipients can reach the web reliably, and you want smoother UX, richer per-open analytics, or the ability to swap the underlying file without re-sending.</p>
  </div>
</div>

<div class="intro-panel">
  <p><strong>Pack one now:</strong> open <a href="https://drm.maipdf.com/">drm.maipdf.com</a>, drop a PDF, click <em>Pack &amp; Download</em>. No signup required.</p>
</div>

---

**Related:** [MaiPDF H5 (offline HTML) generation guide](/en/maipdf-h5-generation-guide) · [Offline vs online PDF sharing (comparison)](/en/offline-vs-online-pdf-sharing-comparison) · [PDF online DRM (complete guide)](/en/pdf-online-drm-complete-guide)

Please visit the blog index for available content.

[Go to Blog Index](/blog)
>>>>>>> Stashed changes
