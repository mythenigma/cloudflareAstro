---
title: Générer un paquet H5/HTML hors ligne pour un PDF (guide rapide)
description: >-
  Quand vos lecteurs doivent ouvrir un PDF sans internet : créer un paquet
  offline (ZIP), le distribuer, et l’ouvrir localement via le fichier HTML.
pubDate: Jan 26 2026
tags:
  - pdf
  - offline
  - html
  - workflow
heroImage: /maipdf2026/show_off/en-offline-version.svg
---

Pour des environnements sans connexion stable, un partage “par lien” n’est pas toujours possible. Une alternative est de générer un **paquet offline** (souvent un ZIP contenant un HTML à ouvrir).

## Flux simple

1. **Créer le paquet offline**
2. **Télécharger le ZIP**
3. **Distribuer le ZIP**
4. **Ouvrir le HTML dans le ZIP**
5. **Si le contenu change : publier une nouvelle version du ZIP**

```mermaid
flowchart TD
  A[Prepare PDF] --> B[Generate offline package]
  B --> C[Download ZIP]
  C --> D[Distribute]
  D --> E[Open HTML locally]
  E --> F[Update: new ZIP version]
```

## Captures

![Upload offline](/maipdf2026/show_off/en-offline-version.svg)

![Téléchargement ZIP](/offlinepages/offline-MaiPDF-Home-Page.png)

![Ouvrir HTML](/offlinepages/upload_section_offline_maipdf.png)

![Exemple de mise à jour](/offlinepages/security_setting.png)

