'use strict';
const result=document.getElementById('fusion-result');
const proStatus=document.getElementById('fusion-pro-status');
const sessionKey='vendyai_session_valkrai_com';
const fusionSessionId=new URLSearchParams(window.location.search).get('session_id');
let memorySession=fusionSessionId||'';
try{if(fusionSessionId)localStorage.setItem(sessionKey,fusionSessionId);else memorySession=localStorage.getItem(sessionKey)||''}catch{}
if(fusionSessionId)proStatus.textContent='Checkout returned. Submit a reference scenario to check whether Pro access is active.';
let latestRequest=0;
document.getElementById('fusion-form').addEventListener('submit',async event=>{
 event.preventDefault();
 const tracks=document.getElementById('fusion-tracks').value.trim();
 const threshold=document.getElementById('fusion-threshold').value||'5';
 if(!tracks)return;
 try{memorySession=localStorage.getItem(sessionKey)||memorySession}catch{}
 const revision=++latestRequest;
 result.textContent='Calculating reference scenario…';result.setAttribute('aria-busy','true');
 proStatus.textContent=memorySession?'Checking access with this scenario request…':'';
 try{
  const response=await fetch('/api/multi-domain-fusion?tracks='+encodeURIComponent(tracks)+'&threshold='+encodeURIComponent(threshold)+(memorySession?'&session_id='+encodeURIComponent(memorySession):''));
  const data=await response.json();if(revision!==latestRequest)return;
  result.textContent=response.ok?JSON.stringify(data,null,2):'Reference calculation unavailable: '+JSON.stringify(data,null,2);
  proStatus.textContent=response.ok?(data.pro?'Pro access verified for this result — up to 8 tracks.':'Free preview result — up to 3 tracks. No active Pro access was confirmed.'):'Access and result could not be confirmed.';
 }catch(error){if(revision!==latestRequest)return;result.textContent='Reference calculation unavailable: '+error.message;proStatus.textContent='Access and result could not be confirmed.'}
 finally{if(revision===latestRequest){result.setAttribute('aria-busy','false');result.focus({preventScroll:true})}}
});
document.getElementById('upgrade-btn')?.addEventListener('click',async()=>{
 const button=document.getElementById('upgrade-btn');button.disabled=true;button.textContent='Loading checkout…';
 try{
  const response=await fetch('/api/upgrade-checkout',{method:'POST'});const data=await response.json();
  if(response.ok&&data.url){window.location.href=data.url}
  else{button.textContent='Checkout unavailable — try again later';button.disabled=false;proStatus.textContent='Checkout could not be opened.'}
 }catch(error){button.textContent='Checkout unavailable — try again';button.disabled=false;proStatus.textContent='Checkout could not be opened: '+error.message}
});
