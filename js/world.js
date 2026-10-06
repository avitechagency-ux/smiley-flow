// Moving effects for themes and online worlds, drawn in code: snow+fog, fireflies, clouds, stars
const WorldFX=(()=>{let cv,cx,run=false,kind='',els=[],P=[],W=0,H=0,shoot=null;
 const R=(a,b)=>a+Math.random()*(b-a);
 function size(){if(cv){W=cv.width=innerWidth;H=cv.height=innerHeight}}
 function add(tag,id,html){const e=document.createElement(tag);if(id)e.id=id;if(html)e.innerHTML=html;document.body.prepend(e);els.push(e);return e}
 function canvas(){cv=add('canvas','wfx');cx=cv.getContext('2d');size();addEventListener('resize',size)}
 function loop(t){if(!run)return;cx.clearRect(0,0,W,H);
  if(kind==='ice'){cx.fillStyle='rgba(255,255,255,.85)';for(const f of P){f.y+=f.v/60;f.x+=Math.sin(t/1500+f.d)*.0004;if(f.y>1.02){f.y=-.02;f.x=Math.random()}cx.beginPath();cx.arc(f.x*W,f.y*H,f.r,0,7);cx.fill()}}
  else if(kind==='jungle'){for(const f of P){f.x+=Math.sin(t/2000+f.d)*.0006;f.y+=Math.cos(t/2600+f.d)*.0004;const a=.3+.7*Math.abs(Math.sin(t/700+f.d));
    cx.fillStyle='rgba(225,255,120,'+a*.25+')';cx.beginPath();cx.arc(f.x*W,f.y*H,f.r*3.2,0,7);cx.fill();cx.fillStyle='rgba(240,255,170,'+a+')';cx.beginPath();cx.arc(f.x*W,f.y*H,f.r,0,7);cx.fill()}}
  else if(kind==='space'){for(const f of P){const a=.35+.65*Math.abs(Math.sin(t/900+f.d));cx.fillStyle='rgba(255,255,255,'+a+')';cx.fillRect(f.x*W,f.y*H,f.r,f.r)}
   if(!shoot&&Math.random()<.004)shoot={x:R(.2,1)*W,y:R(0,.4)*H,l:0};
   if(shoot){shoot.l+=1;const k=shoot.l*9,x=shoot.x-k,y=shoot.y+k*.55,g=cx.createLinearGradient(x,y,x+60,y-33);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.95)');
    cx.strokeStyle=g;cx.lineWidth=2;cx.beginPath();cx.moveTo(x,y);cx.lineTo(x+60,y-33);cx.stroke();if(shoot.l>60)shoot=null}}
  requestAnimationFrame(loop)}
 function start(k){if(!k){stop();return}if(k===kind)return;stop();kind=k;
  if(k==='ice'||k==='jungle'){add('div','fog',k==='jungle'?'<i class="green"></i><i class="green"></i><i class="green"></i>':'<i></i><i></i><i></i>')}
  if(k==='sky'){add('div','clouds',Array.from({length:6},(_,i)=>'<i style="top:'+(4+i*15)+'%;animation-duration:'+(55+i*13)+'s;animation-delay:-'+(i*17)+'s;transform:scale('+(.7+(i%3)*.35)+')"></i>').join(''));return}
  canvas();P=Array.from({length:k==='space'?110:k==='jungle'?30:70},()=>({x:Math.random(),y:Math.random(),r:k==='space'?R(1,2.6):k==='jungle'?R(1.4,2.6):R(1,3.6),v:R(.05,.17),d:R(0,6)}));
  run=true;requestAnimationFrame(loop)}
 function stop(){run=false;kind='';shoot=null;removeEventListener('resize',size);els.forEach(e=>e.remove());els=[];cv=null}
 return{start,stop}})();
