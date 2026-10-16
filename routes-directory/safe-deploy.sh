#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
source /Users/johnmobley/mascom/safe-deploy-lib.sh
REPO_ROOT="$(git rev-parse --show-toplevel)"
sd_banner valkrai-routes
sd_require_branch "$REPO_ROOT" main
sd_require_clean_tree "$REPO_ROOT" routes-directory
sd_require_config_lines wrangler.jsonc '"name": "valkrai-routes"||isolated static directory' '"pattern": "routes.valkrai.com", "custom_domain": true||exact authorized hostname' '"directory": "./public"||public-only assets'
python3 - <<'PY'
import pathlib,json,hashlib
c=json.loads(pathlib.Path('wrangler.jsonc').read_text())
assert c['routes']==[{'pattern':'routes.valkrai.com','custom_domain':True}]
assert not c['workers_dev'] and not c['preview_urls']
assert not set(c).intersection({'main','services','d1_databases','r2_buckets','kv_namespaces','vars','queues'})
files={p.relative_to('public').as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in pathlib.Path('public').rglob('*') if p.is_file()}
assert files==json.loads(pathlib.Path('evidence/release-manifest.json').read_text())['files']
assert set(files)=={'index.html','404.html','style.css','app.js','inventory.json','robots.txt','sitemap.xml','_headers'}
PY
unset CLOUDFLARE_API_TOKEN CLOUDFLARE_API_KEY CLOUDFLARE_EMAIL CF_API_TOKEN CF_API_KEY CF_EMAIL CLOUDFLARE_ACCOUNT_ID
export WRANGLER_LOG_PATH="${WRANGLER_LOG_PATH:-/tmp/valkrai-routes-release.log}"
wrangler deploy --config wrangler.jsonc "$@"
if [[ " $* " != *" --dry-run "* ]]; then
  sd_verify_response_body https://routes.valkrai.com/inventory.json 'valkrai-public-directory/1.0' 6 5
fi
sd_banner_done valkrai-routes
