---
title: "Réglages de partage PDF (écran d’envoi MaiPDF)"
description: "Explication simple de chaque réglage visible sur l’écran d’envoi."
pubDate: "Jan 15 2026"
tags: ["Sécurité documentaire", "Architecture", "Chiffrement", "Contrôle d'accès"]
---

# Réglages de partage PDF

<div class="intro-panel">
  <p>Cette page explique <strong>les réglages que vous voyez à l’écran</strong> et à quoi ils servent.</p>
</div>

![Réglages de partage PDF](/diagram/fr/pdf-sharing-settings.svg)

## Les 5 réglages à connaître

1. **Limite d’accès**  
   Limite le nombre total d’ouvertures.

2. **Durée par session**  
   Limite le temps de lecture par session.

3. **Type de protection**  
   - DynamoWatermark  
   - SecureView (lecture seule)  
   - FenceView (dissuasion des captures)  
   - Unrestricted  

4. **Vérification e‑mail**  
   Exige une vérification avant l’accès.

5. **Notification de lecture (optionnel)**  
   Recevez un e‑mail à l’ouverture.

## Flux rapide

```mermaid
flowchart LR
  A[Télécharger le PDF] --> B[Régler les options]
  B --> C[Créer un lien sécurisé]
  C --> D[Partager & suivre]
```

