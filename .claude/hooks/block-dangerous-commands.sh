#!/bin/bash
# Hook PreToolUse : bloque les commandes dangereuses
# Exit 0 = OK, Exit 2 = bloque

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ "$TOOL_NAME" != "Bash" ]; then
  exit 0
fi

# Commandes interdites
BLOCKED_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \."
  "git push --force"
  "git push -f "
  "git reset --hard"
  "git clean -fd"
  "chmod 777"
  "curl.*| bash"
  "wget.*| bash"
  "eval \$(curl"
  "> /dev/sda"
  "mkfs\."
  "dd if="
  ":(){:|:&};:"
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qiE "$pattern"; then
    echo "Commande bloquee : pattern dangereux detecte ($pattern)" >&2
    exit 2
  fi
done

# Verification des fichiers sensibles
SENSITIVE_FILES=(".env" ".env.local" ".env.production" "credentials" "secrets" "id_rsa" "id_ed25519")

for sensitive in "${SENSITIVE_FILES[@]}"; do
  if echo "$COMMAND" | grep -qE "cat.*$sensitive|less.*$sensitive|more.*$sensitive|head.*$sensitive|tail.*$sensitive"; then
    echo "Commande bloquee : tentative de lecture d'un fichier sensible ($sensitive)" >&2
    exit 2
  fi
done

exit 0
