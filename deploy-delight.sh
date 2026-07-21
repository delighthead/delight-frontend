#!/usr/bin/env bash
set -euo pipefail

LOCAL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SSH_KEY="${SSH_KEY:-$HOME/.ssh/deploy_key}"
SSH_USER="${SSH_USER:-root}"
SSH_HOST="${SSH_HOST:-delightintschool.com}"

REMOTE_FRONTEND_ROOT="${REMOTE_FRONTEND_ROOT:-/var/www/delight-frontend/dist}"
REMOTE_BACKEND_ROOT="${REMOTE_BACKEND_ROOT:-/opt/delight-backend}"
REMOTE_BACKUP_ROOT="${REMOTE_BACKUP_ROOT:-/var/backups/delight-deploy}"
SERVICE_NAME="${SERVICE_NAME:-delight-backend.service}"

RSYNC_SSH=(ssh -i "$SSH_KEY" -o BatchMode=yes)

echo "[1/6] Checking local and remote prerequisites..."
command -v rsync >/dev/null
command -v ssh >/dev/null

ssh -i "$SSH_KEY" -o BatchMode=yes "$SSH_USER@$SSH_HOST" 'echo Connected to $(hostname) as $(whoami)'

echo "[2/6] Creating remote backups..."
TS="$(date +%Y%m%d_%H%M%S)"
ssh -i "$SSH_KEY" -o BatchMode=yes "$SSH_USER@$SSH_HOST" "
  set -e
  mkdir -p '$REMOTE_BACKUP_ROOT'
  tar -czf '$REMOTE_BACKUP_ROOT/frontend_dist_$TS.tgz' -C '$(dirname "$REMOTE_FRONTEND_ROOT")' '$(basename "$REMOTE_FRONTEND_ROOT")'
  tar -czf '$REMOTE_BACKUP_ROOT/backend_$TS.tgz' -C '$(dirname "$REMOTE_BACKEND_ROOT")' '$(basename "$REMOTE_BACKEND_ROOT")'
  ls -lh '$REMOTE_BACKUP_ROOT' | tail -n 4
"

echo "[3/6] Syncing frontend files..."
rsync -az --delete -e "${RSYNC_SSH[*]}" \
  --exclude ".git" \
  --exclude "node_modules" \
  --exclude "backups" \
  --exclude "backend" \
  "$LOCAL_ROOT/" "$SSH_USER@$SSH_HOST:$REMOTE_FRONTEND_ROOT/"

echo "[4/6] Syncing backend files..."
rsync -az --delete -e "${RSYNC_SSH[*]}" \
  --exclude ".env" \
  --exclude "node_modules" \
  --exclude "uploads" \
  --exclude "backups" \
  --exclude "restores" \
  "$LOCAL_ROOT/backend/" "$SSH_USER@$SSH_HOST:$REMOTE_BACKEND_ROOT/"

echo "[5/6] Installing backend dependencies and restarting service..."
ssh -i "$SSH_KEY" -o BatchMode=yes "$SSH_USER@$SSH_HOST" "
  set -e
  cd '$REMOTE_BACKEND_ROOT'
  npm install --omit=dev --silent
  systemctl restart '$SERVICE_NAME'
  systemctl is-active '$SERVICE_NAME'
  chown -R deploy:deploy '$REMOTE_FRONTEND_ROOT' '$REMOTE_BACKEND_ROOT'
"

echo "[6/6] Running live health checks..."
ssh -i "$SSH_KEY" -o BatchMode=yes "$SSH_USER@$SSH_HOST" 'bash -s' <<'EOF'
set -euo pipefail

BASE="https://delightintschool.com"
API="$BASE/api"

home_code=$(curl -ksS -o /tmp/deploy_home.txt -w "%{http_code}" "$BASE/")
echo "Homepage status: $home_code"

root_code=$(curl -sS -o /tmp/deploy_root.txt -w "%{http_code}" "http://127.0.0.1:5000/")
echo "Backend root status: $root_code"

no_token_code=$(curl -ksS -o /tmp/deploy_no_token.txt -w "%{http_code}" "$API/scores")
echo "GET /api/scores without token: $no_token_code"

JWT_SECRET=$(awk -F= '/^JWT_SECRET=/{print substr($0,index($0,"=")+1)}' /opt/delight-backend/.env || true)
if [ -z "$JWT_SECRET" ]; then
  JWT_SECRET="delight_school_secret"
fi

TOKEN=$(cd /opt/delight-backend && node -e 'const jwt=require("jsonwebtoken"); const s=process.argv[1]; process.stdout.write(jwt.sign({id:1,role:"super_admin",branch_id:1,username:"deploy-check"},s,{expiresIn:"10m"}));' "$JWT_SECRET")
good_token_code=$(curl -ksS -o /tmp/deploy_good_token.txt -w "%{http_code}" -H "Authorization: Bearer $TOKEN" "$API/scores")
echo "GET /api/scores with signed token: $good_token_code"

if [ "$home_code" != "200" ] || [ "$root_code" != "200" ] || [ "$no_token_code" != "401" ] || [ "$good_token_code" != "200" ]; then
  echo "Health check failed."
  exit 1
fi

echo "Health checks passed."
EOF

echo "Deployment completed successfully at $(date '+%Y-%m-%d %H:%M:%S')."
