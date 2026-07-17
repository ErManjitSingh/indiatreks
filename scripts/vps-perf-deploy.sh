#!/usr/bin/env bash
set -euo pipefail
SITE_ROOT="/var/www/api.treks.indiaholidaydestination.com"
cd "$SITE_ROOT/app"
git fetch origin
git reset --hard origin/master
cd "$SITE_ROOT/app/backend"
cp "$SITE_ROOT/.env" .env
npm ci
npm run build
pm2 delete ihd-api >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save
sleep 1
echo "== sizes =="
curl -s -o /tmp/b.json -w "bootstrap:%{size_download}\n" http://127.0.0.1:4000/api/v1/content/bootstrap
curl -s -o /tmp/t.json -w "treks100:%{size_download}\n" "http://127.0.0.1:4000/api/v1/treks?limit=100"
bash /var/www/treks.indiaholidaydestination.com/deploy.sh
