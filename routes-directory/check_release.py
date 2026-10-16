from pathlib import Path
import json,hashlib,re
r=Path(__file__).parent;c=json.loads((r/'wrangler.jsonc').read_text())
assert c['name']=='valkrai-routes'
assert c['services']==[{'binding':'FLEET','service':'mobley-venture-fleet-a'}]
assert c['routes']==[{'pattern':'routes.valkrai.com','custom_domain':True},*({'pattern':h+'/*','zone_name':'valkrai.com'} for h in ['valkrai.com','www.valkrai.com'])]
assert not c['workers_dev'] and not c['preview_urls']
assert not set(c)&{'d1_databases','kv_namespaces','r2_buckets','vars','queues'}
for name,digest in json.loads((r/'directory-baseline.json').read_text()).items():
 assert hashlib.sha256((r/'public'/name).read_bytes()).hexdigest()==digest,name
hq=(r/'public/hq/index.html').read_text()
assert '02 / DEFENSE' in hq and '01 / GAMES' in hq and 'Local playable prototype' in hq
assert 'https://valkrais.valkrai.com/' in hq and 'https://routes.valkrai.com/' in hq
for s in ['src="/hq/','href="/hq/']:
 for ref in re.findall(re.escape(s)+'([^"#]+)',hq):assert (r/'public/hq'/ref).is_file(),ref
for p in (r/'public').rglob('*'):
 if p.is_file() and p.suffix in {'.html','.js','.css','.json'}:assert '/Users/' not in p.read_text(),p
m=r/'release-manifest.json'
if m.exists():
 files={str(p.relative_to(r)):hashlib.sha256(p.read_bytes()).hexdigest() for p in r.rglob('*') if p.is_file() and '.git' not in p.parts and '.wrangler' not in p.parts and p.name!='release-manifest.json'}
 assert files==json.loads(m.read_text())['files']
print('Release checks pass: division scope, route allowlist, binding target, asset references, unchanged directory, public-data scan, release hashes')
