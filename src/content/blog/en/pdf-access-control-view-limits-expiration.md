---
title: "PDF Access Control: View Limits and Expiration Working Together"
description: "Combine view limits with expiration dates for double-layered access control. Learn the strategy behind pairing these two controls for different document types."
pubDate: "Apr 2 2026"
heroImage: "/maipdf2026/MaiPDF_settings_expiration_telegram.png"
tags: ["Access Control", "View Limits", "Expiration", "PDF Security"]
---

# PDF Access Control: View Limits and Expiration Working Together

View limits and expiration dates are the two most commonly used access controls for shared PDFs. Used individually, each provides meaningful protection. Used together, they create a safety net where either trigger can disable access.

## The Two Controls Explained

**View limit** — maximum number of times the document can be opened. Once reached, the link stops working.

**Expiration date** — the document becomes inaccessible after a specific date, regardless of remaining views.

## Why Use Both?

Each control covers a gap the other leaves open:

| Scenario | View Limit Alone | Expiration Alone | Both Combined |
|----------|-----------------|-----------------|---------------|
| Link goes viral | Access stops at limit ✓ | Access continues indefinitely ✗ | Stops at limit ✓ |
| Document becomes outdated | Still accessible if views remain ✗ | Access stops on date ✓ | Stops on date ✓ |
| Low engagement | Views unused, link stays live indefinitely ✗ | Access stops on date ✓ | Stops on date ✓ |
| Targeted leak | Access stops at limit ✓ | Still accessible until date ✗ | Stops at limit ✓ |

The "Both Combined" column shows the strongest protection in every scenario.

## Configuration on MaiPDF

1. Upload your PDF at [maipdf.com](https://www.maipdf.com)
2. Set the **view limit** based on your audience size
3. Set the **expiration date** based on the document's relevance window
4. Share the link

![Settings](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

## Recommended Combinations by Document Type

| Document | View Limit | Expiration | Reasoning |
|----------|-----------|------------|-----------|
| Sales proposal | 30 | 14 days | Client should decide quickly; prevent competitor access |
| Quarterly report | 100 | 90 days | Relevant for one quarter only |
| Job offer letter | 15 | 7 days | Small audience, time-sensitive decision |
| Event schedule | 500 | Event date + 1 day | Broadly distributed but irrelevant after event |
| Lease agreement | 20 | 30 days | Few parties, negotiation window |
| Training material | 200 | End of training period | Students access repeatedly during course |

![Self-Destruct Expiration](/maipdf2026/show_off/self-destruct.png)

## The Decision Flow

Use this flow to decide which controls apply:

![Access Control Decision](/maipdf2026/flowchart/en-access-control-decision.svg)

**Is the content time-sensitive?** → Add expiration
**Is the audience limited?** → Add view limit
**Is it both?** → Add both
**Is it public/permanent?** → Neither

## What Happens When Controls Trigger

**View limit reached first**: The link shows an "access limit reached" message. All future clicks see this, even before the expiration date.

**Expiration date reached first**: The link shows an "expired" message. Remaining views are irrelevant.

**Both reached simultaneously**: The first trigger to fire deactivates the link.

In all cases, the document owner can:
- Create a new link with fresh limits
- Extend the expiration date
- Increase the view limit

## Monitoring and Adjusting

After sharing, monitor the access records:

- **Views trending toward limit before expiration** → audience is active, possibly forwarding the link. Consider whether this is acceptable.
- **Expiration approaching with few views** → audience hasn't engaged. Follow up or send a reminder.
- **Spike in views from unexpected locations** → possible unauthorized sharing. Consider revoking and re-sharing with tighter controls.

![Access Records](/maipdf2026/how_to_fill_access_record_for_check.png)

## Quick Setup

Visit [maipdf.com](https://www.maipdf.com), upload your PDF, set both view limit and expiration, and share. Two controls, double the protection.
