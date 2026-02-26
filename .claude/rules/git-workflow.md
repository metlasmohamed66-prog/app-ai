# Regles Git & Workflow

## Branches
- `main` / `master` : branche protegee, jamais de push direct
- `feature/<nom>` : nouvelles fonctionnalites
- `fix/<nom>` : corrections de bugs
- `docs/<nom>` : documentation
- `refactor/<nom>` : refactoring sans changement fonctionnel

## Commits
- Format : `type(scope): description concise`
- Types : `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`
- Description en anglais, imperatif present ("add", pas "added")
- Max 72 caracteres pour la premiere ligne
- Corps du commit si necessaire pour expliquer le "pourquoi"

## Pull Requests
- Titre court (< 70 caracteres)
- Description avec sections : Summary, Test Plan
- Toujours lier a une issue si applicable
- Review obligatoire avant merge

## Interdictions
- Jamais de `--force push` sur les branches partagees
- Jamais de `--no-verify` sauf en environnement sandboxe
- Jamais de `git reset --hard` sans confirmation explicite
- Ne pas amender un commit deja pousse
