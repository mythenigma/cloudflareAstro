---
title: "Locked HTML package distribution: best practices"
description: "Release-process guide for web-packed PDFs from pack.html: checklist, channels, recipient template, failure modes, license management."
pubDate: "Feb 11 2026"
updatedDate: "Jun 23 2026"
heroImage: "/offlinepages/result_download_zip_file.png"
tags: ["Secure Share", "Locked HTML", "PDF package"]
showDefaultCta: false
noindex: true

---

> **Product direction note:** HTML package / PDF-to-HTML content is now de-emphasized. For current MaiPDF protected-reading workflows, prefer Online Cloud Sharing for fast browser links and App DRM / `.maipdf` for screenshot-aware protection, device binding, revocation, and protected reader controls.

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
