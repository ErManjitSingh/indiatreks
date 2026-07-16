#!/usr/bin/env bash
set -euo pipefail
SITE_ROOT="/var/www/api.treks.indiaholidaydestination.com"
MONGO_PASS="IhdMongo2026SecureApi91"
OLD_PASS='IhdMongo2026!Secure#Api91'
JWT_ACCESS="IhdJwtAccessSecretKey2026ProductionGrade32"
JWT_REFRESH="IhdJwtRefreshSecretKey2026ProductionGrade32"

fix_mongo_user() {
  if mongosh --quiet --username ihd_admin --password "$OLD_PASS" --authenticationDatabase admin --eval 'db.runCommand({ ping: 1 })' >/dev/null 2>&1; then
    mongosh --quiet --username ihd_admin --password "$OLD_PASS" --authenticationDatabase admin --eval '
      db = db.getSiblingDB("indiaholidaydestinations");
      try {
        db.updateUser("ihd_app", { pwd: "'"$MONGO_PASS"'", roles: [ { role: "readWrite", db: "indiaholidaydestinations" } ] });
      } catch (e) {
        db.createUser({ user: "ihd_app", pwd: "'"$MONGO_PASS"'", roles: [ { role: "readWrite", db: "indiaholidaydestinations" } ] });
      }
      print("user ready via admin");
    '
  else
    # Authorization may block unauthenticated access — temporarily disable if needed
    if grep -q "authorization: enabled" /etc/mongod.conf; then
      sed -i 's/authorization: enabled/authorization: disabled/' /etc/mongod.conf || true
      systemctl restart mongod
      sleep 3
    fi
    mongosh --quiet --eval '
      db = db.getSiblingDB("indiaholidaydestinations");
      try {
        db.updateUser("ihd_app", { pwd: "'"$MONGO_PASS"'", roles: [ { role: "readWrite", db: "indiaholidaydestinations" } ] });
      } catch (e) {
        db.createUser({ user: "ihd_app", pwd: "'"$MONGO_PASS"'", roles: [ { role: "readWrite", db: "indiaholidaydestinations" } ] });
      }
      print("user ready local");
    '
    if ! grep -q "authorization: enabled" /etc/mongod.conf; then
      if grep -q "^security:" /etc/mongod.conf; then
        sed -i 's/authorization: disabled/authorization: enabled/' /etc/mongod.conf || \
          sed -i '/^security:/a\  authorization: enabled' /etc/mongod.conf
      else
        printf '\nsecurity:\n  authorization: enabled\n' >> /etc/mongod.conf
      fi
      systemctl restart mongod
      sleep 3
    fi
  fi
}

fix_mongo_user

cat > "$SITE_ROOT/.env" <<EOF
NODE_ENV=production
PORT=4000
API_PREFIX=/api/v1
APP_NAME=India Holiday Destinations API
APP_URL=https://treks.indiaholidaydestination.com
FRONTEND_URL=https://treks.indiaholidaydestination.com
CORS_ORIGINS=https://treks.indiaholidaydestination.com,https://indiaholidaydestination.com,http://localhost:3000
MONGODB_URI=mongodb://ihd_app:${MONGO_PASS}@127.0.0.1:27017/indiaholidaydestinations?authSource=indiaholidaydestinations
MONGODB_DB=indiaholidaydestinations
JWT_ACCESS_SECRET=${JWT_ACCESS}
JWT_REFRESH_SECRET=${JWT_REFRESH}
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=300
UPLOAD_MAX_MB=10
SEED_SUPERADMIN_EMAIL=admin@indiaholidaydestinations.com
SEED_SUPERADMIN_PASSWORD=IhdAdmin2026Secure
SEED_SUPERADMIN_NAME=Super Admin
ENQUIRY_EMAIL=indiaholidaydestinations.in@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
EOF
chmod 600 "$SITE_ROOT/.env"

cd "$SITE_ROOT/app/backend"
cp "$SITE_ROOT/.env" .env

cat > ecosystem.config.cjs <<'ECO'
module.exports = {
  apps: [
    {
      name: "ihd-api",
      script: "dist/server.js",
      cwd: "/var/www/api.treks.indiaholidaydestination.com/app/backend",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      env: { NODE_ENV: "production" },
      error_file: "/var/www/api.treks.indiaholidaydestination.com/logs/error.log",
      out_file: "/var/www/api.treks.indiaholidaydestination.com/logs/out.log",
      merge_logs: true,
      time: true,
      autorestart: true,
      watch: false,
    },
  ],
};
ECO

npm run seed
npm run seed:treks
pm2 delete ihd-api >/dev/null 2>&1 || true
pm2 start ecosystem.config.cjs
pm2 save

TREKS_NGINX="/etc/nginx/sites-available/treks.indiaholidaydestination.com"
if [ -f "$TREKS_NGINX" ] && ! grep -q "127.0.0.1:4000" "$TREKS_NGINX"; then
python3 - <<'PY'
from pathlib import Path
p = Path("/etc/nginx/sites-available/treks.indiaholidaydestination.com")
text = p.read_text()
snippet = """
    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
        client_max_body_size 20M;
    }
    location /socket.io/ {
        proxy_pass http://127.0.0.1:4000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
"""
if "location /api/" not in text:
    idx = text.rfind("location / {")
    if idx != -1:
        p.write_text(text[:idx] + snippet + "\n" + text[idx:])
        print("nginx updated")
PY
  nginx -t && systemctl reload nginx
fi

sleep 2
curl -sS http://127.0.0.1:4000/api/v1/health; echo
curl -sS "http://127.0.0.1:4000/api/v1/treks?limit=1" | head -c 600; echo
pm2 list | grep ihd-api || true
