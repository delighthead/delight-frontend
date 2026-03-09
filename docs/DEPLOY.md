# CI/CD deploy to VPS

This repository includes a GitHub Actions workflow that builds the Vite app and deploys the `dist/` output to your VPS via SCP.

Required repository secrets (set in GitHub > Settings > Secrets and variables > Actions):
- `SSH_HOST` — example: 65.181.125.46
- `SSH_USER` — example: deploy
- `SSH_PORT` — optional (default `22`)
- `SSH_PRIVATE_KEY` — private key (PEM) matching a public key in `deploy` user's `~/.ssh/authorized_keys`
- `DEPLOY_PATH` — remote target directory (example: `/var/www/delight-frontend`)

How it works:
- Push to `main` triggers the workflow automatically.
- The workflow can also be triggered manually from the GitHub Actions tab (select the workflow and click "Run workflow").
- The action builds the app (`npm ci` + `npm run build`) and copies `dist/*` to `DEPLOY_PATH`.
- A post-deploy SSH step runs simple verification commands. You can expand the `script` section in `.github/workflows/ci-cd.yml`.

Initial server bootstrap (one-time):
1. On the server, ensure the `deploy` user exists and has your public key in `~/.ssh/authorized_keys`.
2. Run the included bootstrap script as root to install nginx and prepare the deploy directory:

```bash
sudo bash scripts/remote-setup.sh /var/www/delight-frontend
```

3. Configure `DEPLOY_PATH` in repository secrets to match the directory used above.

Notes & tips:
- The workflow uses `appleboy/scp-action` and `appleboy/ssh-action`; they require the private key in `SSH_PRIVATE_KEY`.
- If you prefer `rsync` or Docker-based deploys, I can adjust the workflow.
