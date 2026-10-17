// Illustrative fixed-axis shell, rotating frame. Physical station axis is +Z.
export const SHELL={radius:250,deckRadius:249,omega:Math.sqrt(9.81/250),bandHalfWidth:10,patchHalfLength:10};
export const RPM=SHELL.omega*60/(2*Math.PI);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],add=(a,b)=>a.map((x,i)=>x+b[i]);
export function rotatingAcceleration(r,v,omega=SHELL.omega){const O=[0,0,omega],c=cross(O,v),f=cross(O,cross(O,r));return c.map((x,i)=>-2*x-f[i])}
export function rotateZ(v,angle){const c=Math.cos(angle),s=Math.sin(angle);return [v[0]*c-v[1]*s,v[0]*s+v[1]*c,v[2]]}
export function toInertial(r,vRot,time,omega=SHELL.omega){return {r:rotateZ(r,omega*time),v:rotateZ(add(vRot,cross([0,0,omega],r)),omega*time)}}
export function fromLocal(a){const rho=SHELL.deckRadius-a.y,theta=a.x/SHELL.deckRadius,c=Math.cos(theta),s=Math.sin(theta);return {r:[rho*c,rho*s,a.z],v:[-s*a.vx-c*a.vy,c*a.vx-s*a.vy,a.vz]}}
// x is deck arc coordinate, vx is local physical tangent speed, y/​vy inward from deck.
// Curvilinear connection terms accompany centrifugal/Coriolis; no second gravity term.
export function localAcceleration(a){const rho=Math.max(1,SHELL.deckRadius-a.y),w=SHELL.omega,vt=a.vx||0,u=a.vy||0;return {down:w*w*rho+2*w*vt+vt*vt/rho,tangent:2*w*u+u*vt/rho,arcScale:SHELL.deckRadius/rho}}
export function projectileStep(p,dt){if(!(dt>0)||!Number.isFinite(dt))return p;const interval=Math.min(dt,.04),steps=Math.ceil(interval/.005),h=interval/steps;for(let i=0;i<steps;i++){const a=localAcceleration(p);p.vx+=a.tangent*h;p.vy-=a.down*h;p.x+=p.vx*a.arcScale*h;p.y+=p.vy*h;p.z+=p.vz*h;}return p}
export function accelerationAtLatitude(latitude){const rho=SHELL.radius*Math.cos(latitude);return {magnitude:SHELL.omega*SHELL.omega*rho,axisDistance:rho,hullNormalAlignment:Math.cos(latitude)}}
export function deckFitsShell(z){return SHELL.deckRadius*SHELL.deckRadius+z*z<=SHELL.radius*SHELL.radius}
// Render in the co-rotating tangent frame at patch center; down is away from spin axis.
export function renderLocal(x,y,z){const rho=SHELL.deckRadius-y,theta=x/SHELL.deckRadius;return [rho*Math.sin(theta),SHELL.deckRadius-rho*Math.cos(theta),z]}

// Exact local bank for the bounded cylindrical patch; camera never accumulates spin.
export function renderNormal(n,x,y){const t=x/SHELL.deckRadius,c=Math.cos(t),s=Math.sin(t),scale=Math.max(1e-6,(SHELL.deckRadius-y)/SHELL.deckRadius),nx=n[0]/scale,v=[c*nx-s*n[1],s*nx+c*n[1],n[2]],len=Math.hypot(...v)||1;return v.map(a=>a/len)}
export function stationCamera(cam){const p=renderLocal(cam.x,cam.y,cam.z),theta=cam.x/SHELL.deckRadius,c=Math.cos(theta),s=Math.sin(theta),d=[cam.tx-cam.x,cam.ty-cam.y,cam.tz-cam.z],v=[c*d[0]-s*d[1],s*d[0]+c*d[1],d[2]],n=Math.hypot(...v)||1,f=v.map(a=>a/n),up0=[-s,c,0],r=cross(f,up0),rn=Math.hypot(...r)||1,right=r.map(a=>a/rn),up=cross(right,f);return {x:p[0],y:p[1],z:p[2],tx:p[0]+v[0],ty:p[1]+v[1],tz:p[2]+v[2],view:[right[0],up[0],f[0],right[1],up[1],f[1],right[2],up[2],f[2]]}}
