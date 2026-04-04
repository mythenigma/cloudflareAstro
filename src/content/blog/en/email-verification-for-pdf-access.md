---
title: "Email Verification for PDF Access (Quick Flow)"
description: "How MaiPDF's email verification works: require a one-time code before anyone can open your shared PDF. Setup steps, allowlist options, and real screenshots."
heroImage: "/maipdf2026/show_off/email verification_only sepcified people can receive.png"
pubDate: "Apr 4 2026"
tags: ["PDF Security", "Access Control", "Email Verification"]
showDefaultCta: true
---

# Email Verification for PDF Access

<div class="intro-panel">
  <p>When you share a PDF link, anyone with the URL can open it — unless you add a gate. Email verification forces the reader to prove they own an inbox before the document loads. MaiPDF handles the code, the check, and the record.</p>
</div>

![Only approved emails receive the verification code](/maipdf2026/show_off/email verification_only sepcified people can receive.png)

## What happens when a reader clicks your link

1. **Enter email** — the reader types their address on the verification screen.
2. **System checks the list** — if you set an allowlist, only matching addresses get a code. Everyone else is stopped here.
3. **Receive code** — a one-time verification code is sent to the inbox.
4. **Enter code → open PDF** — the reader enters the code and the document opens in MaiPDF's controlled viewer (no download, no print if you disabled those).

![Verification screen the reader sees before the PDF opens](/maipdf2026/get_email_verification_before_read.jpg)

The whole thing takes under 30 seconds for the reader. On your side, MaiPDF logs who verified and when.

## Two ways to set the email gate

| Mode | What it does | Example |
|------|-------------|---------|
| **Specific addresses** | Only the exact emails you list can receive a code | a@company.com, b@company.com |
| **Domain allowlist** | Any address under that domain is allowed | @company.com → anyone@company.com passes |

If you skip the allowlist entirely, any email address can request a code. That still stops casual forwarding because the new recipient has to verify — but it won't block someone who has their own inbox.

## Setup in MaiPDF

1. Go to the [create-link page](https://www.maipdf.com/pdf/maipdf2026.html) and upload your PDF.
2. In the sharing settings, enable **email verification**.
3. (Optional) Add specific allowed addresses or an allowed domain.
4. Set your other rules — open limit, expiry, watermark, view mode.
5. Click **Create Secure Link**. Done.

![MaiPDF settings panel with read alerts and security options](/maipdf2026/MaiPDF_settings_expiration_telegram.png)

The email gate lives in the same settings panel as your other share rules. No separate tool, no extra step.

## What you get after sharing

- **Access records** — every verified open is logged with the reader's email and timestamp. Check them anytime in [Control Center](https://www.maipdf.com/6/control-center.html).
- **Telegram alerts** (optional) — get a push notification each time someone opens the PDF. One-time bot setup, works for all future shares.

![Access records showing who opened and when](/maipdf2026/page_redirect_to_accessRecord.png)

## When email verification makes sense

- **Client proposals and quotes** — you want to know *who* actually read it
- **HR documents** — only employees with a company email should access them
- **Contracts and NDAs** — keep a verification trail for compliance
- **Course materials** — only enrolled students (by their school email) get in

## Email verification vs. other controls

| Control | Stops forwarding? | Reader effort | You learn who opened? |
|---------|-------------------|---------------|----------------------|
| **Email verification** | Yes — new reader must verify | Low (type email + code) | Yes |
| Password | Partial — password can be shared | Low (type password) | No |
| Open limit | No — first N people get in | None | No |
| Expiry | No — just limits the window | None | No |

Email verification is the only option that ties each open to a specific person. Combine it with an open limit and expiry for the tightest control.

---

**Related reading:**

- [Email-Verified PDF Links: Stop Forwarded Access](/blog/en/email-verified-pdf-links) — why forwarding is the real risk and how verification solves it
- [PDF Access Controls: Practical Implementation](/blog/en/pdf-access-controls-practical-implementation) — broader look at view limits, passwords, and access rules
- [PDF Prevent Forwarding: Practical Guide](/blog/en/pdf-prevent-forwarding-guide) — dedicated guide to anti-forwarding strategies
- [How to Limit PDF Access Count](/blog/en/pdf-access-limit-control-guide) — combine view limits with email verification for maximum control

