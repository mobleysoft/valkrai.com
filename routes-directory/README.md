# Valkrai public route directory

Authorized public target: https://routes.valkrai.com/. Buildless static files in `public/` only. No runtime code, service/storage bindings, login, purchases, uploads, external dependencies or client analytics. Public website publication is authorized; public source push is not part of this release.

## Inventory and scope

Four distinct visitor pages: Valkrai homepage, Faces Lab, Faces Method, and character atelier. Five gallery section links and one calculator anchor provide deeper navigation. Seven supporting metadata URLs are in a disclosure. Root `/index.html` and `www` are duplicates, not extra pages. HTTP identity checks include titles, headings and missing-path controls; the homepage and both aliases had identical SHA-256 at check time. No data-changing APIs or forms were exercised. `/breach`, `/blog.html`, `/privacy` and `/support` returned 404 and are excluded.

The hosting inventory checked the exact zone Worker Routes API, account custom domains, Valkrai Workers and the existing `valkrai-com` Pages project. Only Faces and gallery custom hostnames existed before release; root/www remain owned by the fleet. Pages has only its pages.dev domain and is separate from the live homepage. DNS-record reads returned 403 using existing credentials, so DNS-only subdomains remain a stated coverage gap. No scopes or credentials were added. Source records and current HTML/manifests were inspected; source existence alone did not qualify a route.

Private/admin pages, unpublished candidates and archive paths are excluded. Implementation assets and broad fleet APIs are outside the visitor page directory. A successful page response does not mean every feature or visual quality passes. Coverage and timestamp are visible on the page and in `public/inventory.json`; there is no automatic monitoring.

## Build and verify

`python3 build.py` regenerates HTML, inventory, supporting files and hashes using the checked public evidence. `public/style.css` is maintained source. `node --check public/app.js` checks the small progressive-enhancement search. All cards and links work without JavaScript.

Preview: `python3 -m http.server 8886 --bind 127.0.0.1 --directory public`.

Local browser QA used installed offscreen Chromium at 1440, 768, 390 and 320 CSS pixels: no overflow, four visible cards, live search and empty state, metadata disclosure, direct links and no-JavaScript behavior. These are viewport tests, not physical-phone tests. Evidence is retained in this task workspace, separate from the public bundle.

## Publish and rollback

Use `bash safe-deploy.sh` from this directory after the path-scoped source commit. It sources the estate safety library, requires clean `main` for this subdirectory, validates exact host and public-file hashes, uses the already-authorized existing OAuth session and live-verifies the inventory schema. Release CLI: existing Wrangler 4.129.1. It creates static-only hosting on the existing Cloudflare account for this exact hostname; no backend services, credentials, permissions or paid products are provisioned. Workers.dev and preview URLs are disabled.

Before release, `routes.valkrai.com` returned 522 and had no dedicated custom-domain attachment or exact Worker route. For the first-release rollback, freshly inspect the custom domains API and remove only the exact `routes.valkrai.com` attachment owned by `valkrai-routes`, returning the hostname to its prior behavior. Do not change fleet/root/www, Faces, gallery, existing Pages content or any wildcard DNS. Keep the static Worker version as a recoverable artifact. For later releases, save current version/deployment IDs and hashes, then redeploy the prior exact public bundle or inspect supported version rollback before use. No rollback is performed as part of routine verification.

The homepage was inspected read-only. It currently presents an operational venture brief and manual CPA calculator rather than the character/Faces theme. It was not modified by this release.
