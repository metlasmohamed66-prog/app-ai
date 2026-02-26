---
paths:
  - "src/components/**"
  - "src/pages/**"
  - "src/app/**"
  - "**/*.tsx"
  - "**/*.jsx"
---

# Regles Frontend

## Composants
- Un composant par fichier
- Nommage PascalCase pour les composants
- Props typees avec interfaces (pas de `type` inline complexes)
- Preferer les composants fonctionnels avec hooks

## Styles
- Utiliser le systeme de design du projet (CSS modules, Tailwind, styled-components)
- Pas de styles inline sauf pour des valeurs dynamiques
- Variables CSS pour les couleurs et espacements

## Performance
- Memoiser (`useMemo`, `useCallback`) uniquement quand mesure necessaire
- Lazy loading pour les routes et composants lourds
- Optimiser les images (format, taille, lazy loading)

## Accessibilite
- Attributs `alt` sur toutes les images
- Labels sur tous les champs de formulaire
- Navigation clavier fonctionnelle
- Contraste suffisant (WCAG AA minimum)
