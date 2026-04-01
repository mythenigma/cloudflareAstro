---
title: "Limit PDF views with DRM-style controls: a practical setup"
description: "A step-by-step way to share a PDF with view limits, session time, expiration, optional email verification, and access records—without emailing attachments."
pubDate: "Apr 1 2026"
updatedDate: "Apr 1 2026"
tags: ["PDF DRM","View Limit","Expiration","Secure Sharing"]
author: "David Chen"
heroImage: "/maipdf2026/Result_of_qr_link.png"
---

If you’re trying to “add DRM” to a PDF, most of the time you’re really trying to do one of these:

- **Cap how many times it can be opened**
- **Make it expire**
- **Restrict who can access it**

This guide shows a clean, link-based way to do that.

## Step 1: Upload

![Upload entry: sign in or upload to start sharing](/maipdf2026/maipdf_header_login_or_upload_file.png)

## Step 2: Configure view limits (and the two controls people forget)

Set:

- **Access limit**: total opens allowed
- **Each session**: time allowed per open
- **Expiration**: end access by date/days

![Configure: access limit, each session, expiration](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

### Optional: require email verification

If the audience must be specific, add verification so a forwarded link isn’t enough.

![Email verification before reading PDF](/maipdf2026/get_email_verification_before_read.jpg)

## Step 3: Share link + QR

![Link and QR result after creating a share](/maipdf2026/Result_of_qr_link.png)

## Access records (when you need accountability)

If you need proof of opening activity, use the access-record page and codes.

![Access records: where to enter reading and modification code](/maipdf2026/how_to_fill_access_record_for_check.png)

## Workflow diagram

```mermaid
flowchart TB
  A[Upload PDF] --> B["Configure: access limit, each session, expiration"]
  B --> C["Optional: email verification + watermark + view mode"]
  C --> D["Share link or QR"]
  D --> E[Viewer opens in browser]
  E --> F{"Rules satisfied?"}
  F -->|Yes| G[Allow viewing]
  F -->|No| H[Stop access / ask for updated link]
```

## Notes for realistic expectations

- View limits are a **sharing control**, not a guarantee against screenshots.
- For better deterrence, use protected viewer modes and watermarking.

![Protected viewer: no print and no download](/maipdf2026/show_off/viewercontainer_noprint_nodownlaod.png)

### Large access limits caveat

If **Access limit** is above **10,000**, behavior can trend toward an effectively public link and **access records may not be logged**.

---

**Related:** [How to generate secure PDF links for sharing](/en/secure-pdf-links) · [Host a PDF online for secure sharing](/en/host-pdf-online-secure-sharing-guide) · [PDF access control: view limits and expiration](/en/pdf-access-control-view-limits-expiration)
