#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
source /Users/johnmobley/mascom/safe-deploy-lib.sh
REPO_ROOT="$(git rev-parse --show-toplevel)"
sd_banner valkrais-gallery
sd_require_branch "$REPO_ROOT" main
sd_require_clean_tree "$REPO_ROOT" valkrais-gallery
sd_require_config_lines wrangler.jsonc '"name": "valkrais-gallery"||isolated gallery Worker' '"pattern": "valkrais.valkrai.com", "custom_domain": true||only authorized gallery domain' '"directory": "./public"||public-only asset bundle'
# Use the already-installed estate CLI, verified at 4.129.1 for this release.
# Exclude broken inherited credentials; use the existing verified OAuth session.
unset CLOUDFLARE_API_TOKEN CLOUDFLARE_API_KEY CLOUDFLARE_EMAIL CF_API_TOKEN CF_API_KEY CF_EMAIL
export WRANGLER_LOG_PATH="${WRANGLER_LOG_PATH:-/tmp/valkrais-gallery-wrangler.log}"
wrangler deploy --config wrangler.jsonc "$@"
sd_verify_response_body https://valkrais.valkrai.com/ 'Character atelier' 6 5
sd_banner_done valkrais-gallery
