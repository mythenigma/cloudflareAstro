---
title: "PDF‑Freigabeeinstellungen (MaiPDF Upload‑Bildschirm)"
description: "Einfach erklärt: die Einstellungen, die du auf dem Upload‑Bildschirm siehst."
pubDate: "Jan 15 2026"
tags: ["Dokumentensicherheit", "Sicherheitsarchitektur", "Verschlüsselung", "Zugriffskontrolle"]
---

# PDF‑Freigabeeinstellungen

<div class="intro-panel">
  <p>Hier erklären wir <strong>die konkreten Optionen</strong> auf dem Upload‑Bildschirm und wofür sie da sind.</p>
</div>

![PDF‑Freigabeeinstellungen](/diagram/de/pdf-sharing-settings.svg)

## Die 5 Einstellungen

1. **Zugriffslimit**  
   Begrenzt die Gesamtzahl der Öffnungen.

2. **Sitzungsdauer**  
   Begrenzt die Lesezeit pro Sitzung.

3. **Schutztyp**  
   - DynamoWatermark  
   - SecureView (Nur‑Ansicht)  
   - FenceView (Screenshot‑Abschreckung)  
   - Unrestricted  

4. **E‑Mail‑Verifizierung**  
   Zugriff erst nach E‑Mail‑Bestätigung.

5. **Lese‑Benachrichtigung (optional)**  
   E‑Mail, wenn geöffnet wurde.

## Kurzer Ablauf

```mermaid
flowchart LR
  A[PDF hochladen] --> B[Einstellungen setzen]
  B --> C[Sicheren Link erstellen]
  C --> D[Teilen & überwachen]
```

