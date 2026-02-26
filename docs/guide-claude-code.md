# Guide Claude Code - Equipe Interne

> Configuration de reference et bonnes pratiques pour utiliser Claude Code efficacement au quotidien.

---

## Table des matieres

1. [Installation & Setup](#1-installation--setup)
2. [Architecture du projet](#2-architecture-du-projet)
3. [Les Skills (commandes slash)](#3-les-skills-commandes-slash)
4. [Les Agents specialises](#4-les-agents-specialises)
5. [Les Hooks (automatisation)](#5-les-hooks-automatisation)
6. [Les Regles modulaires](#6-les-regles-modulaires)
7. [GitHub Actions](#7-github-actions)
8. [Bonnes pratiques au quotidien](#8-bonnes-pratiques-au-quotidien)
9. [Commandes essentielles](#9-commandes-essentielles)
10. [Depannage](#10-depannage)

---

## 1. Installation & Setup

### Installer Claude Code

```bash
# Installation native (recommande - mise a jour auto)
curl -fsSL https://claude.ai/install.sh | bash

# macOS via Homebrew
brew install --cask claude-code

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

### Premier lancement dans le projet

```bash
cd votre-projet
claude
# Claude va automatiquement lire le CLAUDE.md et les regles
```

### Initialiser un nouveau projet

```bash
claude /init
# Genere un CLAUDE.md de base a partir de l'analyse du projet
```

---

## 2. Architecture du projet

Voici la structure de configuration mise en place :

```
.
├── CLAUDE.md                          # Instructions principales du projet
├── .claude/
│   ├── settings.json                  # Parametres, permissions, hooks
│   ├── rules/                         # Regles modulaires par contexte
│   │   ├── general.md                 # Regles generales (toujours actives)
│   │   ├── git-workflow.md            # Conventions Git
│   │   ├── frontend.md               # Regles frontend (actives sur src/components/**)
│   │   └── backend.md                # Regles backend (actives sur src/api/**)
│   ├── skills/                        # Commandes slash personnalisees
│   │   ├── review/SKILL.md            # /review - Revue de code
│   │   ├── commit/SKILL.md            # /commit - Commit intelligent
│   │   ├── refactor/SKILL.md          # /refactor - Analyse de refactoring
│   │   └── test-gen/SKILL.md          # /test-gen - Generation de tests
│   ├── agents/                        # Subagents specialises
│   │   ├── code-reviewer.md           # Agent de revue automatique
│   │   ├── architect.md               # Agent architecte
│   │   └── security-auditor.md        # Agent audit securite
│   └── hooks/                         # Scripts d'automatisation
│       ├── block-dangerous-commands.sh # Bloque les commandes dangereuses
│       ├── lint-before-commit.sh       # Lint automatique avant commit
│       └── post-commit-summary.sh      # Resume apres commit
└── .github/
    └── workflows/
        └── claude.yml                 # GitHub Actions pour @claude
```

### Hierarchie de memoire

Claude Code charge les instructions dans cet ordre (du plus prioritaire au moins) :

| Priorite | Fichier | Portee |
|----------|---------|--------|
| 1 | `CLAUDE.md` (racine) | Tout le projet, partage via Git |
| 2 | `.claude/rules/*.md` | Regles contextuelles (filtrees par chemin) |
| 3 | `~/.claude/CLAUDE.md` | Globale utilisateur (tous les projets) |
| 4 | `CLAUDE.local.md` | Locale, non commitee (preferences perso) |

---

## 3. Les Skills (commandes slash)

Les skills sont des commandes invocables avec `/nom` dans Claude Code.

### `/review [fichier]` - Revue de code

Effectue une revue de code structuree avec feedback classe par severite.

```
> /review src/api/users.ts
> /review                      # Analyse les changements en cours (git diff)
```

**Sortie** : Rapport avec points BLOQUANT / SUGGESTION / INFO + verdict final.

### `/commit [message]` - Commit intelligent

Analyse les changements, stage les bons fichiers, et cree un commit au format conventionnel.

```
> /commit                      # Analyse et genere le message automatiquement
> /commit fix login timeout    # Utilise le message comme base
```

**Securite** : Ne stage jamais `.env`, `credentials.*`, `node_modules/`.

### `/refactor [cible]` - Analyse de refactoring

Analyse le code et produit un plan de refactoring structure (ne modifie rien).

```
> /refactor src/services/auth.ts
> /refactor src/components/
```

**Sortie** : Diagnostic + Plan d'etapes ordonnees par risque + Estimation de taille.

### `/test-gen [cible]` - Generation de tests

Genere des tests complets (happy path + edge cases + error cases).

```
> /test-gen src/utils/validators.ts
> /test-gen                    # Genere pour les fichiers recemment modifies
```

**Adaptatif** : Detecte automatiquement le framework de test (Jest, Vitest, Mocha, etc.).

---

## 4. Les Agents specialises

Les agents sont des subagents qui tournent dans leur propre contexte, sans polluer la conversation principale.

### Invocation

```
> Utilise l'agent code-reviewer pour analyser les changements de la PR
> Lance l'agent security-auditor sur le dossier src/api/
> Demande a l'agent architect d'analyser la structure du projet
```

### Agents disponibles

| Agent | Role | Modele | Mode |
|-------|------|--------|------|
| `code-reviewer` | Revue de code detaillee | Sonnet | Lecture seule |
| `architect` | Analyse architecturale | Sonnet | Lecture seule |
| `security-auditor` | Audit de securite OWASP | Sonnet | Lecture seule |

Tous les agents fonctionnent en **mode lecture seule** (permission `plan`) : ils analysent mais ne modifient jamais le code.

---

## 5. Les Hooks (automatisation)

Les hooks s'executent automatiquement a certains moments du workflow.

### Hooks actifs

| Hook | Evenement | Action |
|------|-----------|--------|
| `block-dangerous-commands.sh` | PreToolUse (Bash) | Bloque `rm -rf`, `--force push`, lecture de `.env`, etc. |
| `lint-before-commit.sh` | PreToolUse (Bash) | Lance `npm run lint` avant chaque commit |
| `post-commit-summary.sh` | PostToolUse (Bash) | Affiche un resume apres chaque commit reussi |

### Comment ca marche

1. Claude veut executer une commande Bash
2. **PreToolUse** : les hooks de pre-verification s'executent
   - Si exit code 2 -> commande bloquee avec message d'erreur
   - Si exit code 0 -> commande autorisee
3. La commande s'execute
4. **PostToolUse** : les hooks de post-traitement s'executent

### Ajouter un hook

Creer un script dans `.claude/hooks/` et l'enregistrer dans `.claude/settings.json` :

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/mon-nouveau-hook.sh"
          }
        ]
      }
    ]
  }
}
```

Le script recoit un JSON sur stdin avec `tool_name`, `tool_input`, et `tool_output` (pour PostToolUse).

---

## 6. Les Regles modulaires

Les fichiers dans `.claude/rules/` sont charges automatiquement selon le contexte.

### Regles globales (toujours actives)

- `general.md` : principes fondamentaux, qualite du code, securite
- `git-workflow.md` : conventions Git, format de commits, workflow PR

### Regles contextuelles (filtrees par chemin)

- `frontend.md` : active uniquement quand Claude travaille sur `src/components/**`, `**/*.tsx`, etc.
- `backend.md` : active uniquement quand Claude travaille sur `src/api/**`, `**/*.controller.*`, etc.

### Creer une nouvelle regle contextuelle

```markdown
---
paths:
  - "src/tests/**"
  - "**/*.test.*"
  - "**/*.spec.*"
---

# Regles de Test

- Utiliser `describe` / `it` avec des descriptions claires en anglais
- Un `describe` par module, un `it` par comportement
- ...
```

---

## 7. GitHub Actions

### Fonctionnement

Le workflow `.github/workflows/claude.yml` active 3 automatisations :

| Trigger | Action | Modele |
|---------|--------|--------|
| Commentaire `@claude` sur PR/issue | Claude repond et agit selon la demande | Opus (25 tours max) |
| PR marquee "Ready for review" | Revue automatique avec `/review` | Sonnet (10 tours) |
| Nouvelle issue ouverte | Triage automatique (classification, complexite, fichiers) | Sonnet (5 tours) |

### Prerequis

1. Installer l'app GitHub Claude : https://github.com/apps/claude
2. Ajouter le secret `ANTHROPIC_API_KEY` dans Settings > Secrets > Actions

### Utilisation dans les PR/Issues

```
@claude implemente cette feature selon la description de l'issue
@claude corrige le TypeError dans le composant UserDashboard
@claude comment implementer l'authentification pour cet endpoint ?
@claude /review
```

---

## 8. Bonnes pratiques au quotidien

### Le workflow ideal

```
1. Explorer   -> Ctrl+G (Plan Mode) pour comprendre le code
2. Planifier  -> Demander a Claude de creer un plan d'implementation
3. Coder      -> Ctrl+G (Normal Mode) pour implementer
4. Verifier   -> /review ou tests
5. Commiter   -> /commit
6. Nettoyer   -> /clear entre les taches non liees
```

### Gestion du contexte (CRITIQUE)

Le contexte est la ressource la plus precieuse. Quand il se remplit, la qualite se degrade.

| Situation | Action |
|-----------|--------|
| Nouvelle tache sans lien | `/clear` |
| Investigation longue | Utiliser un subagent (`Task(Explore)`) |
| Contexte trop charge | `/compact` avec instructions de focus |
| 2 tentatives de correction echouees | `/clear` + reformuler la demande |

### Fournir du contexte specifique

```
# Mauvais
> Corrige le bug de login

# Bon
> Le formulaire de login dans src/components/LoginForm.tsx
> renvoie une erreur 401 meme avec des credentials valides.
> Le endpoint POST /api/auth/login est dans src/api/auth.controller.ts.
> Voir le log d'erreur : [coller le log]
```

### Verifier le travail de Claude

Toujours fournir un moyen de verification :
- **Tests** : "Lance `npm test` apres les modifications"
- **Build** : "Verifie que `npm run build` passe"
- **Visuel** : Coller un screenshot de l'UI attendue

---

## 9. Commandes essentielles

### Navigation

| Commande | Action |
|----------|--------|
| `claude` | Demarrer une session interactive |
| `claude -c` | Reprendre la derniere conversation |
| `claude -r "nom"` | Reprendre une session par nom |
| `/clear` | Nettoyer le contexte |
| `/compact` | Compacter le contexte |
| `Ctrl+G` | Basculer Plan Mode / Normal Mode |
| `Esc` | Arreter l'action en cours |
| `Esc+Esc` ou `/rewind` | Annuler et restaurer |

### Analyse

| Commande | Action |
|----------|--------|
| `/review [fichier]` | Revue de code |
| `/refactor [cible]` | Analyse de refactoring |
| `/test-gen [cible]` | Generation de tests |

### Git

| Commande | Action |
|----------|--------|
| `/commit [msg]` | Commit intelligent |

### Permissions

| Commande | Action |
|----------|--------|
| `/permissions` | Gerer les permissions |
| `/sandbox` | Activer le sandboxing |
| `/mcp` | Status des serveurs MCP |

### Mode headless (CI/scripts)

```bash
# Execution non-interactive
claude -p "Analyse le fichier src/api/users.ts et liste les problemes"

# Avec pipe
cat error.log | claude -p "Explique cette erreur et propose une correction"

# Avec budget et limites
claude -p "Migre ce fichier vers TypeScript" --max-turns 10 --max-budget-usd 0.50

# Output structure
claude -p "Liste les fonctions exportees" --output-format json
```

---

## 10. Depannage

### Claude ne respecte pas les regles

1. Verifier que `CLAUDE.md` est a la racine du projet
2. Verifier que les fichiers `.claude/rules/*.md` ont le bon frontmatter `paths:`
3. Lancer `/clear` et recommencer (le contexte pollue peut dominer)

### Le contexte se remplit trop vite

1. Utiliser les subagents pour les investigations : "Utilise un subagent pour explorer..."
2. `/compact` avec des instructions : "/compact garde uniquement le plan d'implementation"
3. Reduire `CLAUDE_CODE_AUTOCOMPACT_PCT_OVERRIDE` dans les settings (actuellement 70%)

### Les hooks ne fonctionnent pas

1. Verifier que les scripts sont executables : `chmod +x .claude/hooks/*.sh`
2. Verifier la syntaxe JSON dans `.claude/settings.json`
3. Tester le script manuellement : `echo '{"tool_name":"Bash","tool_input":{"command":"test"}}' | .claude/hooks/mon-hook.sh`

### Claude refuse une action autorisee

Verifier les regles de permissions dans `.claude/settings.json` :
- `allow` : liste blanche (patterns glob)
- `deny` : liste noire (prioritaire sur allow)

### Performance degradee

- Symptome : reponses lentes, resultats de mauvaise qualite
- Cause probable : contexte trop charge
- Solution : `/clear` et reformuler avec un prompt precis et contexte minimal
