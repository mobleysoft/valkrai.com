# Valkrai character gallery

Static gallery for the authorized `https://valkrais.valkrai.com/` hostname.
This subdirectory is isolated from the existing root site, face lab and combat prototype.

## Content boundary

The identity records are real; no existing character images or 3D characters were found in the bounded search. Three new imagegen concept sheets depict Eir, Brynhildr and Skuld, with spread/folded wing views. Their costumes, faces and palettes are explicitly new proposals. The separately supplied original Vitruvian Valkrai illustration is also a new concept, showing fictional wing anatomy and opaque feather coverage. No private identity data, memories, raw archives, credentials, telemetry or third-party assets are in `public/`.

The public `provenance.json` records selected identity sources and artwork hashes. Local research and hosting receipts are kept outside `public/`. No 3D feature or pre-v0.1 visual history is implied.

## Build and test

Buildless: `public/` is the complete release bundle. No runtime CDN or package dependencies.
Preview: `python3 -m http.server 8879 --bind 127.0.0.1 --directory public`
Checks: `node --check public/app.js`; `wrangler deploy --config wrangler.jsonc --dry-run`.
The release was browser-tested at 1440, 768 and 390 CSS pixels using offscreen Chromium, including navigation, all assets, comparison, dialog keyboard controls, wing framing, zoom and anatomy inspection. Physical-device testing is not claimed.

## Deploy and rollback

Use `./safe-deploy.sh` on clean `main`. It sources the existing estate safety library, verifies the isolated Worker name, exact custom hostname, and public-only directory, then verifies the live response. Release CLI: Wrangler 4.129.1. Existing configured OAuth is used after excluding malformed environment credentials; do not log credentials or initiate new authentication automatically.

The Worker is static-assets-only with no storage/services or paid resource provisioning. It owns only `valkrais.valkrai.com`; existing Pages project `valkrai-com` and root/www fleet routes remain as they are. Worker deploy receipts identify version IDs for subsequent `wrangler rollback <version-id> --config wrangler.jsonc` after inspecting rollback impact. For the first release there is no previous gallery version: remove only this Worker's exact custom-domain attachment to return to the pre-release state (the hostname returned HTTP 522 before this release). Never roll back shared fleet code or unrelated DNS records for a gallery rollback.
