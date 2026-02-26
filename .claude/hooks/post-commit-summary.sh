#!/bin/bash
# Hook PostToolUse : affiche un resume apres un commit git
# S'active uniquement apres une commande git commit

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
STDOUT=$(echo "$INPUT" | jq -r '.tool_output.stdout // empty')

if [ "$TOOL_NAME" != "Bash" ]; then
  exit 0
fi

if ! echo "$COMMAND" | grep -q "git commit"; then
  exit 0
fi

# Si le commit a reussi, afficher un resume
if echo "$STDOUT" | grep -qE "^\["; then
  BRANCH=$(git branch --show-current 2>/dev/null)
  HASH=$(git rev-parse --short HEAD 2>/dev/null)
  MSG=$(git log -1 --pretty=format:"%s" 2>/dev/null)
  FILES=$(git diff --stat HEAD~1 HEAD 2>/dev/null | tail -1)

  cat <<EOF
{
  "hookSpecificOutput": {
    "additionalContext": "Commit cree avec succes sur $BRANCH ($HASH): $MSG | $FILES"
  }
}
EOF
fi

exit 0
