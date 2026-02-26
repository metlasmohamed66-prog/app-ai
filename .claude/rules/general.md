# Regles Generales

## Principes Fondamentaux
- Lire le code existant avant toute modification
- Explorer d'abord, planifier ensuite, coder enfin
- Ne jamais sur-ingenierer : la solution la plus simple est la meilleure
- Un changement = un objectif precis, pas de modifications opportunistes

## Qualite du Code
- Pas de code mort, pas de variables inutilisees
- Pas de `any` en TypeScript sauf cas exceptionnels justifies
- Pas de `console.log` en production (utiliser un logger structure)
- Gerer les erreurs aux frontieres du systeme (input utilisateur, API externes)
- Ne pas ajouter de gestion d'erreur pour des cas qui ne peuvent pas se produire

## Documentation
- Ne pas ajouter de commentaires pour du code auto-explicatif
- Commenter uniquement la logique non evidente (le "pourquoi", pas le "quoi")
- Ne pas creer de fichiers README sauf si explicitement demande

## Securite
- Jamais de secrets dans le code source
- Valider les inputs utilisateur
- Echapper les outputs (prevention XSS)
- Requetes parametrees (prevention SQL injection)
