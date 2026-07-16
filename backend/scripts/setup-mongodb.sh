#!/usr/bin/env bash
# Install & harden MongoDB + create indiaholidaydestinations DB/user
set -euo pipefail

DB_NAME="indiaholidaydestinations"
DB_USER="ihd_app"
DB_PASS="${1:-}"

if [ -z "$DB_PASS" ]; then
  echo "Usage: bash setup-mongodb.sh <strong-password>"
  exit 1
fi

if ! command -v mongod >/dev/null 2>&1; then
  echo "==> Installing MongoDB 7 Community"
  apt-get update -y
  apt-get install -y gnupg curl
  curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
  echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" > /etc/apt/sources.list.d/mongodb-org-7.0.list
  apt-get update -y
  apt-get install -y mongodb-org
fi

systemctl enable mongod
systemctl start mongod

# Bind localhost only
if grep -q "bindIp:" /etc/mongod.conf; then
  sed -i 's/bindIp:.*/bindIp: 127.0.0.1/' /etc/mongod.conf
else
  cat >> /etc/mongod.conf <<EOF
net:
  bindIp: 127.0.0.1
  port: 27017
EOF
fi

systemctl restart mongod
sleep 2

mongosh --quiet <<EOF
use admin
if (db.getUser("ihd_admin") == null) {
  db.createUser({
    user: "ihd_admin",
    pwd: "${DB_PASS}",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, { role: "readWriteAnyDatabase", db: "admin" } ]
  })
}
use ${DB_NAME}
if (db.getUser("${DB_USER}") == null) {
  db.createUser({
    user: "${DB_USER}",
    pwd: "${DB_PASS}",
    roles: [ { role: "readWrite", db: "${DB_NAME}" } ]
  })
} else {
  db.updateUser("${DB_USER}", { pwd: "${DB_PASS}", roles: [ { role: "readWrite", db: "${DB_NAME}" } ] })
}
db.createCollection("_init")
EOF

# Enable auth if not already
if ! grep -q "authorization: enabled" /etc/mongod.conf; then
  if grep -q "^security:" /etc/mongod.conf; then
    sed -i '/^security:/a\  authorization: enabled' /etc/mongod.conf
  else
    cat >> /etc/mongod.conf <<EOF

security:
  authorization: enabled
EOF
  fi
  systemctl restart mongod
fi

echo "MongoDB ready"
echo "URI: mongodb://${DB_USER}:${DB_PASS}@127.0.0.1:27017/${DB_NAME}?authSource=${DB_NAME}"
