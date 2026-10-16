"use strict";
const search=document.querySelector("#search"),cards=[...document.querySelectorAll(".card")];
document.querySelector("#search-tools").hidden=false;
search.addEventListener("input",()=>{const query=search.value.trim().toLowerCase();let count=0;for(const card of cards){card.hidden=!card.dataset.search.toLowerCase().includes(query);if(!card.hidden)count++;}document.querySelector("#result-count").textContent=query?`${count} of ${cards.length}`:"";document.querySelector("#empty").hidden=count!==0;});
