'use strict';
const camera=document.querySelector('#camera');
const mode=document.querySelector('#camera-mode');
const note=document.querySelector('#camera-note');
for(const button of document.querySelectorAll('[data-distance]'))button.addEventListener('click',()=>{
 const close=button.dataset.distance==='close';camera.dataset.mode=close?'close':'range';
 mode.textContent=close?'Side camera / close fighting':'First-person / ranged';
 note.textContent=close?'The side camera makes spacing and commitment readable. This diagram has no combat simulation.':button.textContent==='Disengage'?'Break away and return to the ranged view. The encounter prototype tests this transition locally.':'Range gives you time to read an approach. This diagram has no combat simulation.';
 for(const b of document.querySelectorAll('[data-distance]'))b.setAttribute('aria-pressed',String(b===button));
});
const result=document.querySelector('#challenge-result');
for(const button of document.querySelectorAll('[data-answer]'))button.addEventListener('click',()=>{
 result.textContent=button.dataset.answer==='2'?'Correct. A travels 1 nm in one minute, leaving 2 nm between the points. Constant motion is an assumption, not a forecast.':'Try again: 3 nm initially minus 1 nm traveled gives 2 nm. This toy assumes B stays still.';
 for(const b of document.querySelectorAll('[data-answer]'))b.setAttribute('aria-pressed',String(b===button));
});
document.querySelector('#reset-challenge').addEventListener('click',()=>{result.textContent='Choose a distance to reveal the reference answer.';for(const b of document.querySelectorAll('[data-answer]'))b.setAttribute('aria-pressed','false');});
