---
title: "Temporary PDF Sharing Links: Set View Limits and Expiry"
description: "How to create a temporary PDF sharing link that stops working after N opens or after a set date. Setup steps, recommended settings, and what happens when the limit is reached."
pubDate: "Apr 4 2026"
heroImage: "/maipdf2026/MaiPDF_settings_expiration_telegram.png"
tags: ["PDF sharing", "temporary link", "access control", "view limit", "expiry"]
showDefaultCta: true
---

# Temporary PDF Sharing Links: Set View Limits and Expiry

<div class="intro-panel">
  <p>A permanent link to a sensitive document is a risk that compounds over time. A temporary link stops working when you want it to — after a date, after N opens, or immediately when you revoke it. Here's how to create one in MaiPDF.</p>
</div>

## Two ways to make a link temporary

### Option 1: View limit (expires after N opens)
Set a maximum number of opens. The 11th person who clicks a link with a limit of 10 gets an "access limit reached" message. Useful when you know your audience size.

### Option 2: Expiry date (expires on a specific date)
Set a date. After that date, the link shows as expired to anyone who tries to open it. Useful for time-bounded sharing like proposal windows or review periods.

**Use both together** for the strongest temporary control: the link dies when either condition is met — when too many people have opened it, or when the window has passed.

## How to set it up

1. Upload your PDF at [maipdf.com](https://maipdf.com).
2. In the settings panel, set **Maximum Opens** (view limit) and/or **Expiry Date**.
3. Optionally enable download restrictions, watermark, or email verification.
4. Click **Create Secure Link**.

![Settings panel — view limit, expiry, and all other controls together](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

## Settings presets for common scenarios

| Scenario | View limit | Expiry | Download |
|----------|-----------|--------|----------|
| One-on-one proposal | 5 | 7 days | Off |
| Small group review | 20 | 14 days | Off |
| Event handout | 500 | 3 days | On |
| Confidential executive doc | 5 | 3 days | Off + watermark |
| Draft circulated for comments | 30 | 7 days | Off |

## What the reader sees when the limit is reached

The reader sees a clear message stating that the view limit has been reached or the link has expired. They can contact you to request extended access. You can raise the limit or extend the expiry anytime from [Control Center](https://www.maipdf.com/6/control-center.html) — the same URL stays valid.

![Open limit control in MaiPDF](/maipdf2026/show_off/openlimit.png)

## Adjust after sharing

You're not locked in once you share. From Control Center:
- **Raise the view limit** if more people need access than expected
- **Extend expiry** if the review window needs more time
- **Revoke immediately** if something changes
- **Swap the file** if the document was updated (link URL stays the same)

## Why temporary links beat attachments

An attachment sent to a mailing list will sit in inboxes forever. If you realize you sent the wrong version, or the document contains information that's no longer accurate, there's nothing you can do. A temporary link with an expiry means the document naturally stops being accessible without any manual intervention.

---

**Related reading:**

- [PDF View Count Limit Guide](/blog/en/pdf-set-view-count-limit-guide) — view limits in depth
- [PDF Access Control: View Limits and Time Restrictions](/blog/en/pdf-access-control-setting-view-limits-time-restrictions) — combining both controls
- [PDF Share Link Disable Download](/blog/en/pdf-share-link-disable-download) — view-only setup alongside temporary access
- [Send Client Proposals That Expire After Viewing](/blog/en/send-client-proposals-that-expire-after-viewing) — proposals with expiry
