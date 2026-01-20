#!/usr/bin/env bash
set -euo pipefail

# Usage: sudo ./scripts/remote-setup.sh /var/www/delight-frontend
# Bootstraps a minimal static-site host (nginx) and prepares the deploy directory.

DEPLOY_DIR="${1:-/var/www/delight-frontend}"

apt update
apt install -y nginx

mkdir -p "$DEPLOY_DIR"
chown -R deploy:deploy "$DEPLOY_DIR" || true

NGINX_CONF="/etc/nginx/sites-available/delight-frontend"

cat > "$NGINX_CONF" <<EOF
server {
  listen 80;
  server_name _;
  root $DEPLOY_DIR;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html;
  }
}
EOF

ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/delight-frontend
nginx -t
systemctl reload nginx

echo "Server bootstrapped. Deploy directory: $DEPLOY_DIR"
