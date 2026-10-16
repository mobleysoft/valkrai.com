# g098 HQ game mount — source preparation only

Corporate root and all existing public files except hq/games.html are identical to g097. New division stylesheet and 37 game runtime files only. Existing config, bindings and route declarations unchanged. No canonical source changes, Cloudflare operations, deployment or game source edits performed.

Accepted game source: 533d8a53ef23b4e76e42fd2efb2fe1bbf342dee3. game-runtime-allowlist.json pins every runtime file. source/eir-head-resolved.mjs is a necessary imported runtime geometry module, not an editor. No README, tests, docs, evidence, editors or other source experiments copied to public. Total runtime payload 63,948,400 bytes, principally original canonical PNG concepts; the accepted selector loads concept images lazily. This is not an optimized production asset pack.

/games embeds the same game at /games/valkrai/?embed; /games/valkrai/ opens the selector. Only explicitly allowlisted paths are served, GET/HEAD only. Directory-host equivalents redirect to corporate origin. Unrelated routes remain FLEET. Game frames permit same-origin ancestors; corporate/division pages retain frame-ancestors none. Runtime input gating remains unchanged: explicit activation, blur/hidden/Escape suspension and clearing, no postMessage activation.

Checks from task root:
python3 g098-integration/check.py
python3 g098-candidate/check_release.py
node --test g098-candidate/worker.test.mjs g098-candidate/defense.test.mjs g098-candidate/integration.test.mjs
node g098-integration/browser-qa.mjs

Rollback proposal: restore existing g097 Worker version 6579c8bc-4c10-4202-9813-752a12081aff (deployment 042e1645-2a40-42bf-a9fe-3c846a22d495), or exact g097-candidate commit 4fe242d5b3e641621ec55728103d2f89dd7ea86d using existing guarded owner process. Keep current routes/domains/bindings and gallery unchanged. Fresh remote ownership/version checks required immediately before a future deployment. Rollback removes only this new game mount/division integration; prior /breach remains fleet.

Release gates: g096 guide publication finishes first; independent integrated candidate acceptance and explicit root release gate must clear. Existing safe-deploy.sh remains disabled. This document does not authorize publication or claim a live game. g100 production art, rig/import/full flight acceptance remain separate.
