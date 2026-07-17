#!/usr/bin/env bash
set -euo pipefail

# Backend
SITE_ROOT="/var/www/api.treks.indiaholidaydestination.com"
cd "$SITE_ROOT/app"
git fetch origin
git reset --hard origin/master
cd "$SITE_ROOT/app/backend"
cp "$SITE_ROOT/.env" .env
# Lengthen access token for admin UX
if grep -q '^JWT_ACCESS_EXPIRES=' "$SITE_ROOT/.env"; then
  sed -i 's/^JWT_ACCESS_EXPIRES=.*/JWT_ACCESS_EXPIRES=12h/' "$SITE_ROOT/.env"
else
  echo 'JWT_ACCESS_EXPIRES=12h' >> "$SITE_ROOT/.env"
fi
cp "$SITE_ROOT/.env" .env
chmod 600 .env "$SITE_ROOT/.env"
npm ci
npm run build
pm2 delete ihd-api >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save

# Frontend
bash /var/www/treks.indiaholidaydestination.com/deploy.sh
