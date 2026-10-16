#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
source /Users/johnmobley/mascom/safe-deploy-lib.sh
REPO_ROOT="$(git rev-parse --show-toplevel)"
sd_banner valkrai-headquarters
sd_require_branch "$REPO_ROOT" main
sd_require_clean_tree "$REPO_ROOT"
sd_require_config_lines wrangler.jsonc '"name": "valkrai-routes"||existing Valkrai static hosting' '"binding": "FLEET"||preserve existing product routes' '"service": "mobley-venture-fleet-a"||real existing fleet' '"binding": "ASSETS"||public static assets only'
python3 check_release.py
unset CLOUDFLARE_API_TOKEN CLOUDFLARE_API_KEY CLOUDFLARE_EMAIL CF_API_TOKEN CF_API_KEY CF_EMAIL CLOUDFLARE_ACCOUNT_ID
export WRANGLER_LOG_PATH=/tmp/valkrai-hq-release.log
wrangler deploy --config wrangler.jsonc "$@"
if [[ " $* " != *" --dry-run "* ]]; then
 sd_verify_response_body https://valkrai.com/hq/release.json 'valkrai.headquarters/1' 6 5
 sd_verify_response_body https://routes.valkrai.com/inventory.json 'valkrai-public-directory/1.0' 6 5
fi
sd_banner_done valkrai-headquarters
