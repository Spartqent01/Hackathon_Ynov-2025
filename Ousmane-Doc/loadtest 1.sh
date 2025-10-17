#!/usr/bin/env bash
set -euo pipefail
if ! command -v npx >/dev/null 2>&1; then
  echo "npx manquant. Installe Node.js (>=16)." >&2
  exit 1
fi
npx autocannon -d 30 -c 50 http://localhost/api/healthz
