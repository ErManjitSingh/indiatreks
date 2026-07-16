#!/usr/bin/env bash
# Live deploy for treks.indiaholidaydestination.com
# Loads Gmail SMTP secrets from $SITE_ROOT/.env (never committed to git).
set -euo pipefail

git config --global --add safe.directory /var/www/treks.indiaholidaydestination.com/app 2>/dev/null || true

SITE_ROOT="/var/www/treks.indiaholidaydestination.com"
APP_DIR="$SITE_ROOT/app"
PUBLIC_HTML="$SITE_ROOT/public_html"
ENV_FILE="$SITE_ROOT/.env"
PORT=3010

cd "$APP_DIR"
git fetch origin
git reset --hard origin/master

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
else
  echo "WARNING: $ENV_FILE missing — enquiry emails / API URL may fail until env is set."
fi

# Ensure public API base is available at Next.js build time (SSR + client).
export NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-https://treks.indiaholidaydestination.com/api/v1}"
export API_URL="${API_URL:-$NEXT_PUBLIC_API_URL}"

npm ci
npm run build

rm -rf "$PUBLIC_HTML/.next-deploy"
mkdir -p "$PUBLIC_HTML/.next-deploy"
cp -a "$APP_DIR/.next/standalone/." "$PUBLIC_HTML/.next-deploy/"
mkdir -p "$PUBLIC_HTML/.next-deploy/.next"
cp -a "$APP_DIR/.next/static" "$PUBLIC_HTML/.next-deploy/.next/static"
cp -a "$APP_DIR/public" "$PUBLIC_HTML/.next-deploy/public"

if [[ -f "$ENV_FILE" ]]; then
  cp "$ENV_FILE" "$PUBLIC_HTML/.next-deploy/.env"
  chmod 600 "$PUBLIC_HTML/.next-deploy/.env"
fi

chown -R www-data:www-data "$SITE_ROOT"
chmod 600 "$ENV_FILE" 2>/dev/null || true
chmod 600 "$PUBLIC_HTML/.next-deploy/.env" 2>/dev/null || true

cd "$PUBLIC_HTML/.next-deploy"
export PORT
export NODE_ENV=production
export ENQUIRY_EMAIL="${ENQUIRY_EMAIL:-indiaholidaydestinations.in@gmail.com}"
export SMTP_HOST="${SMTP_HOST:-smtp.gmail.com}"
export SMTP_PORT="${SMTP_PORT:-465}"
export SMTP_USER="${SMTP_USER:-indiaholidaydestinations.in@gmail.com}"
export SMTP_PASS="${SMTP_PASS:-}"
export NEXT_PUBLIC_API_URL
export API_URL

pm2 delete indiatreks >/dev/null 2>&1 || true
pm2 start server.js --name indiatreks --cwd "$PUBLIC_HTML/.next-deploy"
pm2 save

echo "Deploy complete: https://treks.indiaholidaydestination.com"
