export const SAVE_KEY='valkrai.codex.v1';
const ids=new Set(Array.from({length:26},(_,i)=>`C${i+1}`));
export function loadProgress(storage){try{const d=JSON.parse(storage.getItem(SAVE_KEY));return {version:1,unlocked:d?.version===1&&Array.isArray(d.unlocked)?[...new Set(d.unlocked.filter(x=>ids.has(x)))]:[]};}catch{return {version:1,unlocked:[]}}}
export function persist(storage,p){try{storage.setItem(SAVE_KEY,JSON.stringify(p));return true}catch{return false}}
export function resetProgress(storage){const p={version:1,unlocked:[]};return {progress:p,saved:persist(storage,p)}}
// Only engine-produced terminal victories qualify. Browsing, selection and losses have no write path.
export function recordVictory(p,s){if(s.victoryClaimed||!s.ended||s.p.hp<=0||s.e.hp!==0||!ids.has(s.e.id)||!s.events.some(e=>e.type==='victory'&&e.defeated===s.e.id))return false;s.victoryClaimed=true;if(p.unlocked.includes(s.e.id))return false;p.unlocked.push(s.e.id);return true}
export function loreFor(p,id,entries){return p.unlocked.includes(id)?entries[id]??null:null}
