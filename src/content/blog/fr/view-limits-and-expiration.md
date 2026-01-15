---
title: "Limites de vues et expiration : deux contrôles simples contre le sur-partage"
description: "Deux contrôles — limites de vues et expiration — réduisent fortement les risques liés aux liens de documents."
pubDate: "Jan 15 2026"
tags: ["Contrôle d'accès", "Limites de vues", "Expiration", "Partage de documents"]
---

# Limites de vues et expiration : deux contrôles simples contre le sur-partage

<div class="intro-panel">
  <p>La plupart des fuites ne sont pas des « hacks » : ce sont des liens qui vivent trop longtemps et se propagent trop facilement. Limites et expiration réduisent la fenêtre.</p>
</div>

![Flux de limite de vues](/diagram/en/simple-view-limit-flow.svg)

## Comment ça marche

- Vous fixez un nombre maximum d’ouvertures (ou une durée)
- Le lien fonctionne jusqu’à atteindre la règle
- Ensuite, l’accès s’arrête automatiquement

## Quand c’est particulièrement utile

- Propositions à usage unique
- Accès temporaire à des manuels / docs d’onboarding
- Partage de brouillons qui changent souvent

## Une politique “baseline” simple

| Type de document | Expiration | Limite de vues |
| --- | --- | --- |
| Proposition / devis | 7–14 jours | 10–30 |
| Contrat (brouillon) | 3–7 jours | 5–15 |
| Formation | 30–60 jours | illimité ou élevé |

## Astuce

Combinez limites + vérification si vous voulez que chaque vue soit « attribuable », pas seulement comptée.

