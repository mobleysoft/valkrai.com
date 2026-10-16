// Existing static Valkrai hosting; preserve the fleet for all other root routes.
const HQ_HOSTS=new Set(['valkrai.com','www.valkrai.com']);
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.hostname==='routes.valkrai.com')return env.ASSETS.fetch(request);
  if(!HQ_HOSTS.has(url.hostname))return new Response('Unknown host',{status:404});
  if((url.pathname==='/'||url.pathname==='/index.html')&&url.searchParams.has('session_id')){
   url.pathname='/defense-preview';return Response.redirect(url.toString(),302);
  }
  let asset;
  if(url.pathname==='/'||url.pathname==='/index.html')asset='/hq/index.html';
  else if(url.pathname==='/defense-preview'||url.pathname==='/defense-preview/')asset='/hq/defense.html';
  else if(url.pathname.startsWith('/hq/'))asset=url.pathname;
  else return env.FLEET.fetch(request);
  if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
  url.pathname=asset;url.search='';
  const res=await env.ASSETS.fetch(new Request(url,{method:request.method}));
  // Asset HTML canonical redirects are an implementation detail; request the canonical asset path.
  let body=res;
  if(res.status>=300&&res.status<400&&res.headers.get('location')){
   const target=new URL(res.headers.get('location'),url);body=await env.ASSETS.fetch(new Request(target,{method:request.method}));
  }
  const headers=new Headers(body.headers);
  headers.set('X-Valkrai-Release','hq-20261016-v1');
  headers.set('Cache-Control',asset.includes('/assets/')?'public, max-age=31536000, immutable, no-transform':'public, max-age=0, must-revalidate, no-transform');
  headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
  return new Response(body.body,{status:body.status,headers});
 }
};
