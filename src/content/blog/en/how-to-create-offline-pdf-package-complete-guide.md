<<<<<<< Updated upstream
---
title: "How to Create a Locked HTML PDF Package (Complete Guide)"
description: "Full walkthrough: pack a PDF at drm.maipdf.com/pack.html (PDF→encrypted HTML→ZIP), send it, manage licenses, and know the limits vs .maipdf desktop packing."
pubDate: "Feb 11 2026"
updatedDate: "Jun 23 2026"
heroImage: "/offlinepages/offline-MaiPDF-Home-Page.png"
tags: ["Secure Share", "Locked HTML", "PDF package", "PDF DRM"]
showDefaultCta: false
---

This guide covers **Secure Share web packing** at [drm.maipdf.com/pack.html](https://drm.maipdf.com/pack.html).

You upload a PDF in the browser. The tool encrypts it, webpack bundles a locked HTML viewer, and you download a **ZIP** containing that HTML file. The recipient saves the file, opens it in a browser, and the viewer calls the license server once before rendering the PDF.

**Scope:** this is the **pack.html** workflow only. It is **not** `.maipdf` packing in the MaiPDF Secure desktop app — that is a different pipeline with OS-level screenshot blocking. If you need [prevent screenshot](/blog/en/prevent-screenshot-pdf-drm-native-app), stop here and use the desktop app instead.

---

## When a locked HTML package makes sense

Use web packing when the **file itself** must travel with the recipient, but you still want server-enforced rules:

- **Email attachment or USB** — internal policy blocks hosted links, but browsers still work.
- **Training room handout** — one file per seat; device is online at the moment of opening even if the room has spotty Wi‑Fi later.
- **Contractor or partner review** — you need to **revoke or extend** after the file left your inbox, without chasing every copy.
- **No install rule** — recipients will not install MaiPDF Secure or any other reader.

"Offline" in older MaiPDF posts means **portable file you hand over**, not **works air-gapped**. Every unlock still needs internet for the license check.

---

## Before you pack

1. **Freeze the PDF version** — `Proposal_v2026-03-15.pdf`, not `final_FINAL2.pdf`. You cannot edit a packed file; a content change means repack and redistribute.
2. **Size check** — pack.html accepts up to **65 MB** per file.
3. **Decide open budget** — a five-person panel with two opens each needs at least `10` opens, plus buffer for retries and mobile re-opens. Use `-1` only when you truly mean unlimited.
4. **Pick expiry** — match a real review window (e.g. bid deadline + 48 hours), not "never" by default.
5. **Optional: sign in** — if you pack while signed in with Google, licenses appear in the [dashboard](https://drm.maipdf.com/dashboard) and you can manage without saving the Modification Code.

---

## Pack step by step

### 1. Open the packer

Go to [drm.maipdf.com/pack.html](https://drm.maipdf.com/pack.html). The page explains the difference from [maipdf.com](https://www.maipdf.com) link sharing: here you get a **file**, not a URL.

### 2. Upload the PDF

Drag the file onto the upload zone or click to browse. The PDF stays in your browser until you click **Pack & Download** — it is not uploaded to our servers as a stored copy.

![Upload zone at pack.html](/offlinepages/upload_section_offline_maipdf.png)

### 3. Set rules

| Setting | What it does | Practical tip |
|---|---|---|
| **Max opens** | Each **Unlock** click calls the server and decrements the counter | Size to `(people × expected opens per person) × 1.5` |
| **Expiration** | License dies at this time even if opens remain | Shorter for sensitive drafts |
| **Watermark** | Stamps license ID + open timestamp on every page | Helps trace leaks; does **not** stop screenshots |
| **Display filename** | Optional label shown to the reader | Use a neutral name, not internal codenames |

![Open limit, expiry, watermark](/offlinepages/security_setting.png)

### 4. Pack and download

Click **Pack & Download**. You receive a ZIP (thin wrapper) containing something like `MaiPDF-SecureShare-yourfile-locked.html`.

**Before you close the result tab**, copy:

- **License ID** (reading code) — you can share this with support; it is not secret.
- **Modification Code** — **26 characters, treat like a password.** Anyone with it can extend, revoke, or delete the license.

![Download result with codes](/offlinepages/result_download_zip_file.png)

### 5. Test yourself

On the same OS and browser your recipients use:

1. Unzip if needed.
2. Double-click the HTML.
3. Click **Open · Unlock**.
4. Confirm the PDF renders and the open counter moves.

If this fails on your machine, it will fail for them.

### 6. Send to recipients

Distribute the ZIP or extracted HTML through your approved channel. Include short instructions (see [distribution best practices](/blog/en/offline-pdf-package-distribution-best-practices)).

**Do not** attach the raw PDF in the same email — you just bypassed the control.

### 7. Recipient opens the file

1. Save locally.
2. Unzip the wrapper if the OS does not auto-extract.
3. Double-click the HTML file (Chrome, Edge, Firefox, Safari — any modern browser).
4. Click **Open · Unlock**.
5. Browser contacts drm.maipdf.com; if the license is valid, the PDF renders inside the page. Leave the tab open — each new **Unlock** costs another open.

![Recipient unlock flow](/offlinepages/click_html_inside_zip_to_view.png)

### 8. Change rules after send

Paste **License ID + Modification Code** at [drm.maipdf.com/manage](https://drm.maipdf.com/manage), or use the dashboard if you packed while signed in.

![Manage opens and expiry](/offlinepages/result-check-change.png)

Common admin actions:

- **Add opens** — contractor ran out mid-review.
- **Extend expiry** — deadline slipped one week.
- **Revoke** — leak suspected; every copy fails on the next unlock attempt.
- **Hard delete** — remove license metadata entirely.

---

## What happens under the hood

The packer page documents this explicitly:

1. Generate a per-file **AES-GCM-256** key.
2. **Split the key** — one half embedded in the HTML bundle, one half stored on the server (Cloudflare D1).
3. Encrypt the PDF bytes; **webpack** bundles ciphertext + viewer into one self-contained HTML file.
4. Deliver inside a **ZIP** download.

We do **not** keep a copy of your PDF after packing — only license row + server key half. Without both halves, neither side can decrypt.

---

## What you get

- One portable artifact — no recipient signup, no plugin.
- **Server-side enforcement** — open count and expiry are atomic; exhausted licenses fail on every copy of the file.
- **Post-delivery control** — revoke or extend without recalling the attachment from every inbox.
- **Optional watermark** for leak tracing after the fact.

## What you do not get

- **Air-gapped reading** — internet required at unlock. Field laptops with zero connectivity will not open the file.
- **Prevent screenshot** — pixels leave the browser; watermarks help identify leaks, not block capture.
- **DevTools-proof viewing** — a technical reader can extract decrypted bytes during a successful open. The viewer blocks right-click and common shortcuts; that is friction, not a cryptographic guarantee.
- **Native DRM parity** — this is not `.maipdf`. Do not send a contract through pack.html and expect the same protection as the desktop app.

| | Web pack (this guide) | `.maipdf` + desktop app |
|---|---|---|
| Output | HTML in ZIP | `.maipdf` |
| Reader | Browser | MaiPDF Secure only |
| Prevent screenshot | No | Yes (OS-level) |
| DevTools extraction risk | Yes | Much lower |
| Revoke after send | Yes | Yes |

---

## Operational checklist

- Version-name source PDFs; repack when content changes — do not ask recipients to "ignore page 7."
- Maintain a spreadsheet: **who received which License ID**, pack date, expiry, owner for revocation.
- Tell recipients explicitly: **extract ZIP before opening** — opening HTML inside the archive fails on many systems.
- For sensitive material, use **short expiry** even if opens remain.
- If screenshot matters, switch to [.maipdf + desktop app](/blog/en/prevent-screenshot-pdf-drm-native-app) — do not stretch this workflow.

---

## FAQ

**Is pack.html free?** Yes, currently. Anonymous packs work; signing in attaches licenses to your account.

**Same license server as .maipdf?** Yes — but the **packing code and security model differ**. Shared backend ≠ same product.

**Why did my recipient lose an open?** Each **Unlock** is a server round-trip. Closing the tab and unlocking again spends another open. Tell readers to keep one tab open while reading.

**Lost Modification Code?** Anonymous packs cannot be managed without it. Pack while signed in, or store codes in a password manager / ticket system.

**vs maipdf.com link?** Links are faster and give richer per-open analytics. Web pack is for when the **file** must live on the recipient's device with expiry and open caps baked in.

---

## Related

- [Short 4-step pack walkthrough](/blog/en/how-to-create-offline-pdf-package-guide)
- [Distribution best practices](/blog/en/offline-pdf-package-distribution-best-practices)
- [Team-scale rollout](/blog/en/offline-pdf-drm-enterprise-solution)
- [Prevent screenshot — desktop `.maipdf`](/blog/en/prevent-screenshot-pdf-drm-native-app)

<div class="cta-container">
  <a href="https://drm.maipdf.com/pack.html" target="_blank" rel="noopener noreferrer" class="cta-button">
    Open Secure Share packer
  </a>
</div>
=======
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
>>>>>>> Stashed changes
