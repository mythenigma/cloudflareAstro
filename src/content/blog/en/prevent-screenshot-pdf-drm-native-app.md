---
title: "Prevent screenshot on PDFs: MaiPDF Secure desktop app (complete guide)"
description: "Pack .maipdf on Windows or macOS for OS-level screenshot and screen-recording block. Step-by-step, license rules, recipient flow, limits. Not pack.html web HTML."
pubDate: "Jun 23 2026"
updatedDate: "Jun 23 2026"
heroImage: "/maipdf2026/offline/offlinedrm.png"
tags: ["prevent screenshot", "PDF DRM", ".maipdf", "native app"]
showDefaultCta: false
---

**Bottom line:** A PDF in a browser — whether a [maipdf.com](https://www.maipdf.com) link or a [pack.html](https://drm.maipdf.com/pack.html) locked HTML file — **cannot prevent screenshot**. The browser sandbox does not get OS-level control over Print Screen, snipping tools, or screen recorders.

To **prevent screenshot on PDFs**, pack **`.maipdf`** in the **MaiPDF Secure desktop app** (Windows / macOS) and have readers open the file **only inside that app**. Same license server as web pack, but a **different packing pipeline and a higher security tier**.

---

## Why browsers cannot do this

| Layer | What it can do | What it cannot do |
|---|---|---|
| Online link (maipdf.com) | Expiry, opens, watermark, Fence View | Block OS capture APIs |
| Web HTML pack (pack.html) | Encrypted file, revoke, watermark | Block OS capture APIs |
| **Desktop app (.maipdf)** | Native viewer + **SecureScreen**-class controls | Stop a second camera at the screen |

Web pack is still useful when install is impossible. It is not a substitute when screenshot control is a hard requirement.

---

## Can it prevent screenshot? — three MaiPDF paths

| Method | Prevent screenshot? |
|---|---|
| [maipdf.com](https://www.maipdf.com) link | No — watermark / access control only |
| [pack.html](https://drm.maipdf.com/pack.html) web HTML | No — still renders in browser |
| **MaiPDF Secure + `.maipdf`** | **Yes** — OS-level block or detect (varies by platform) |

---

## Download and install (desktop)

1. Go to [drm.maipdf.com](https://drm.maipdf.com/).
2. Download the installer for **Windows** or **macOS**.
3. Run the installer; open MaiPDF Secure.
4. Sign in with **Google** (required for packing and reading licensed files).

![Desktop app and install flow](/maipdf2026/offline/inststruct.png)

Screenshots above are **desktop UI only** — we do not have mobile UI screenshots in this article repo. Android and iOS builds exist; screenshot strength is highest on Android among mobile platforms.

| Platform | Where to get it |
|---|---|
| Windows | drm.maipdf.com installer |
| macOS | drm.maipdf.com DMG or Mac App Store |
| Android | Google Play or site APK |
| iPhone / iPad | App Store |

### Mainland China

Domestic app stores (Huawei, Xiaomi, 应用宝, etc.) are **not first-wave**. Soft copyright registration and other compliance steps come first, then formal store submission.

**Until listed:** overseas Apple ID, Google Play, or direct download from drm.maipdf.com for desktop / APK.

---

## Pack a `.maipdf` on desktop — step by step

### 1. Choose the source PDF

Use the final version you want read. Like web pack, **content is frozen at pack time** — edits require a new `.maipdf` and a new send.

### 2. Open Protect / Pack in the app

From the MaiPDF Secure home screen, start **Protect PDF** (DRM pack). Select your PDF from disk.

![MaiPDF Secure desktop — DRM entry](/maipdf2026/offline/offlinedrm.png)

### 3. Set license rules

| Rule | Purpose |
|---|---|
| **Expiry** | Hard stop date for the license |
| **Open limit** | Max unlock count across all recipients |
| **Allowed emails** | Optional — only listed Google accounts may open |
| **Device limit** | Cap how many devices each account may bind |

Rules are enforced server-side at open time — same D1 backend as pack.html, but the **file format and reader are native**.

### 4. Export `.maipdf`

The app writes a single `.maipdf` file. Send it like any attachment — email, USB, Teams, internal portal.

### 5. Tell the recipient

They must:

1. Install MaiPDF Secure (same platform family — desktop pack opens on desktop app).
2. Sign in with an **allowed Google account** (if you restricted emails).
3. Open the `.maipdf` **inside the app** — not in Adobe Acrobat, Preview, or a browser.

### 6. Manage the license

From the app license list or [drm.maipdf.com/dashboard](https://drm.maipdf.com/dashboard):

- Add opens
- Push expiry
- Revoke (all copies stop on next open attempt)
- Delete license

---

## Platform behavior (screenshot / recording)

| Platform | Typical behavior |
|---|---|
| **Android** | Strongest — OS-level secure flag on the reader surface |
| **Windows** | Block or inhibit common capture paths in the native viewer |
| **macOS** | Block or inhibit common capture paths in the native viewer |
| **iOS** | More detect + watermark than hard block — plan accordingly |

Exact behavior can change with OS updates. **Test on the same OS your audience uses** before a mass send.

---

## What the app adds beyond web pack

- **Prevent screenshot / screen recording** where the OS allows
- **Device integrity checks** — rooted / jailbroken / debug environments may be refused
- **Native viewer** — no browser devtools extraction path
- **Trace watermarks** on pages in addition to capture controls

## What still does not work

- **Second camera** pointed at the screen — no product can prevent this
- **Air-gapped open** — license check still needs network at unlock (same as web pack)
- **Editing packed content** — repack required for PDF changes

---

## When to use web pack instead

Pick [pack.html](/blog/en/how-to-create-offline-pdf-package-complete-guide) when:

- Recipients **refuse to install** anything
- Screenshot is not a hard requirement
- You accept browser security limits in exchange for zero install

Pick **`.maipdf`** when contracts, courseware, unreleased designs, or internal confidential PDFs need **capture control**.

---

## FAQ

**Is it free?** Yes — current pricing is free for personal and team use. No enterprise quote to start.

**Same account as maipdf.com?** Different products. MaiPDF Secure uses Google sign-in via Firebase for the DRM app line.

**vs LockLizard?** Similar category (managed reader, revoke, devices). LockLizard is a long-established **paid enterprise** vendor. MaiPDF Secure targets the same controls without enterprise pricing → [comparison](/blog/en/maipdf-secure-vs-locklizard-pdf-drm).

**vs pack.html?** Web = PDF→HTML→ZIP, browser, lower tier. App = `.maipdf`, native, **prevent screenshot**.

---

## Related

- [Web HTML pack complete guide](/blog/en/how-to-create-offline-pdf-package-complete-guide) — when install is impossible
- [Three sharing modes](/blog/en/online-vs-offline-pdf-security)
- [Introducing MaiPDF Secure](/blog/en/introducing-maipdf-secure-share)

<div class="cta-container">
  <a href="https://drm.maipdf.com/" target="_blank" rel="noopener noreferrer" class="cta-button">
    Download MaiPDF Secure
  </a>
</div>
