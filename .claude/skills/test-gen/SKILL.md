---
name: test-gen
description: "Genere des tests unitaires et d'integration"
argument-hint: "[fichier ou fonction a tester]"
allowed-tools: Read, Grep, Glob, Bash
---

# Skill : Generateur de Tests

Genere des tests complets pour le code specifie.

## Cible
- Argument : $ARGUMENTS
- Si aucun argument, analyser les fichiers modifies recemment : !`git diff --name-only HEAD~3 2>/dev/null | head -10`

## Methodologie

### 1. Analyse du code source
- Lire et comprendre le fichier/fonction cible
- Identifier les inputs, outputs, effets de bord
- Reperer les cas limites et les branches conditionnelles
- Verifier le framework de test utilise dans le projet : !`ls package.json 2>/dev/null && cat package.json | grep -E "jest|vitest|mocha|cypress|playwright" 2>/dev/null || echo "Framework non detecte"`

### 2. Generation des tests

Generer des tests couvrant :

**Cas nominaux (Happy Path)**
- Comportement attendu avec des inputs valides
- Chaque branche principale du code

**Cas limites (Edge Cases)**
- Valeurs nulles/undefined/vides
- Tableaux vides, chaines vides
- Nombres negatifs, zero, tres grands nombres
- Caracteres speciaux dans les chaines

**Cas d'erreur (Error Cases)**
- Inputs invalides
- Erreurs reseau/IO (si applicable)
- Timeouts (si applicable)

**Integration (si applicable)**
- Interaction entre composants
- Appels API mockes
- Etat de la base de donnees

### 3. Conventions
- Nommage : `describe("NomModule", () => { it("should ...", () => {}) })`
- Un `describe` par module/fonction
- Description en anglais, claire et specifique
- Utiliser les matchers les plus specifiques (`toEqual` vs `toBe`)
- Mocker uniquement ce qui est necessaire (pas de mocks excessifs)

## Regles
- Adapter au framework de test du projet (Jest, Vitest, Mocha, etc.)
- Placer les fichiers de test selon la convention du projet (`__tests__/`, `*.test.*`, `*.spec.*`)
- Ne pas tester les details d'implementation, tester le comportement
- Chaque test doit etre independant et idempotent
