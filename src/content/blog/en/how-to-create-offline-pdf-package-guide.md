---
title: "How to Create an Offline PDF Package (HTML-in-ZIP) for Sharing"
description: "A practical, non-hype guide to exporting an offline package, opening it locally, and updating it when the PDF changes."
pubDate: "Jan 21 2026"
tags: ["maipdf", "offline", "pdf"]
---

Sometimes you need to share a PDF in environments where online viewing is inconvenient (restricted networks, training rooms, internal distribution). One approach is to export an **offline package** that can be opened locally.

## Simple flow

1. **Upload the PDF**
2. **Configure security options** (if needed)
3. **Export an offline package (ZIP)**
4. **Open the included HTML file locally**

```mermaid
flowchart TD
  A[Upload PDF] --> B[Security settings]
  B --> C[Export offline ZIP]
  C --> D[Open HTML locally]
```

## Upload

![Offline upload section](/offlinepages/upload_section_offline_maipdf.png)

## Export the ZIP package

![Download zip result](/offlinepages/result_download_zip_file.png)

## Open it locally

Unzip the file, then open the included HTML file in a browser.

![Click HTML inside ZIP](/offlinepages/click_html_inside_zip_to_view.png)

## Optional: security settings

![Offline security settings](/offlinepages/security_setting.png)

