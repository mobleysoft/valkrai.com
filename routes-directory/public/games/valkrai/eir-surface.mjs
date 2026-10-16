import {headParts} from './source/eir-head-resolved.mjs';
// Authored Eir surface revision; uses a pinned owned head generator, not a new sculpt.
export function eirOperations(){const ops=[],bone=(id,parent,at)=>ops.push({op:'addBone',id,parent,at});const part=(id,bone,primitive,parameters,at,color,material={},weights)=>{ops.push({op:'addMesh',id:id+'-mesh',primitive,parameters});ops.push({op:'attach',id,bone,mesh:id+'-mesh',at,color,material,...(weights?{weights}: {})});};const ivory='#ddd5bd',gold='#ac854c',dark='#292e31',skin='#ba8d70',hair='#b6a482';const shell=(id,b,profile,at,c=ivory,extra={})=>part(id,b,'loft',{profile,rows:24,segments:32,...extra},at,c,{roughness:c===gold?.3:.7,metallic:c===gold?.7:.12});const cord=(id,b,path,r,at,c=gold)=>part(id,b,'tube',{path,radius:r,segments:8,rows:20},at,c,{roughness:.4,metallic:.6});
 bone('root',null,[0,.91,0]);bone('spine','root',[0,.16,0]);bone('neck','spine',[0,.46,0]);bone('head','neck',[0,.075,0]);
 // Ring surface from pelvic crest to clavicle; shaped waist, sternum and shoulder transition.
 shell('continuous-underarmor','root',[[-.11,.18,.115],[.01,.205,.13],[.14,.15,.10],[.27,.145,.105],[.40,.19,.125],[.48,.225,.095],[.50,.18,.08]],[0,0,0],dark);
 shell('cuirass','spine',[[-.03,.155,.12],[.06,.14,.105],[.16,.155,.125],[.27,.185,.142],[.34,.19,.12],[.39,.14,.10]],[0,0,.006],ivory);
 shell('waist-girdle','root',[[.035,.195,.139],[.07,.16,.116],[.11,.154,.112],[.14,.155,.115]],[0,0,.009],gold,{rows:8});
 shell('neck-underlayer','neck',[[-.065,.079,.052],[-.04,.061,.048],[.00,.046,.043],[.035,.046,.043],[.065,.049,.045]],[0,0,0],skin,{rows:12,segments:20});
 // Continuous source face: real orbital apertures, lid/lip surfaces and nasal relief.
 for(const p of headParts)part(p.id,'head','indexedSurface',p.parameters,p.at,p.color,p.material);
 // Scalp follows a swept, parted crown rather than a sphere/cap. Locks are swept tubes.
 shell('swept-hair-crown','head',[[.105,.075,.076,-.014],[.155,.079,.077,-.018],[.192,.057,.063,-.024],[.201,.012,.025,-.026]],[0,0,0],hair,{rows:18,segments:32});
 for(let side of [-1,1]){let n=side===1?'R':'L';
  for(let i=0;i<8;i++){let x=side*(.012+i*.008);cord(n+'-swept-lock-'+i,'head',[[x,.195-i*.002,.005],[side*(.046+i*.004),.17,.04-i*.009],[side*(.076+i*.0005),.10,-.006-i*.008],[side*(.060+i*.001),.015,-.065-i*.004]],.009,[0,0,0],i%2?hair:'#c9b692');}
  for(let i=0;i<3;i++)cord(n+'-braid-'+i,'head',[[side*.075,.06,-.05-i*.008],[side*.058,-.02,-.087-i*.006],[side*.042,-.10,-.087],[side*.025,-.17,-.08]],.012,[0,0,0],i%2?hair:'#c8b796');
  cord(n+'-brow','head',[[side*.015,.097,.060],[side*.028,.105,.060],[side*.046,.104,.050],[side*.055,.098,.039]],.0022,[0,0,0],'#6d5a44');
  bone(n+'Arm','spine',[side*.20,.37,0]);bone(n+'Forearm',n+'Arm',[0,-.28,0]);bone(n+'Hand',n+'Forearm',[0,-.25,0]);
  part(n+'-continuous-arm',n+'Arm','loft',{profile:[[-.53,.039,.035],[-.43,.051,.046],[-.31,.05,.048],[-.26,.05,.048],[-.14,.062,.061],[-.035,.072,.066],[.025,.076,.072]],rows:38,segments:24},[0,0,0],dark,{roughness:.9},{axis:1,joints:[{at:-.28,radius:.07,a:n+'Arm',b:n+'Forearm'},{at:-.53,radius:.035,a:n+'Forearm',b:n+'Hand'}]});
  shell(n+'-pauldron',n+'Arm',[[-.075,.077,.075],[.00,.086,.083],[.055,.065,.063],[.075,.03,.025]],[0,.012,0],ivory,{rows:12,segments:24});
  shell(n+'-pauldron-rim',n+'Arm',[[-.07,.080,.078],[-.054,.083,.081]],[0,.012,0],gold,{rows:2,segments:24});
  shell(n+'-vambrace',n+'Forearm',[[-.235,.046,.042],[-.15,.056,.052],[-.04,.055,.054]],[0,0,.004],ivory,{rows:14,segments:24});
  shell(n+'-work-cuff',n+'Forearm',[[-.21,.051,.047],[-.19,.053,.049],[-.165,.054,.051]],[0,0,.004],gold,{rows:6,segments:24});
  shell(n+'-glove-palm',n+'Hand',[[-.09,.038,.026],[-.02,.043,.029],[.018,.033,.025]],[0,0,.012],dark,{rows:10,segments:16});
  for(let j=0;j<4;j++)cord(n+'-finger-'+j,n+'Hand',[[(-1.5+j)*.017,-.07,.025],[(-1.5+j)*.017,-.105,.03],[(-1.5+j)*.016,-.13,.043]],.0075,[0,0,0],dark);
  cord(n+'-thumb',n+'Hand',[[side*.037,-.02,.015],[side*.053,-.06,.037],[side*.039,-.08,.05]],.01,[0,0,0],dark);
  bone(n+'Thigh','root',[side*.112,-.10,0]);bone(n+'Shin',n+'Thigh',[0,-.38,0]);bone(n+'Foot',n+'Shin',[0,-.36,0]);
  part(n+'-continuous-leg',n+'Thigh','loft',{profile:[[-.74,.046,.045],[-.60,.062,.063],[-.43,.065,.065],[-.36,.061,.062],[-.28,.076,.081],[-.13,.093,.092],[.03,.102,.102]],rows:42,segments:24},[0,0,0],dark,{roughness:.9},{axis:1,joints:[{at:-.38,radius:.07,a:n+'Thigh',b:n+'Shin'},{at:-.74,radius:.035,a:n+'Shin',b:n+'Foot'}]});
  shell(n+'-greave',n+'Shin',[[-.32,.05,.05],[-.20,.069,.075],[-.02,.067,.065],[.06,.038,.044]],[0,0,.018],ivory,{rows:18,segments:24,angleStart:-1.6,angleEnd:1.6,caps:false});
  cord(n+'-greave-ridge',n+'Shin',[[0,-.31,.071],[0,-.15,.09],[0,.05,.061]],.009,[0,0,0],gold);
  shell(n+'-boot',n+'Foot',[[-.033,.058,.13,.045],[.025,.061,.105,.031],[.10,.047,.052,.00]],[0,0,0],dark,{rows:8,segments:24});
  bone(n+'Wing','spine',[side*.16,.33,-.13]);bone(n+'WingTip',n+'Wing',[side*.42,.15,-.045]);
  // Layered curved flight feathers follow an articulated arch; no rectangular wing slats.
  for(let i=0;i<12;i++){let t=i/11;part(n+'-flight-'+i,n+'WingTip','curvedFeather',{path:[[side*(.02+t*.24),.03-t*.20,-.04],[side*(.18+t*.45),.09-t*.42,-.03],[side*(.34+t*.61),-.12-t*.72,-.12],[side*(.36+t*.61),-.21-t*.78,-.18]],width:.068+(1-t)*.02},[0,0,0],i<8?ivory:'#8d897d',{roughness:.9,metallic:0});}
  for(let row=0;row<3;row++)for(let i=0;i<8;i++){let t=i/7;part(n+'-covert-'+row+'-'+i,n+'Wing','curvedFeather',{path:[[side*(.03+t*.51),.20-t*.12-row*.06,.01-row*.012],[side*(.13+t*.55),.17-t*.14-row*.09,.045-row*.012],[side*(.20+t*.56),.02-t*.20-row*.10,.005-row*.012]],width:.05,rows:10},[0,0,0],(i+row)%3===0?'#c0b79e':ivory,{roughness:.9,metallic:0});}
 }
 // Split cloth panels, with overlapping hips and a clear leg opening. No cloth simulation claim.
 for(const side of [-1,1]){let n=side===1?'R':'L';part(n+'-split-surcoat','root','loft',{profile:[[-.77,.31,.205,0],[-.57,.285,.19,0],[-.30,.245,.165,0],[-.08,.205,.145,0],[.035,.19,.136,0]],angleStart:side===1?.28:-1.70,angleEnd:side===1?1.70:-.28,rows:28,segments:12,caps:false,flutes:.035},[0,0,0],ivory,{roughness:.94,metallic:0});
  cord(n+'-surcoat-seam','root',[[side*.06,.02,.14],[side*.09,-.26,.169],[side*.11,-.54,.189],[side*.13,-.77,.195]],.004,[0,0,0],gold);
  for(let i=0;i<3;i++)shell(n+'-hip-lamella-'+i,'root',[[-.12,.22+i*.012,.158+i*.005],[-.035,.21+i*.01,.15+i*.003]],[0,-i*.08,0],i===0?gold:ivory,{rows:5,segments:12,angleStart:side===1?.80:-2.35,angleEnd:side===1?2.35:-.80,caps:false});
  cord(n+'-cuirass-inlay','spine',[[side*.13,.32,.11],[side*.08,.22,.14],[side*.06,.10,.105],[0,-.01,.123]],.0045,[0,0,.007],gold);
 }
 // Actual authored rest-surface edits, not an invented screen recording. Replay retains each dab.
 for(const [id,center,radius,strength,direction]of [['cuirass-mesh',[0,.18,.135],.095,-.012,[0,0,1]],['cuirass-mesh',[.13,.07,.08],.10,-.009,[1,0,0]],['cuirass-mesh',[-.13,.07,.08],.10,-.009,[-1,0,0]]])ops.push({op:'sculptMesh',mesh:id,dab:{center,radius,strength,direction,falloff:'compact-polynomial-v1'},authoring:'scripted explicit rest-surface edit'});
 return ops;}
