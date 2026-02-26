---
name: commit
description: "Cree un commit propre avec message conventionnel"
argument-hint: "[message optionnel]"
allowed-tools: Read, Bash, Grep, Glob
---

# Skill : Smart Commit

Cree un commit Git propre et bien structure.

## Etat actuel
- Status : !`git status --short 2>/dev/null`
- Diff staged : !`git diff --cached --stat 2>/dev/null`
- Diff unstaged : !`git diff --stat 2>/dev/null`
- Derniers commits : !`git log --oneline -5 2>/dev/null`

## Instructions

1. **Analyse les changements** (staged et unstaged) pour comprendre ce qui a ete fait
2. **Stage les fichiers pertinents** (pas de `git add -A`, ajouter fichier par fichier)
3. **Ne JAMAIS stager** : `.env`, `*.secret`, `credentials.*`, `node_modules/`
4. **Genere un message** au format conventionnel :
   - `type(scope): description`
   - Types : `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`
   - Description en anglais, imperatif present, max 72 caracteres
   - Corps si necessaire pour expliquer le "pourquoi"
5. Si `$ARGUMENTS` est fourni, utilise-le comme base pour le message
6. **Cree le commit** avec le message genere
7. **Affiche un resume** du commit cree

## Regles strictes
- Ne jamais utiliser `--no-verify`
- Ne jamais amender un commit existant sauf demande explicite
- Si le pre-commit hook echoue, corriger le probleme et creer un NOUVEAU commit
- Verifier avec `git status` apres le commit
