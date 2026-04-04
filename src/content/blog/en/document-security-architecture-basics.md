---
title: "MaiPDF Settings Explained: Access Controls on the Upload Screen"
description: "Plain-English guide to every setting on the MaiPDF upload screen: access limit, session time, protection type, email verification, and read notification."
pubDate: "Apr 4 2026"
heroImage: "/maipdf2026/MaiPDF_settings_expiration_telegram.png"
tags: ["Document Security", "Security Architecture", "Encryption", "Access Control"]
showDefaultCta: true
---

# MaiPDF Settings Explained: Access Controls on the Upload Screen

<div class="intro-panel">
  <p>Every setting on the MaiPDF upload screen controls a different aspect of how your PDF can be accessed. Here's what each one does and when to use it.</p>
</div>

![Settings panel — all controls configured before generating the link](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

## The 5 configurable settings

### 1. Access Limit (view count)
Sets the maximum total number of times the link can be opened. Once the limit is reached, the link stops working for new visitors.

**Use when:** You know the audience size and want to prevent the link from spreading beyond it.

### 2. Expiry Date
The link becomes inactive on this date, regardless of how many views remain.

**Use when:** The document has a time window — proposals, review cycles, events.

### 3. Protection Type
Controls how the viewer can interact with the PDF:

| Type | What it does |
|------|-------------|
| **DynamoWatermark** | Stamps each page with a dynamic watermark tied to the viewer's session |
| **SecureView** | View-only; no download, no print |
| **FenceView** | Screenshot deterrent overlay (discourages but doesn't cryptographically block) |
| **Unrestricted** | No additional restrictions beyond the link policy |

### 4. Email Verification
Requires the viewer to enter their email and click a verification link before the PDF opens.

**Use when:** You want to identify who is accessing the document, not just count views.

![Email gate — viewer must verify before PDF loads](/maipdf2026/get_email_verification_before_read.jpg)

### 5. Read Notification (optional)
Sends you an email each time the document is opened.

**Use when:** You're tracking specific recipients (like sent proposals) and want real-time alerts.

## Recommended configurations

| Scenario | Limit | Expiry | Protection | Email verify |
|----------|-------|--------|-----------|-------------|
| Public handout | High | Optional | Unrestricted | Off |
| Client proposal | 10–20 | 7 days | SecureView | Off |
| Confidential draft | 5 | 3 days | DynamoWatermark | On |
| Enterprise policy doc | 50 | 30 days | DynamoWatermark | On |

---

**Related reading:**

- [Convert PDFs to Shareable Links](/blog/en/convert-pdfs-to-shareable-links) — the 3-step setup guide
- [PDF Temporary Sharing Links](/blog/en/pdf-temporary-sharing-link) — using expiry and view limits
- [Email Verification for PDF Access](/blog/en/email-verification-for-pdf-access) — email gate explained in depth
- [Prevent PDF Downloads: Complete Guide](/blog/en/prevent-pdf-downloads-complete-guide-view-only-sharing) — SecureView details
