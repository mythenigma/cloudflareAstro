---
title: "MaiPDF H5 (offline HTML) generation guide: make a protected offline package"
description: "Generate an offline H5/HTML package from a PDF, so people can read locally while you still enforce open limits and expiration."
pubDate: "Mar 26 2026"
updatedDate: "Mar 26 2026"
tags: ["Offline PDF","H5","HTML Package","PDF DRM","Document Sharing"]
author: "David Chen"
heroImage: "/offlinepages/offline-MaiPDF-Home-Page.png"
---

“H5 generation” here means: **turn a PDF into an offline HTML package** (usually a ZIP) that a recipient can open locally in a browser. This is useful when:

- **Email / messenger blocks large attachments**
- **Recipients need offline viewing** (train, flight, remote sites)
- You still want **open limits** and **expiration** instead of a permanently forwarded PDF

This guide uses the same mental model as the online flow: **Upload → Configure → Download**.

## 1) Upload the PDF

Start by uploading the PDF you want to protect.

![Offline upload screen: upload your PDF file](/offlinepages/upload_section_offline_maipdf.png)

## 2) Configure offline protections (DRM)

Set the rules that will be embedded into the offline package.

- **Open limit**: how many times the package can be opened
- **Expiration period**: how many days it remains valid

![Offline DRM settings: open limit and expiration period](/offlinepages/security_setting.png)

## 3) Download the H5/HTML package (ZIP)

After protections are applied, download the package.

![Result page: protected file ready and download button](/offlinepages/result_download_zip_file.png)

## 4) Open locally (how recipients read it)

Typically the recipient:

- Downloads the ZIP
- Extracts it
- Opens the included `.html` file in a browser

![Open the HTML inside the extracted ZIP](/offlinepages/click_html_inside_zip_to_view.png)

## 5) Keep control: check status or update opens

Offline packages still have a control loop. You can use the generated codes to:

- **Check status** (is it still valid, remaining opens)
- **Update access** (add more opens when needed)

![Use reading/modification codes to check or change access](/offlinepages/result-check-change.png)

![Example: successfully updated number of opens](/offlinepages/success_example_offline_file_change.png)

### Flow: PDF → offline H5 package → updates

```mermaid
flowchart TB
  A[Upload PDF] --> B[Configure: open limit + expiration]
  B --> C[Generate offline package (ZIP)]
  C --> D[Recipient downloads + extracts]
  D --> E[Open the included HTML locally]
  E --> F{Need more opens / extend access?}
  F -->|No| G[Done]
  F -->|Yes| H[Use codes to check/update access]
  H --> E
```

## Offline H5 vs online secure link (which to use)

- **Pick offline H5** when network is unreliable, or you must deliver a self-contained package.
- **Pick an online secure link** when you want the cleanest experience (no ZIP extraction) and stronger auditing.

If you want the online workflow with access records, QR sharing, email verification, and viewing modes, see the full online guide below.

---

**Related:** [MaiPDF complete workflow guide (with diagrams)](/en/maipdf-complete-workflow-guide-with-diagrams) · [Secure PDF links](/en/secure-pdf-links) · [PDF to QR](/en/pdf-to-qr)
