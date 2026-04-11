---
title: "PDF Access Control: Setting View Limits and Time Restrictions"
description: "How to use PDF view limits and expiry dates together to control document access. Setup guide, scenario recommendations, and how to adjust after sharing."
pubDate: "Apr 3 2026"
heroImage: "/maipdf2026/MaiPDF_settings_expiration_telegram.png"
tags: ["PDF access control", "view limit", "expiry", "document security", "MaiPDF"]
showDefaultCta: true
---

# PDF Access Control: Setting View Limits and Time Restrictions

<div class="intro-panel">
  <p>A PDF link without access controls is active indefinitely for anyone who receives it. View limits and expiry dates are two types of controls that bound document access — one limits how many people, the other limits how long. Both are configurable in MaiPDF, together or separately.</p>
</div>

## The two core controls

### View limit — "how many"

Sets the maximum number of times the link can be opened. Once the counter reaches the limit, the link goes inactive. Useful when you know the expected audience size and want to prevent broader distribution.

### Expiry date — "how long"

Sets a specific date after which the link becomes inactive. Useful when the document is time-sensitive (a proposal window, a review period, a seasonal offer) and you want to ensure it's not accessible indefinitely.

## Why both together is stronger

| Situation | View limit alone | Expiry alone | Both |
|-----------|-----------------|--------------|------|
| Link forwarded widely | Stops after limit hit | Doesn't help | Stops after limit, also expires |
| Link never used, sits active | Doesn't expire | Expires on schedule | Both conditions terminate access |
| Short-window review | Doesn't expire | Expires correctly | Both: tight window + count |
| One allowed reviewer | Limit of 1 is fragile | Doesn't help | Limit + expiry after review window |

![Settings panel — open limit, expiry, all controls in one place](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

## Recommended presets by document type

| Document type | View limit | Expiry | Notes |
|--------------|-----------|--------|-------|
| Public report / whitepaper | None | 180 days | Still want it to eventually expire |
| Sales proposal | 30 | 30 days | Both — proposal window bounded |
| Contract for review | 10 | 14 days | Tight on both |
| Confidential executive memo | 5 | 7 days | Add email gate + watermark too |
| Product launch announcement | 500 | 7 days | High limit, short window |

## Setting it up in MaiPDF

1. Upload your PDF at [maipdf.com](https://maipdf.com).
2. In the settings panel, set **Maximum Opens** and **Expiry Date**.
3. Add other controls as needed (download off, watermark, email gate).
4. Generate the link.

## Changing settings after sharing

Both controls can be adjusted from [Control Center](https://www.maipdf.com/6/control-center.html) at any time:
- **Extend expiry** — if more time is needed
- **Increase limit** — if you underestimated the audience
- **Revoke** — kill the link immediately regardless of remaining limit or time

You don't need to reshare a new link — the same URL respects the new settings immediately.

---

**Related reading:**

- [PDF View Count Limit Guide](/blog/en/pdf-set-view-count-limit-guide) — view limits in detail
- [View Limits + Watermarks: Why Use Both](/blog/en/pdf-link-view-limit-watermark) — combining view limits with identity tracking
- [PDF Security Protection: Layered Document Security](/blog/en/pdf-security-protection) — complete controls overview
- [MaiPDF: A Practical Tool for Controlled PDF Sharing](/blog/en/maipdf-a-practical-tool-for-controlled-pdf-sharing) — product overview
