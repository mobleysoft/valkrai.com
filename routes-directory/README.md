# Valkrai headquarters and route hosting

Existing Worker `valkrai-routes` now serves the conglomerate headquarters at root/www. Games and Defense are the two named divisions; no additional division names were invented. Public art is copied byte-for-byte from the verified concept gallery and remains provisional.

`public/hq/` contains the authored homepage, concept artwork and calculator preview. `worker.js` serves that content on root/www; forwards all other requests unchanged to existing `mobley-venture-fleet-a`; and preserves the existing directory assets at routes.valkrai.com. The exact venture.json routes remain owned by getventures. Existing session_id checkout callbacks go to the retained calculator preview.

Original directory bytes are recorded in directory-baseline.json. Its dated inventory remains a snapshot. The previous build.py concerns that old directory snapshot only; do not use it to regenerate the headquarters. There is no framework build.

Offline verification: `python3 check_release.py` and `node --test worker.test.mjs`. Publish only with `bash safe-deploy.sh`, after a scoped commit, with an unchanged remote deployment/routing preflight and live verification. The safe wrapper uses the estate safety library and existing OAuth without scope or credential changes. Only public/ is deployed, not private tests, receipts or local paths.

Rollback evidence and the previous public bundle are retained at /Users/johnmobley/Documents/Codex/2026-10-16/task-10/rollback and evidence. Previous static Worker version: c374b353-b17a-4b48-9c30-0a224e46f2ef. Before rollback, freshly verify hosting ownership/version and exact original route IDs; restore root/www catchalls to mobley-venture-fleet-a before rolling back valkrai-routes, as its former static-only version cannot forward those requests. Preserve the routes.valkrai.com domain attachment and gallery/Faces hosting. No rollback is performed during normal checks.
