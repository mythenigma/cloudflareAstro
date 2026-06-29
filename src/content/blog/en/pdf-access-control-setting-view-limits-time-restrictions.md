---
title: "PDF Access Control: Setting View Limits and Time Restrictions"
description: "A configuration walkthrough for the two PDF access-control dials — view limit (how many) and expiry (how long). How to combine them, document-type presets, setting them in the MaiPDF upload panel, and adjusting after sharing without breaking the link."
pubDate: "Feb 11 2026"
updatedDate: "Jun 27 2026"
heroImage: "/maipdf2026/MaiPDF_settings_expiration_telegram.png"
tags: ["PDF access control", "view limit", "expiry", "time restrictions", "document security", "MaiPDF"]
showDefaultCta: true
---

# PDF Access Control: Setting View Limits and Time Restrictions


> **2026 update:** This guide mainly covers browser-based Online Cloud Sharing: controlled links, expiry, view limits, watermarks, access records, and download/print restrictions. For files where screenshot risk, device sharing, refund abuse, or post-contract revocation matters, use the stronger App DRM path: protected `.maipdf` files opened in the MaiPDF App with device binding, license revocation, protected reading, and traceable watermarks. A browser cannot fully block operating-system screenshots, and no software can stop someone from photographing a screen with another phone.
>
> Start here if you are choosing between the two paths: [Online PDF Sharing vs App DRM](/blog/en/online-pdf-sharing-vs-app-drm), [secure PDF reader with screenshot protection](/blog/en/secure-pdf-reader-with-screenshot-protection), and [how to revoke access to a PDF after sending](/blog/en/how-to-revoke-access-to-a-pdf-after-sending).

<div class="intro-panel">
  <p>A PDF link with no access controls is active indefinitely for anyone who receives it. <strong>View limits and expiry dates are the two dials that bound that access</strong> — one limits <em>how many</em>, the other limits <em>how long</em>. Both can be set at upload time, both can be adjusted after you've shared the link. This page is the configuration walk-through: which dial to use when, the presets by document type, where to set them in the MaiPDF panel, and how to change them without breaking anyone's bookmark.</p>
</div>

## The two dials

### View limit — "how many"

Sets the maximum number of times the link can be opened. Once the counter reaches the cap, the link stops resolving to the PDF. Useful when you know roughly how many recipients the document is for and want to bound distribution past that group.

### Expiry — "how long"

Sets a specific date after which the link stops working, regardless of how many times it has (or hasn't) been opened. Useful when the document itself is time-sensitive — a proposal window, a review period, a seasonal announcement, a pre-release draft.

The two are independent. You can set one, the other, or both.

## When to use which

<div class="access-control-table">
  <table>
    <thead>
      <tr>
        <th>Situation</th>
        <th>View limit alone</th>
        <th>Expiry alone</th>
        <th>Both together</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Situation">Audience size is known, but reading window is open</td>
        <td data-label="View limit alone"><strong>Right choice</strong> — cap matches audience</td>
        <td data-label="Expiry alone">Wrong — no natural end date</td>
        <td data-label="Both together">Add a long expiry as safety net</td>
      </tr>
      <tr>
        <td data-label="Situation">Time-sensitive doc, unknown audience</td>
        <td data-label="View limit alone">Wrong — no audience ceiling</td>
        <td data-label="Expiry alone"><strong>Right choice</strong> — tied to calendar</td>
        <td data-label="Both together">Add a generous cap as safety net</td>
      </tr>
      <tr>
        <td data-label="Situation">Short-window review with known reviewers</td>
        <td data-label="View limit alone">Partial — no deadline</td>
        <td data-label="Expiry alone">Partial — no audience cap</td>
        <td data-label="Both together"><strong>Use both</strong> — whichever triggers first closes the link</td>
      </tr>
      <tr>
        <td data-label="Situation">Public brochure / whitepaper</td>
        <td data-label="View limit alone">Wrong — kills reach</td>
        <td data-label="Expiry alone">Reasonable — eventual sunset</td>
        <td data-label="Both together">Leave cap off, keep a distant expiry</td>
      </tr>
      <tr>
        <td data-label="Situation">Any link that must self-close if forgotten</td>
        <td data-label="View limit alone">Partial</td>
        <td data-label="Expiry alone"><strong>Essential</strong></td>
        <td data-label="Both together">Expiry is the non-negotiable dial here</td>
      </tr>
    </tbody>
  </table>
</div>

The short rule: **if you don't know which one to use, set both**. They don't conflict. The first one that triggers closes the link, and the safety net of the other catches whatever case you didn't fully model.

![Both dials live on the same upload panel — set one, set both, leave one off](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

## Presets by document type

Starting points, not rules — useful when you need to move on from choosing a number and get back to the work:

<div class="access-control-table">
  <table>
    <thead>
      <tr>
        <th>Document type</th>
        <th>View limit</th>
        <th>Expiry</th>
        <th>Why</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Document type">Public report / whitepaper</td>
        <td data-label="View limit">None</td>
        <td data-label="Expiry">180 days</td>
        <td data-label="Why">Reach matters; still want eventual sunset</td>
      </tr>
      <tr>
        <td data-label="Document type">Sales proposal</td>
        <td data-label="View limit">15–30</td>
        <td data-label="Expiry">14–30 days</td>
        <td data-label="Why">Proposal window is the natural bound</td>
      </tr>
      <tr>
        <td data-label="Document type">Contract for review</td>
        <td data-label="View limit">10–15</td>
        <td data-label="Expiry">7–14 days</td>
        <td data-label="Why">Tight on both — review cycles are short</td>
      </tr>
      <tr>
        <td data-label="Document type">Confidential executive memo</td>
        <td data-label="View limit">3–8</td>
        <td data-label="Expiry">5–7 days</td>
        <td data-label="Why">Pair with email gate and watermark</td>
      </tr>
      <tr>
        <td data-label="Document type">Product launch announcement</td>
        <td data-label="View limit">500+ or none</td>
        <td data-label="Expiry">7 days</td>
        <td data-label="Why">High cap, short window — timed distribution</td>
      </tr>
      <tr>
        <td data-label="Document type">Event handout / poster QR</td>
        <td data-label="View limit">200–1000</td>
        <td data-label="Expiry">3–7 days after event</td>
        <td data-label="Why">Wide audience, window of relevance is brief</td>
      </tr>
      <tr>
        <td data-label="Document type">Internal draft for small team</td>
        <td data-label="View limit">15–25</td>
        <td data-label="Expiry">14 days</td>
        <td data-label="Why">Mobile rereads push above audience size</td>
      </tr>
      <tr>
        <td data-label="Document type">Training handout</td>
        <td data-label="View limit">None or 500+</td>
        <td data-label="Expiry">60+ days</td>
        <td data-label="Why">Rereading is the feature, not a leak</td>
      </tr>
    </tbody>
  </table>
</div>

For the reasoning behind the view-limit numbers (including the audience × rereads × 1.5 formula and the mobile multiplier that catches most teams out), the [Limit PDF Views guide](/blog/en/limit-pdf-views-drm) covers it end-to-end.

## Setting it up in MaiPDF

1. **Upload** your PDF at [maipdf.com](https://maipdf.com) — drag-drop or click to select.
2. **In the settings panel**, set the two dials:
   - **Maximum Opens** (view limit) — leave blank for unlimited
   - **Expiry Date** — pick a calendar date, leave blank for no sunset
3. **Add other controls as needed** — download off, dynamic watermark, email verification, Telegram alerts on open.
4. **Generate the link.** Copy or scan the QR.

![The same settings panel — view limit, expiry, verification, watermark all one click apart](/maipdf2026/show_off/openlimit.png)

The two dials are not buried. They are front-and-centre on the upload panel because they are the two most-used access controls, and setting them correctly at upload time is ten times cheaper than realizing you needed them after the link is already circulating.

## Adjusting after sharing

This is the part most people don't realize is possible: **both dials are editable after the link has been shared, without changing the URL**.

![The control center — raise the limit, extend the expiry, revoke, replace the file, all without changing the URL anyone already has](/maipdf2026/how_to_control_panel.png)

From the [Control Center](https://www.maipdf.com/6/control-center.html):

- **Raise the view limit.** The counter does not reset — the ceiling just moves up. Every recipient's bookmark still resolves. Use this when a legitimate reader is about to hit the cap and you just underestimated the audience.
- **Extend (or shorten) the expiry.** Push the date back for more time, pull it in to close the link sooner. Again, the URL does not change.
- **Revoke.** Kill the link immediately regardless of remaining count or time. The right first move for any confirmed leak.
- **Replace the file behind the link.** Swap in a new PDF — the URL, the view limit, the expiry, and any printed QR codes all keep working. Only the content (and whatever settings you change during the swap) updates.

You never need to reshare a new link to adjust access. The original URL respects the new settings immediately.

## A couple of practical notes

**The view limit counter is cumulative, not per recipient.** If you need per-recipient caps — for example, a press embargo where each journalist must have their own counter — issue separate links per recipient and let each one carry its own limit. The same pattern applies to exam papers distributed per student.

**The expiry uses the upload time zone.** Set it accounting for the time of day you actually want the link to close, especially if you share across time zones. A "midnight Friday" expiry in your timezone is Friday afternoon or Saturday morning for someone else.

**Raising the limit does not reset the counter.** This is a feature, not a bug — the signal that "this link has been opened forty times" is preserved, so you can still see that your distribution is running hot even after you bump the cap up.

**Replacing the file does not reset the counter either.** Whatever the counter was when you swapped the PDF is where it continues. If you want a fresh counter, issue a new link instead.
