# CLAUDE.md - Configuration Projet

## Projet
Ce repository contient le guide de bonnes pratiques et la configuration de référence pour Claude Code, destiné à l'usage interne de l'équipe.

## Langue
- Toujours répondre en **français** sauf si le code ou les commentaires de code doivent être en anglais.
- Les messages de commit sont en **anglais** (convention standard).
- La documentation interne est en **français**.

## Stack & Outils
- Outil principal : **Claude Code** (CLI, VS Code, JetBrains, Web)
- CI/CD : **GitHub Actions** avec `anthropics/claude-code-action@v1`
- Versioning : **Git** avec branches conventionnelles

## Conventions Git
- Branches : `feature/`, `fix/`, `docs/`, `refactor/`
- Commits : format conventionnel (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`)
- Toujours créer une PR pour merge vers `main` ou `master`
- Ne jamais `--force push` sur les branches partagées

## Style de Code
- Indentation : 2 espaces
- Pas de `console.log` en production
- Nommage : camelCase pour variables/fonctions, PascalCase pour classes/composants
- Fichiers : kebab-case

## Commandes Utiles
- `npm run lint` : vérification du style
- `npm run test` : exécution des tests
- `npm run build` : build de production

## Workflow Claude Code
1. Toujours lire le code existant avant de modifier
2. Explorer d'abord, planifier ensuite, coder enfin
3. Utiliser `/compact` entre les tâches non liées
4. Fournir un moyen de vérification (tests, screenshots)
5. Utiliser les subagents pour les investigations longues

## Imports & Références
- Voir @docs/guide-claude-code.md pour le guide complet de l'équipe
- Voir @.claude/rules/ pour les règles modulaires
