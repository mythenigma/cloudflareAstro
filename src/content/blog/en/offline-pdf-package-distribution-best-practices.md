<<<<<<< Updated upstream
---
title: "Locked HTML package distribution: best practices"
description: "Release-process guide for web-packed PDFs from pack.html: checklist, channels, recipient template, failure modes, license management."
pubDate: "Feb 11 2026"
updatedDate: "Jun 23 2026"
heroImage: "/offlinepages/result_download_zip_file.png"
tags: ["Secure Share", "Locked HTML", "PDF package"]
showDefaultCta: false
---

Most distribution failures with locked HTML packages come from a **weak release process**, not from the packer itself. Treat each pack like a small software release: named version, owner, channel, and explicit assumptions about **network at unlock**.

This article covers **pack.html** output (PDF → encrypt → HTML → ZIP). Distributing **`.maipdf`** from the desktop app follows the same release discipline but a different recipient path — see [prevent screenshot guide](/blog/en/prevent-screenshot-pdf-drm-native-app).

![Pack download result](/offlinepages/result_download_zip_file.png)

---

## Pre-distribution checklist

Before you send to anyone outside your team:

| Check | Why it matters |
|---|---|
| Open the packed file yourself end-to-end | Catches bad PDFs, wrong rules, and browser quirks early |
| Match browser to audience | Chrome-only shops break if you only tested Safari |
| Confirm network at unlock | Air-gapped recipients will always fail — plan around this |
| Save License ID + Modification Code | No codes = no revoke for anonymous packs |
| Name an **owner** for extensions and revocations | "Someone on the team has the code" is not a process |
| Write a one-paragraph recipient instruction | Stops "it won't open" tickets |

---

## Distribution channels

| Method | Strength | Caveat |
|---|---|---|
| Secure file transfer (SFTP, managed send) | Audit trail, controlled handoff | Recipient friction |
| Internal shared drive | Easy for employees | Version drift if multiple packs float around |
| Email attachment | Familiar | Size limits; train people not to open inside ZIP |
| USB / physical media | Works when delivery site has no network | **Still needs network at unlock** |
| Ticket / portal upload | Good for contractors | Pair with explicit unlock instructions |

Pick one **canonical channel** per release. Mixed channels multiply version confusion.

---

## Recipient instructions — copy and paste

Send this block with the file:

> 1. Save the attached ZIP to your computer.  
> 2. **Unzip** it and locate the `.html` file inside.  
> 3. Double-click the HTML file to open it in your browser.  
> 4. Click **Open · Unlock**. You need internet at this step.  
> 5. Keep the browser tab open while reading — clicking Unlock again uses another open.  
> 6. If you see "exhausted" or "license not found", contact [sender name/email] — they can extend or reissue.

Adjust step 4 if your org standardizes on one browser.

---

## License management after send

Use [drm.maipdf.com/manage](https://drm.maipdf.com/manage) or the signed-in dashboard:

![Extend opens or revoke](/offlinepages/success_example_offline_file_change.png)

| Situation | Action |
|---|---|
| Reviewer needs 3 more opens | Add opens via Modification Code |
| Deadline extended one week | Push expiry |
| Contractor offboarded | Revoke — every copy fails next unlock |
| Wrong PDF packed | Revoke old license; pack and send new file with new codes |

Keep a simple log:

| License ID | Version | Sent to | Date | Expiry | Owner |
|---|---|---|---|---|---|
| `abc…` | Proposal_v3 | Legal panel | 2026-03-01 | 2026-03-15 | Alex |

---

## Frequent failure modes

**Mixed versions in flight** — Recipient A has `v2`, Recipient B still has `v1` after you revoked `v1`. Fix: one canonical pack per release; communicate "disregard previous attachment."

**Opened HTML inside the ZIP** — Common on Windows. The viewer cannot load embedded assets correctly. Fix: instructions must say **extract first**.

**Lost Modification Code** — Anonymous packs become unmanageable. Fix: pack while signed in, or store codes in 1Password / ticket system.

**Air-gapped machine** — License check fails 100% of the time. Web HTML pack is the wrong tool; negotiate network access at open or use a different delivery model.

**Attached raw PDF too** — Recipient reads the unprotected copy. Fix: send only the locked package.

**Treating web pack like `.maipdf`** — Expecting screenshot block. Fix: [desktop app](/blog/en/prevent-screenshot-pdf-drm-native-app) for capture-sensitive material.

---

## Sizing opens and expiry

Rules of thumb for web HTML packs:

- **Panel review:** `people × 2` opens minimum (one unlock + one accidental retry per person)
- **Mobile-heavy audience:** multiply by `1.5` — readers sometimes trigger extra unlocks
- **Long-lived reference:** longer expiry, tighter open cap — not unlimited both
- **Sensitive draft:** short expiry (3–7 days) even if opens remain

---

## Related

- [Complete pack guide](/blog/en/how-to-create-offline-pdf-package-complete-guide)
- [Team rollout patterns](/blog/en/offline-pdf-drm-enterprise-solution)
- [4-step pack walkthrough](/blog/en/how-to-create-offline-pdf-package-guide)
=======
---
title: "Offline PDF Package Distribution: Best Practices for Secure Offline Document Sharing"
description: "Operational best practices for distributing offline PDF packages securely and consistently across recipients."
pubDate: "Feb 11 2026"
heroImage: "/offlinepages/result_download_zip_file.png"
tags: ["Offline PDF", "Package Distribution", "Document Sharing", "Offline Sharing", "Best Practices", "offline"]
---

# Locked HTML Package Distribution: Best Practices for Secure Document Sharing

<div class="intro-panel">
  <p>Most distribution issues with locked HTML packages come from <em>weak release process</em>, not from packing itself. Treat distribution like a small release: version, owner, channel, and an explicit assumption about network access at open time.</p>
</div>

![Locked HTML download](/offlinepages/result_download_zip_file.png)

## Pre-distribution checklist

<div class="feature-grid">
  <div class="feature-item">
    <h4>Open the file yourself first</h4>
    <p>Confirm the packed version actually opens end-to-end before sending it to anyone.</p>
  </div>
  <div class="feature-item">
    <h4>Define the validity window</h4>
    <p>Decide open count + expiry up-front. Name the update owner who can revoke or extend later.</p>
  </div>
  <div class="feature-item">
    <h4>Confirm network at open time</h4>
    <p>Recipients need internet when they open the file — the license check requires it.</p>
  </div>
  <div class="feature-item">
    <h4>Prepare one-paragraph instructions</h4>
    <p>Tell them: save the file, unzip if needed, double-click the HTML, click Open · Unlock.</p>
  </div>
</div>

## Distribution methods

| Method | Strength | Caveat |
|---|---|---|
| Secure file transfer | Controlled handoff, audit trail | Recipient friction |
| Internal shared drive | Team convenience | Version drift if unmanaged |
| Physical transfer media (USB) | Network-independent at the moment of delivery | The recipient still needs internet at open time for the license check |

## Recipient instruction template

<div class="steps-container">
  <div class="step-card">
    <div class="step-number">1</div>
    <h3>Save the file locally</h3>
    <p>Download or copy it from wherever you received it — email, shared drive, USB.</p>
  </div>
  <div class="step-card">
    <div class="step-number">2</div>
    <h3>Unzip if needed</h3>
    <p>If your OS does not auto-extract, unzip the thin wrapper to reach the HTML file inside.</p>
  </div>
  <div class="step-card">
    <div class="step-number">3</div>
    <h3>Open in a browser</h3>
    <p>Double-click the HTML. Click "Open · Unlock" in the protected view that appears.</p>
  </div>
  <div class="step-card">
    <div class="step-number">4</div>
    <h3>Confirm internet</h3>
    <p>The viewer does a one-shot license check on open. Without internet at that moment, the file will not open.</p>
  </div>
  <div class="step-card">
    <div class="step-number">5</div>
    <h3>Contact support if blocked</h3>
    <p>If you see "License not found" or "exhausted", reach out to the sender — they can extend or reissue.</p>
  </div>
</div>

## Frequent failure modes

<div class="feature-grid">
  <div class="feature-item">
    <h4>⚠️ Mixed versions in flight</h4>
    <p>Different recipients hold different packed versions; some get revoked content. Repack and reissue one canonical version.</p>
  </div>
  <div class="feature-item">
    <h4>⚠️ Recipient opens inside the ZIP</h4>
    <p>The file fails to open. Tell them explicitly to extract first.</p>
  </div>
  <div class="feature-item">
    <h4>⚠️ No owner for revocations</h4>
    <p>The Modification Code is lost or unowned, leaving no way to revoke. Park it in a managed location.</p>
  </div>
  <div class="feature-item">
    <h4>⚠️ Air-gapped recipient</h4>
    <p>Distributing to an environment with zero internet means the license check will always fail. Plan around this up-front.</p>
  </div>
</div>

<div class="intro-panel">
  <p><strong>Bottom line:</strong> Locked HTML distribution should be treated like release management — controlled versioning, clear owner, clear recipient path, and an explicit assumption about network access at open time. Pack once on <a href="https://drm.maipdf.com/">drm.maipdf.com</a>, distribute through approved channels, and manage the license life-cycle from <code>/manage</code> or the dashboard.</p>
</div>
>>>>>>> Stashed changes
