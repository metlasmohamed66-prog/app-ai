# App AI - Claude Code Best Practices

Configuration de reference et guide de bonnes pratiques pour Claude Code, destine a l'usage interne de l'equipe.

## Contenu

- **CLAUDE.md** : Instructions projet chargees automatiquement par Claude Code
- **.claude/** : Configuration complete (settings, rules, skills, agents, hooks)
- **.github/workflows/claude.yml** : Automatisation GitHub Actions (@claude)
- **docs/guide-claude-code.md** : Guide complet pour l'equipe

## Demarrage rapide

```bash
# 1. Installer Claude Code
curl -fsSL https://claude.ai/install.sh | bash

# 2. Cloner et ouvrir le projet
git clone <repo-url> && cd app-ai
claude

# 3. Claude charge automatiquement les regles et skills
```

## Skills disponibles

| Commande | Description |
|----------|-------------|
| `/review` | Revue de code structuree |
| `/commit` | Commit intelligent au format conventionnel |
| `/refactor` | Analyse et plan de refactoring |
| `/test-gen` | Generation de tests |

## Documentation

Voir [docs/guide-claude-code.md](docs/guide-claude-code.md) pour le guide complet.
