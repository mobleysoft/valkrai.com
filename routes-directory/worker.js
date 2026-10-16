import {GAME_FILES} from './game-files.js';
// Existing Valkrai static host; all unrelated root requests retain the fleet boundary.
const HQ_HOSTS=new Set(['valkrai.com','www.valkrai.com']);
const READ_METHODS=new Set(['GET','HEAD']);
const RELEASE='hq-g097-corporate-1';
function methodNotAllowed(){return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD','Cache-Control':'no-store'}})}
export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.hostname==='routes.valkrai.com'){
   let path;try{path=decodeURIComponent(url.pathname)}catch{return new Response('Invalid path',{status:400,headers:{'Cache-Control':'no-store'}})}
   if(path==='/games/valkrai'||path.startsWith('/games/valkrai/')){
    if(!READ_METHODS.has(request.method))return methodNotAllowed();
    const canonical=new URL(url);canonical.hostname='valkrai.com';canonical.pathname=path;return Response.redirect(canonical.toString(),308);
   }
   if(path==='/hq'||path.startsWith('/hq/')){
    if(!READ_METHODS.has(request.method))return methodNotAllowed();
    const canonical=new URL(url);canonical.hostname='valkrai.com';canonical.pathname=path;
    if(['/hq','/hq/','/hq/index','/hq/index.html'].includes(canonical.pathname))canonical.pathname='/';
    else if(['/hq/games','/hq/games.html'].includes(canonical.pathname))canonical.pathname='/games';
    else if(['/hq/defense','/hq/defense.html'].includes(canonical.pathname))canonical.pathname='/defense-preview';
    return new Response(null,{status:308,headers:{Location:canonical.toString(),'Cache-Control':'no-store'}});
   }
   return env.ASSETS.fetch(request);
  }
  if(!HQ_HOSTS.has(url.hostname))return new Response('Unknown host',{status:404,headers:{'Cache-Control':'no-store'}});
  const game=url.pathname==='/games/valkrai'||url.pathname.startsWith('/games/valkrai/');
  if(game){
   if(!READ_METHODS.has(request.method))return methodNotAllowed();
   if(url.pathname==='/games/valkrai'){url.pathname+='/';return Response.redirect(url.toString(),308)}
   const name=url.pathname.slice('/games/valkrai/'.length)||'index.html';
   if(!GAME_FILES.has(name))return new Response('Not found',{status:404,headers:{'Cache-Control':'no-store'}});
  }
  const home=url.pathname==='/'||url.pathname==='/index.html';
  let asset;
  if(game)asset=url.pathname==='/games/valkrai/'?'/games/valkrai/index.html':url.pathname;
  else if(home)asset='/hq/index.html';
  else if(url.pathname==='/games'||url.pathname==='/games/')asset='/hq/games.html';
  else if(url.pathname==='/defense-preview'||url.pathname==='/defense-preview/')asset='/hq/defense.html';
  else if(url.pathname.startsWith('/hq/'))asset=url.pathname;
  else return env.FLEET.fetch(request);
  if(!READ_METHODS.has(request.method))return methodNotAllowed();
  if(home&&url.searchParams.has('session_id')){
   url.pathname='/defense-preview';return new Response(null,{status:302,headers:{Location:url.toString(),'Cache-Control':'no-store'}});
  }
  url.pathname=asset;url.search='';
  let response=await env.ASSETS.fetch(new Request(url,{method:request.method}));
  if(response.status>=300&&response.status<400&&response.headers.get('location')){
   const target=new URL(response.headers.get('location'),url);
   if(target.origin!==url.origin)return new Response('Invalid asset redirect',{status:502,headers:{'Cache-Control':'no-store'}});
   response=await env.ASSETS.fetch(new Request(target,{method:request.method}));
  }
  const headers=new Headers(response.headers);
  headers.set('X-Valkrai-Release',RELEASE);
  headers.set('Cache-Control',response.status>=400?'no-store':response.status===200&&asset.includes('/assets/')?'public, max-age=31536000, immutable, no-transform':'public, max-age=0, must-revalidate, no-transform');
  headers.set('Content-Security-Policy',`default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors ${game?"'self'":"'none'"}`);
  return new Response(response.body,{status:response.status,headers});
 }
};
