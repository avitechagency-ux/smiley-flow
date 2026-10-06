// Pointer input and startup
FX.init();applyBg();netState();playSub();if(drState().claimable)setTimeout(openDaily,900);addEventListener('online',netState);addEventListener('offline',netState);
$$('[data-e]').forEach(el=>el.appendChild(ico(el.dataset.e,'faces')));
const dc=document.createElement('div');dc.id='deco';document.body.prepend(dc);
PACKS.faces.e.slice().sort(()=>Math.random()-.5).slice(0,16).forEach(ch=>{const w=ico(ch,'faces');w.style.cssText='left:'+Math.random()*92+'%;top:'+Math.random()*92+'%;width:'+(50+Math.random()*60)+'px;animation-delay:-'+Math.random()*9+'s';dc.appendChild(w)});let lastSp=0;
const B=$('#board');
B.addEventListener('pointerdown',e=>{if(!G)return;G.rect=null;B.setPointerCapture(e.pointerId);down(cellAt(e))});
B.addEventListener('pointermove',e=>{if(G&&G.cur>=0){const i=G.cur;moveTo(cellAt(e));const t=performance.now();if(t-lastSp>40){lastSp=t;FX.spark(e.clientX,e.clientY,COLS[i])}}});
['pointerup','pointercancel'].forEach(t=>B.addEventListener(t,()=>{if(G){G.cur=-1;react()}}));
refresh();
