#!/bin/bash
# Hook PreToolUse : lance le linter avant un commit
# S'active uniquement avant une commande git commit

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ "$TOOL_NAME" != "Bash" ]; then
  exit 0
fi

if ! echo "$COMMAND" | grep -q "git commit"; then
  exit 0
fi

# Verifier si un script de lint existe
if [ -f "package.json" ] && grep -q '"lint"' package.json 2>/dev/null; then
  LINT_OUTPUT=$(npm run lint 2>&1)
  LINT_EXIT=$?

  if [ $LINT_EXIT -ne 0 ]; then
    echo "Le linter a detecte des erreurs. Corrigez-les avant de commiter." >&2
    echo "$LINT_OUTPUT" >&2
    exit 2
  fi

  cat <<EOF
{
  "hookSpecificOutput": {
    "additionalContext": "Lint OK - aucune erreur detectee"
  }
}
EOF
fi

exit 0
