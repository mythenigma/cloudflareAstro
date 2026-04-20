---
title: "PDF Security: Set View Limits to Prevent Unauthorized Access"
description: "Most PDF leaks aren't hacks — they're links that lived too long. A threat-model view of how view limits, expiry, watermarks and email gates work together to stop unauthorized access, with detection and revoke workflows when something slips through."
pubDate: "Feb 11 2026"
updatedDate: "Apr 20 2026"
heroImage: "/maipdf2026/show_off/securityshowoff.png"
tags: ["PDF security", "view limits", "unauthorized access", "document protection", "access control", "incident response"]
showDefaultCta: true
---

# PDF Security: Set View Limits to Prevent Unauthorized Access

<div class="intro-panel">
  <p><strong>Most document leaks aren't hacks. They're links that outlived the work they were sent for.</strong> A March proposal still opens in November. A draft contract drifts into a competitor's chat six months after review. None of these needed a breach — only a shared URL that never stopped working. This page is the security-focused read: the threat model, which control blocks which type of unauthorized access, and what to do when a leak is already in progress.</p>
</div>

## Quick navigation

- [Threat model](#how-unauthorized-access-actually-happens) — the five ways uncontrolled access really shows up
- [Control map](#which-control-blocks-which-threat) — what view limits, expiry, watermark, and email gates each stop
- [Secure baseline](#recommended-secure-baseline) — the preset most teams should start from
- [Scenario configurations](#scenario-configurations) — proposals, contracts, executive memos, partner decks
- [Detection in the access log](#detection-in-the-access-log) — the three signals worth watching after the send
- [Incident response](#when-the-link-has-already-leaked) — revoke, replace, regenerate workflow
- [Compliance notes](#compliance-and-audit-trail) — what the log gives you for an audit

## How unauthorized access actually happens

Before picking a control, it's worth being precise about what "unauthorized access" looks like in practice. Real leaks almost always fall into one of these five patterns:

<div class="access-control-table">
  <table>
    <thead>
      <tr>
        <th>Pattern</th>
        <th>What happens</th>
        <th>Why it's hard to catch</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Pattern">Link outlives the work</td>
        <td data-label="What happens">A proposal from months ago gets rediscovered in an inbox and opened again</td>
        <td data-label="Why it's hard to catch">Everyone on the original thread is legitimate — the problem is the calendar</td>
      </tr>
      <tr>
        <td data-label="Pattern">Link forwarded internally</td>
        <td data-label="What happens">A reviewer sends the URL to a colleague who wasn't on the original recipient list</td>
        <td data-label="Why it's hard to catch">The open looks identical to an intended reader's open</td>
      </tr>
      <tr>
        <td data-label="Pattern">Link forwarded externally</td>
        <td data-label="What happens">The document reaches a third party — often a competitor, sometimes the press</td>
        <td data-label="Why it's hard to catch">Nothing about the URL changes; the new viewer just clicks it</td>
      </tr>
      <tr>
        <td data-label="Pattern">Shared inbox / device handoff</td>
        <td data-label="What happens">A team inbox or borrowed laptop opens the link long after it was relevant</td>
        <td data-label="Why it's hard to catch">The original recipient is still technically the one "opening" it</td>
      </tr>
      <tr>
        <td data-label="Pattern">Screenshot / screen recording</td>
        <td data-label="What happens">The content leaves the viewer as an image, not a file</td>
        <td data-label="Why it's hard to catch">No download event to flag; deterrence is the only practical defense</td>
      </tr>
    </tbody>
  </table>
</div>

None of these require breaking into anything. They are the default behavior of a link with no bounds.

## Which control blocks which threat

A view limit on its own is not a security product — it's one dial. The real defense comes from pairing it with the other dials so each unauthorized-access pattern above has at least one control pointed at it.

<div class="access-control-table">
  <table>
    <thead>
      <tr>
        <th>Threat</th>
        <th>View limit</th>
        <th>Expiry</th>
        <th>Dynamic watermark</th>
        <th>Email gate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Threat">Link outlives the work</td>
        <td data-label="View limit">Partial — only if the cap is small</td>
        <td data-label="Expiry"><strong>Primary control</strong></td>
        <td data-label="Dynamic watermark">—</td>
        <td data-label="Email gate">—</td>
      </tr>
      <tr>
        <td data-label="Threat">Internal forwarding</td>
        <td data-label="View limit">Partial — slows the spread</td>
        <td data-label="Expiry">—</td>
        <td data-label="Dynamic watermark"><strong>Deterrent + attribution</strong></td>
        <td data-label="Email gate"><strong>Blocks open</strong> if not whitelisted</td>
      </tr>
      <tr>
        <td data-label="Threat">External forwarding</td>
        <td data-label="View limit">Partial — cap can trip</td>
        <td data-label="Expiry">Partial</td>
        <td data-label="Dynamic watermark"><strong>Traces back to source</strong></td>
        <td data-label="Email gate"><strong>Primary control</strong></td>
      </tr>
      <tr>
        <td data-label="Threat">Shared inbox / handoff</td>
        <td data-label="View limit">Partial</td>
        <td data-label="Expiry"><strong>Primary control</strong></td>
        <td data-label="Dynamic watermark">—</td>
        <td data-label="Email gate">Partial — if device is on whitelisted account</td>
      </tr>
      <tr>
        <td data-label="Threat">Screenshot / recording</td>
        <td data-label="View limit">—</td>
        <td data-label="Expiry">—</td>
        <td data-label="Dynamic watermark"><strong>Primary deterrent</strong></td>
        <td data-label="Email gate">—</td>
      </tr>
    </tbody>
  </table>
</div>

The view limit's job in this grid is narrower than most people assume. It is the *second-chance* control — the fallback that catches what the other three missed. That is exactly why it belongs on almost every sensitive link, even when the other controls are already doing most of the work.

![The access-control panel where view limit, expiry, email verification and watermark are all one click apart](/maipdf2026/show_off/openlimit.png)

## Recommended secure baseline

For any document that is not strictly public, the default that prevents most unauthorized access with the least friction:

- **View limit:** set it, even if generous — the counter itself is half the value (it tells you when a link is going beyond plan)
- **Expiry:** mandatory for anything time-bound; default 14–30 days unless there's a specific reason to extend
- **Download:** off for sensitive material (Standard Protection mode) — keeps content inside the viewer
- **Dynamic watermark:** on for any document where the content leaking would matter — viewer's email or IP stamped on every page
- **Email gate:** on when the audience is known and finite (contracts, executive memos, partner decks)

Three of those five are "set once and forget." The two that need scenario-specific tuning are the **view limit** and the **expiry**.

## Scenario configurations

Different documents have different threat profiles. These are starting points, tight enough to close the common leak vectors without making legitimate reading painful:

<div class="access-control-table">
  <table>
    <thead>
      <tr>
        <th>Document type</th>
        <th>View limit</th>
        <th>Expiry</th>
        <th>Minimum additional controls</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Document type">Sales proposal to a known prospect</td>
        <td data-label="View limit">10–20</td>
        <td data-label="Expiry">14 days</td>
        <td data-label="Minimum additional controls">Watermark with prospect's email</td>
      </tr>
      <tr>
        <td data-label="Document type">Draft contract for legal review</td>
        <td data-label="View limit">8–15</td>
        <td data-label="Expiry">7–10 days</td>
        <td data-label="Minimum additional controls">Email gate (counterparty's domain) + download off</td>
      </tr>
      <tr>
        <td data-label="Document type">Confidential executive memo</td>
        <td data-label="View limit">3–8</td>
        <td data-label="Expiry">5–7 days</td>
        <td data-label="Minimum additional controls">Email gate + watermark + download off</td>
      </tr>
      <tr>
        <td data-label="Document type">Partner deck / roadmap preview</td>
        <td data-label="View limit">15–25 per partner</td>
        <td data-label="Expiry">14 days</td>
        <td data-label="Minimum additional controls">Separate link per partner, watermark on</td>
      </tr>
      <tr>
        <td data-label="Document type">Pre-release financial draft</td>
        <td data-label="View limit">5–10</td>
        <td data-label="Expiry">3–5 days</td>
        <td data-label="Minimum additional controls">Email gate + watermark + download off + Telegram alerts</td>
      </tr>
      <tr>
        <td data-label="Document type">Internal whitelist distribution</td>
        <td data-label="View limit">high (200+)</td>
        <td data-label="Expiry">30–60 days</td>
        <td data-label="Minimum additional controls">Email gate with company domain</td>
      </tr>
    </tbody>
  </table>
</div>

These numbers are small on purpose. They should feel a little tight the first time you use them — that's the sign the control is doing work. For the reasoning behind the numbers (and the mobile-refresh multiplier that makes a naïve "10 recipients = limit of 10" a mistake), the [Limit PDF Views guide](/blog/en/limit-pdf-views-drm) is the deeper reference.

## Detection in the access log

Prevention is half the game; the other half is noticing when a control was too loose and something slipped past it. Three signals that show up in the MaiPDF access log and deserve attention:

![The access log shows each open with time, device and source — the raw material for detecting a leak](/maipdf2026/how_to_fill_access_record_for_check.png)

1. **View counter climbing faster than the estimate.** Sent to five people, counter at forty three days in? The link is being shared. Interpretation depends on the document — for a partner deck that's a leak; for a brochure it's reach.
2. **Opens from locations or time zones that don't match any recipient.** One or two strays are noise. A cluster from one unrelated region is signal — especially on a proposal or contract.
3. **Verification rejections and expired-link attempts after you've closed it.** People still trying to open the link after you've let it expire is the sound of continued distribution past its intended audience.

The log alone does not stop unauthorized access. But it's usually where the first evidence surfaces — usually a day or two before anyone tells you about it by email.

## When the link has already leaked

If detection surfaces something real, three actions stay available regardless of what controls were originally set:

![From the control panel you can revoke, replace the file behind the link, or tighten any of the existing controls](/maipdf2026/user_control_panel_alotof_functions.png)

- **Revoke immediately.** The URL stops resolving. This is the right first move for any confirmed leak, even if it breaks legitimate bookmarks — you can reissue for the people who still need access.
- **Replace the file behind the link, keep the URL.** Swap in a version of the document that reveals nothing further (redacted, or just a notice page). Anyone already sharing the leaked URL now circulates a dead or neutered document; you keep your own audit trail intact.
- **Tighten the gates and regenerate a new link for legitimate readers.** Drop the new URL to the real audience with a tighter view limit, a shorter expiry, an email gate if you didn't have one, and a watermark if you didn't have one. This is where the earlier mistake gets corrected without losing the recipients who need continued access.

Most teams underuse the second action. It is the one that converts a leak from "the file is out there" into "the file is out there, but the URL everyone is sharing now leads to a dead end."

## Compliance and audit trail

For teams that need to demonstrate access controls rather than just implement them, the access log is the artifact. For each link it retains:

- Every open event (timestamp, IP, user agent, referrer where available)
- The state of the controls at the time of each open (limit, expiry, download on/off)
- The modify events — when the cap was raised, when the file was replaced, when the link was revoked

Exported together, that is enough to answer the two questions any auditor actually asks: *who had access to this document, and when did that access end.* For internal reviews, it's also usually enough to identify the owner of a leak — especially when paired with the dynamic watermark, which makes screenshots traceable to a specific viewer session.

## Related reading

- [Limit PDF Views: Pick a Number That Matches Real Reading](/blog/en/limit-pdf-views-drm) — the deep reference on view-limit numbers, mobile multiplier, presets, and the access log
- [PDF Access Control: Setting View Limits and Time Restrictions](/blog/en/pdf-access-control-setting-view-limits-time-restrictions) — the configuration-focused companion on combining limit + expiry
- [Dynamic Watermarks on PDF](/blog/en/dynamic-watermarks-on-pdf) — the attribution layer that makes screenshots traceable
- [Email-Verified PDF Links](/blog/en/email-verified-pdf-links) — the identity gate that pairs with view limits for high-risk sends
- [PDF Security Protection: Layered Document Security](/blog/en/pdf-security-protection) — the complete controls overview

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
