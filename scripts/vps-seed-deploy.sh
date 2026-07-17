#!/usr/bin/env bash
set -euo pipefail
SITE_ROOT="/var/www/api.treks.indiaholidaydestination.com"
cd "$SITE_ROOT/app"
git fetch origin
git reset --hard origin/master
cd "$SITE_ROOT/app/backend"
cp "$SITE_ROOT/.env" .env
chmod 600 .env
npm ci
npm run build
echo "==> Seeding Mongo"
npm run seed:all
pm2 delete ihd-api >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save
sleep 2
echo "==> Health"
curl -s http://127.0.0.1:4000/api/v1/health; echo
curl -s -o /tmp/bootstrap.json -w "bootstrap:%{http_code}\n" http://127.0.0.1:4000/api/v1/content/bootstrap
python3 - <<'PY'
import json
d=json.load(open("/tmp/bootstrap.json"))
data=d.get("data") or {}
print("site", (data.get("site") or {}).get("name"))
print("keys", sorted(data.keys()))
print("trekCount", (data.get("meta") or {}).get("trekCount"))
PY
ENVF=/var/www/treks.indiaholidaydestination.com/.env
touch "$ENVF"
grep -q '^NEXT_PUBLIC_API_URL=' "$ENVF" && sed -i 's|^NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=https://treks.indiaholidaydestination.com/api/v1|' "$ENVF" || echo 'NEXT_PUBLIC_API_URL=https://treks.indiaholidaydestination.com/api/v1' >> "$ENVF"
grep -q '^API_URL=' "$ENVF" && sed -i 's|^API_URL=.*|API_URL=https://treks.indiaholidaydestination.com/api/v1|' "$ENVF" || echo 'API_URL=https://treks.indiaholidaydestination.com/api/v1' >> "$ENVF"
chmod 600 "$ENVF"
echo "==> Frontend deploy"
bash /var/www/treks.indiaholidaydestination.com/deploy.sh
