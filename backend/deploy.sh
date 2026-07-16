#!/usr/bin/env bash
# Deploy IHD backend API on VPS
set -euo pipefail

SITE_ROOT="/var/www/api.treks.indiaholidaydestination.com"
APP_DIR="$SITE_ROOT/app"
REPO="${REPO_URL:-https://github.com/ErManjitSingh/indiatreks.git}"

mkdir -p "$SITE_ROOT/logs" "$SITE_ROOT/uploads"

if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git fetch origin
  git reset --hard origin/master
else
  rm -rf "$APP_DIR"
  git clone "$REPO" "$APP_DIR"
fi

cd "$APP_DIR/backend"

if [ ! -f "$SITE_ROOT/.env" ]; then
  echo "ERROR: Missing $SITE_ROOT/.env — copy from .env.example and configure MongoDB/JWT/SMTP."
  exit 1
fi

cp "$SITE_ROOT/.env" "$APP_DIR/backend/.env"
chmod 600 "$APP_DIR/backend/.env" "$SITE_ROOT/.env"

npm ci
npm run build

mkdir -p uploads logs
cp -a "$SITE_ROOT/uploads/." uploads/ 2>/dev/null || true

pm2 delete ihd-api >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save

echo "Backend deploy complete"
echo "Health: curl -s http://127.0.0.1:4000/api/v1/health"
