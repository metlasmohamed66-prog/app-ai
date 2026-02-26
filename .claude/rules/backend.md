---
paths:
  - "src/api/**"
  - "src/server/**"
  - "src/services/**"
  - "**/*.controller.*"
  - "**/*.service.*"
  - "**/*.route.*"
---

# Regles Backend

## API Design
- Endpoints RESTful avec nommage coherent
- Validation des inputs a l'entree (schemas Zod, Joi, ou equivalent)
- Reponses JSON structurees : `{ data, error, meta }`
- Codes HTTP semantiques (201 pour creation, 404 pour non trouve, etc.)

## Base de Donnees
- Requetes parametrees obligatoires (prevention SQL injection)
- Migrations versionees et reversibles
- Index sur les colonnes frequemment recherchees
- Pas de requetes N+1

## Gestion d'Erreurs
- Logger les erreurs avec contexte (pas juste le message)
- Ne pas exposer les details internes dans les reponses API
- Codes d'erreur metier explicites

## Securite
- Authentification sur toutes les routes protegees
- Rate limiting sur les endpoints publics
- CORS configure au minimum necessaire
- Headers de securite (HSTS, CSP, X-Frame-Options)
