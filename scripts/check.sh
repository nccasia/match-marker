#!/usr/bin/env bash
set -e

[ "$(git rev-parse --abbrev-ref HEAD)" = "main" ] && HEAD="HEAD^" || HEAD="origin/main~"

npm i

FILES=$(git diff --name-only $HEAD --diff-filter=ACMR "*.js" "*.tsx" "*.ts" "*.json" | sed 's| |\\ |g')
if [ ! -z "$FILES" ]; then
  if [ -z "$1" ]; then
    npm run lint
  fi
  echo "$FILES" | xargs ./node_modules/.bin/prettier --write
fi

if [[ -z "$1" && `git status --porcelain` ]]; then
  echo Lint problem: Please commit fixed files
  exit 255
fi