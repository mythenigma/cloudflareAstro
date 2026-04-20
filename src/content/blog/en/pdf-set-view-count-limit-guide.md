---
title: "PDF View Count Limit: How to Set and Use Open Limits"
description: "How to set a view count limit on your PDF link in MaiPDF: what it does, preset recommendations by use case, and what happens when the limit is reached."
pubDate: "Apr 3 2026"
heroImage: "/maipdf2026/show_off/openlimit.png"
tags: ["PDF view limit", "open limit", "access control", "document security", "MaiPDF"]
showDefaultCta: true
noindex: true
---

# PDF View Count Limit: How to Set and Use Open Limits

<div class="intro-panel">
  <p>A view count limit is the simplest way to bound how far a PDF link can spread. Set it to 10 and the 11th person who tries the link gets an "access limit reached" message instead of your document.</p>
</div>

## How it works

- Every time someone opens the link, the counter increments by one
- When the count reaches the limit, the link becomes inactive
- You can raise or lower the limit anytime from [Control Center](https://www.maipdf.com/6/control-center.html)
- The counter resets if you generate a new link

![Open limit setting in MaiPDF settings panel](/maipdf2026/show_off/openlimit.png)

## What the reader sees when the limit is reached

The reader sees an access-denied page explaining that the view limit has been reached. They can contact you to request an extension. This is intentionally transparent — obscure error pages frustrate users more than a clear explanation.

## Preset recommendations by scenario

| Scenario | Suggested limit | Rationale |
|----------|---------|-----------|
| One-on-one proposal | 3–5 | You + client + one internal reviewer |
| Small team review | 10–25 | Leaves buffer for forwards within the team |
| Client onboarding (10 seats) | 50–100 | 2–5x headcount to allow for re-opens |
| Public-facing content | None (unlimited) | Broad access is the goal |
| Confidential executive memo | 5–10 | Tight — each open should be deliberate |
| Event QR code handout | 200–1000 | Attendance-based estimate + buffer |

## Set view limit in MaiPDF

1. Upload your PDF at [maipdf.com](https://maipdf.com).
2. In the settings panel, set **Maximum Opens**.
3. Leave blank for unlimited.
4. Combine with expiry and download restrictions as needed.

![Full settings panel with open limit, expiry, and other controls](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

## Adjust after you've shared

View limits are not locked once you share. From Control Center you can:
- **Increase** the limit if you realize more people need access
- **Decrease** it to tighten access after a review window closes
- **Revoke** the link entirely if needed

## Combine view limits with expiry for strongest control

View limit alone stops breadth of distribution. Expiry date stops duration of access. Using both means a link that's safe to share broadly still has a natural end point, and a tight-limit link that reaches its count doesn't just sit there active but unused.

For sensitive documents: set both.

---

**Related reading:**

- [PDF Access Control: View Limits and Time Restrictions](/blog/en/pdf-access-control-setting-view-limits-time-restrictions) — view limits + expiry together
- [View Limits + Watermarks: Why Use Both](/blog/en/pdf-link-view-limit-watermark) — combining limits with identity tracking
- [PDF Security Protection: Layered Document Security](/blog/en/pdf-security-protection) — complete controls overview
- [MaiPDF: A Practical Tool for Controlled PDF Sharing](/blog/en/maipdf-a-practical-tool-for-controlled-pdf-sharing) — product overview
