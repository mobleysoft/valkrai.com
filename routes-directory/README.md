# Valkrai headquarters and route hosting

Existing Worker `valkrai-routes` now serves the conglomerate headquarters at root/www. Games and Defense are the two named divisions; no additional division names were invented. Public art is copied byte-for-byte from the verified concept gallery and remains provisional.

`public/hq/` contains the authored homepage, concept artwork and calculator preview. `worker.js` serves that content on root/www; forwards all other requests unchanged to existing `mobley-venture-fleet-a`; and preserves the existing directory assets at routes.valkrai.com. The exact venture.json routes remain owned by getventures. Existing session_id checkout callbacks go to the retained calculator preview.

Original directory bytes are recorded in directory-baseline.json. Its dated inventory remains a snapshot. The previous build.py concerns that old directory snapshot only; do not use it to regenerate the headquarters. There is no framework build.

Offline verification: `python3 check_release.py` and `node --test worker.test.mjs`. Publish only with `bash safe-deploy.sh`, after a scoped commit, with an unchanged remote deployment/routing preflight and live verification. The safe wrapper uses the estate safety library and existing OAuth without scope or credential changes. Only public/ is deployed, not private tests, receipts or local paths.

Rollback evidence and the previous public bundle are retained at /Users/johnmobley/Documents/Codex/2026-10-16/task-10/rollback and evidence. Previous static Worker version: c374b353-b17a-4b48-9c30-0a224e46f2ef. Before rollback, freshly verify hosting ownership/version and the current root route IDs in the receipt; restore root/www catchalls to mobley-venture-fleet-a before rolling back valkrai-routes, as its former static-only version cannot forward those requests. Preserve the routes.valkrai.com domain attachment and gallery/Faces hosting. No rollback is performed during normal checks.

Current root route IDs after Wrangler trigger synchronization: valkrai.com/* = 7945de1be9034caeafe27ab55d21b92f; www.valkrai.com/* = 35a3dcce4e0541fa86acdc1a27750ae9. Wrangler recreated these IDs; the original IDs in the before-snapshot no longer exist. Freshly match pattern, script and ID before restoring either assignment.

## g093 candidate (not published)

Five bounded improvements: explicit authored AUI shared foundation, direct Games/Defense navigation, clear explanatory GameBehind types before the art archive, >=44px primary control design target, and responsive delivery derivatives preserving canonical PNGs. New speculative aircraft/cell concepts remain inventory notes, not added products or divisions here. No worker/config/defense calculator/directory bytes changed. Independent review is required before publication. Rollback after any future reviewed publication is the current HQ version 1528a40d-d4f2-4f93-9414-22a82508aa57, with current routes/bindings retained; this differs from the initial static-only rollback.
