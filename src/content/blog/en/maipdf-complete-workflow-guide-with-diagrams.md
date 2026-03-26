---
title: "MaiPDF complete workflow guide (2026): Upload → Configure → Share, with diagrams"
description: "A practical end-to-end guide to turning a PDF into a controlled share link or QR code—expiration, access limits, session time, viewing modes, watermark, verification, and file replacement."
pubDate: "Mar 26 2026"
updatedDate: "Mar 26 2026"
tags: ["PDF Sharing","Secure Sharing","Document Control","PDF DRM","QR Code","Workflow"]
author: "Alex Rivera"
heroImage: "/maipdf2026/show_off/en-pdf-sharing-workflow-animation.svg"
---

MaiPDF’s core idea is simple: **the file stays a file, but sharing becomes a controlled link**.

Instead of sending large attachments (or leaving a PDF in a public folder), you publish a link that honors rules like:

- **Expiration** (time-based)
- **Access limit** (view/open cap)
- **Each session** reading time (per-open time box)
- **Viewing mode**: **SecureView**, **FenceView**, or **Unrestricted**
- Optional **dynamic watermark**, **email verification**, and **Telegram read alerts**

The whole flow is **Upload → Configure → Share**.

## The full workflow (diagram)

```mermaid
flowchart TB
  A[Upload PDF] --> B[Configure rules]
  B --> C[Create share link / QR]
  C --> D[Send to recipients]
  D --> E[They open in browser]
  E --> F{Need to update or revoke?}
  F -->|Check access records| G[Query reading history]
  F -->|Replace file| H[Swap file while keeping link]
  F -->|Tighten controls| I[Adjust settings]
  F -->|Done| J[Let it expire / close out]
```

![Overview: upload, settings, then link and QR](/maipdf2026/show_off/en-pdf-sharing-workflow-animation.svg)

## Step 1: Upload

Upload the PDF you want to share.

![Upload entry: sign in or upload to start sharing](/maipdf2026/maipdf_header_login_or_upload_file.png)

## Step 2: Configure (the controls that matter)

This is where “a URL” becomes “a controlled PDF link.”

### Core controls

- **Expiration**: end access automatically after a date / duration
- **Access limit**: cap total opens/reads
- **Each session**: limit reading time per open

![Configure: limits, session length, expiry, Telegram, email verification](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

### Viewing modes (how the PDF is displayed)

- **SecureView**: strongest protection, designed to reduce casual copying
- **FenceView**: adds a visible “fence” layer to deter screenshots/recording
- **Unrestricted**: easiest viewing for public/low-risk documents

If you need to show the “no print / no download” style viewer UI:

![Protected viewer: no print and no download](/maipdf2026/show_off/viewercontainer_noprint_nodownlaod.png)

### Optional hardening (use when the audience is strict)

- **Dynamic watermark**: overlay viewer context so leaked screenshots are less useful
- **Email verification**: only specific recipients can open the PDF
- **Telegram read alerts**: get notified when people open/read

![Email verification: only specified recipients can receive](/maipdf2026/show_off/email%20verify.png)

## Step 3: Share (link + QR)

When configuration is done, generate the link and (optionally) a QR code.

![Link and QR result after creating a share](/maipdf2026/Result_of_qr_link.png)

### Large access limits caveat

If **Access limit** is above **10,000**, the link can behave like it’s effectively public, and **access records may not be logged**. Use a limit that matches your real audience.

## Access records (reading history)

For audits and follow-ups, you can check when/where the PDF was opened by using the codes on the share page.

![Access records: where to enter reading and modification code](/maipdf2026/how_to_fill_access_record_for_check.png)

## Replace the file (without changing the share experience)

When you update a proposal deck, syllabus, or product sheet, you often want the **same “share channel”** to point to the newest version.

MaiPDF supports swapping/replacing the file via the control panel, so you don’t have to resend a brand-new link every time.

![Swap/replace file from the user control panel](/maipdf2026/swap_file_easy_in_user_control_panel.png)

### Replace flow (diagram)

```mermaid
flowchart LR
  A[Share link is sent] --> B[PDF needs a new version]
  B --> C[Replace file / import settings]
  C --> D[Recipients open the same link]
  D --> E[They see the updated PDF]
```

---

**Related:** [Secure PDF links](/en/secure-pdf-links) · [Host a PDF online for secure sharing](/en/host-pdf-online-secure-sharing-guide) · [PDF to QR](/en/pdf-to-qr)
