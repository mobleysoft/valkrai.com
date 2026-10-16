from pathlib import Path
import json,hashlib,re
from html.parser import HTMLParser
r=Path(__file__).parent;c=json.loads((r/'wrangler.jsonc').read_text())
assert c['name']=='valkrai-routes'
assert c['services']==[{'binding':'FLEET','service':'mobley-venture-fleet-a'}]
assert c['routes']==[{'pattern':'routes.valkrai.com','custom_domain':True},*({'pattern':h+'/*','zone_name':'valkrai.com'} for h in ['valkrai.com','www.valkrai.com'])]
assert not c['workers_dev'] and not c['preview_urls']
assert not set(c)&{'d1_databases','kv_namespaces','r2_buckets','vars','queues'}
for name,digest in json.loads((r/'directory-baseline.json').read_text()).items():assert hashlib.sha256((r/'public'/name).read_bytes()).hexdigest()==digest,name
class Corporate(HTMLParser):
 def __init__(self):super().__init__();self.text=[];self.links=[];self.media=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='a':self.links.append(a.get('href'))
  if tag in ['img','canvas','video','iframe','script']:self.media.append(tag)
 def handle_data(self,text):self.text.append(text)
hq=(r/'public/hq/index.html').read_text();parsed=Corporate();parsed.feed(hq)
assert parsed.links.count('/games')==1 and not parsed.media
text=' '.join(parsed.text).lower();assert text.count('gaming')==1
for term in ['character','gameplay','lore','breach','atelier','gamebehind','entertainment']:assert not re.search(r'\b'+re.escape(term)+r'\b',text),term
assert 'absolute universal intelligence' in text and 'authored architecture' in text
assert 'Defense' in hq and 'Available now' in hq
for p in (r/'public/hq').glob('*.html'):
 html=p.read_text()
 for ref in re.findall(r'(?:src|href)="(/hq/[^"#?]+)',html):
  target=r/'public'/ref.removeprefix('/');assert target.is_file() or target.with_suffix('.html').is_file(),(p,ref)
for p in (r/'public').rglob('*'):
 if p.is_file() and p.suffix in {'.html','.js','.css','.json'}:assert '/Users/' not in p.read_text(),p
m=r/'release-manifest.json'
if m.exists():
 files={str(p.relative_to(r)):hashlib.sha256(p.read_bytes()).hexdigest() for p in r.rglob('*') if p.is_file() and '.git' not in p.parts and '.wrangler' not in p.parts and p.name!='release-manifest.json'}
 expected=json.loads(m.read_text())['files']
 for name,digest in expected.items():assert files.get(name)==digest,name
 assert {n for n in files if n.startswith('public/')}=={n for n in expected if n.startswith('public/')},'Unexpected public files'
print('g097 checks pass: corporate root restriction, AUI/status/CTA, route/binding allowlist, directory bytes, public paths and manifest')
