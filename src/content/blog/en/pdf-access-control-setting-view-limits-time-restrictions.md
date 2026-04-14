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

<div class="access-control-table">
  <table>
    <thead>
      <tr>
        <th>Situation</th>
        <th>View limit alone</th>
        <th>Expiry alone</th>
        <th>Both</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Situation">Link forwarded widely</td>
        <td data-label="View limit alone">Stops after limit hit</td>
        <td data-label="Expiry alone">Doesn't help</td>
        <td data-label="Both">Stops after limit, also expires</td>
      </tr>
      <tr>
        <td data-label="Situation">Link never used, sits active</td>
        <td data-label="View limit alone">Doesn't expire</td>
        <td data-label="Expiry alone">Expires on schedule</td>
        <td data-label="Both">Both conditions terminate access</td>
      </tr>
      <tr>
        <td data-label="Situation">Short-window review</td>
        <td data-label="View limit alone">Doesn't expire</td>
        <td data-label="Expiry alone">Expires correctly</td>
        <td data-label="Both">Both: tight window + count</td>
      </tr>
      <tr>
        <td data-label="Situation">One allowed reviewer</td>
        <td data-label="View limit alone">Limit of 1 is fragile</td>
        <td data-label="Expiry alone">Doesn't help</td>
        <td data-label="Both">Limit + expiry after review window</td>
      </tr>
    </tbody>
  </table>
</div>

![Settings panel — open limit, expiry, all controls in one place](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

## Recommended presets by document type

<div class="access-control-table">
  <table>
    <thead>
      <tr>
        <th>Document type</th>
        <th>View limit</th>
        <th>Expiry</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Document type">Public report / whitepaper</td>
        <td data-label="View limit">None</td>
        <td data-label="Expiry">180 days</td>
        <td data-label="Notes">Still want it to eventually expire</td>
      </tr>
      <tr>
        <td data-label="Document type">Sales proposal</td>
        <td data-label="View limit">30</td>
        <td data-label="Expiry">30 days</td>
        <td data-label="Notes">Both — proposal window bounded</td>
      </tr>
      <tr>
        <td data-label="Document type">Contract for review</td>
        <td data-label="View limit">10</td>
        <td data-label="Expiry">14 days</td>
        <td data-label="Notes">Tight on both</td>
      </tr>
      <tr>
        <td data-label="Document type">Confidential executive memo</td>
        <td data-label="View limit">5</td>
        <td data-label="Expiry">7 days</td>
        <td data-label="Notes">Add email gate + watermark too</td>
      </tr>
      <tr>
        <td data-label="Document type">Product launch announcement</td>
        <td data-label="View limit">500</td>
        <td data-label="Expiry">7 days</td>
        <td data-label="Notes">High limit, short window</td>
      </tr>
    </tbody>
  </table>
</div>

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

<style>
  .access-control-table {
    margin: 2rem 0;
  }

  .access-control-table table {
    width: 100%;
  }

  @media (max-width: 768px) {
    .access-control-table {
      margin: 1.25rem 0;
    }

    .access-control-table table,
    .access-control-table thead,
    .access-control-table tbody,
    .access-control-table tr,
    .access-control-table th,
    .access-control-table td {
      display: block;
      width: 100%;
    }

    .access-control-table thead {
      display: none;
    }

    .access-control-table tr {
      margin: 0 0 1rem;
      padding: 0.15rem 0;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      background: #ffffff;
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
    }

    .access-control-table td {
      display: grid;
      grid-template-columns: minmax(7.5rem, 42%) 1fr;
      gap: 0.75rem;
      align-items: start;
      padding: 0.8rem 0.95rem;
      text-align: left;
      border-bottom: 1px solid #eef2f7;
    }

    .access-control-table tr td:last-child {
      border-bottom: none;
    }

    .access-control-table td::before {
      content: attr(data-label);
      font-size: 0.76rem;
      font-weight: 700;
      line-height: 1.4;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #475569;
    }
  }
</style>
