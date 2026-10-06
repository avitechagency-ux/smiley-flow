// Online mode: worlds are downloaded from ONLINE_BASE (needs internet). Offline play uses the built-in levels.
let ACTIVE=null,WORLD=null,ANIM={};
const maxL=()=>(ACTIVE||LEVELS).length;
function wprog(){if(!ACTIVE)return S;return S.w[WORLD.id]=S.w[WORLD.id]||{unlocked:TEST_UNLOCK,stars:{}}}
async function jget(p){const c=new AbortController(),t=setTimeout(()=>c.abort(),9000);try{const r=await fetch(ONLINE_BASE+p,{signal:c.signal,cache:'no-cache'});if(!r.ok)throw new Error(r.status);return await r.json()}finally{clearTimeout(t)}}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2200)}
function netState(){const off=!navigator.onLine;$('#onbtn').classList.toggle('offline',off);$('#onlbl').textContent=off?'Offline':'Online'}
function chip(kind){const c=$('#ostat');c.className='ostat '+kind;$('#ostxt').textContent={ok:'Connected',off:'Offline',load:'Connecting...',err:'Connection problem'}[kind]}
function opanel(emoji,title,msg,btns){return '<div class="opanel"><div class="oe">'+emoji+'</div><b>'+title+'</b><p>'+msg+'</p>'+btns+'</div>'}
function ostate(k){const l=$('#wl');
 if(k==='load'){chip('load');l.innerHTML='<div class="sk big"></div><div class="sk"></div><div class="sk"></div>'}
 else if(k==='off'){chip('off');l.innerHTML=opanel('📡',"You're offline",'Online worlds need internet. Your offline levels still work.','<button class="gold" onclick="openOnline()">Try again</button> <button class="btn-secondary" onclick="playOffline()">Play offline</button>')}
 else{chip('err');l.innerHTML=opanel('😵','Could not load worlds','Check your connection and try again.','<button class="gold" onclick="openOnline()">Retry</button>')}}
async function openOnline(){leaveWorld();show('online');if(!navigator.onLine)return ostate('off');
 let cached=null;try{cached=JSON.parse(localStorage.getItem('sf_worlds')||'null')}catch(e){}
 if(cached)buildWorlds(cached.worlds);else ostate('load');
 try{const m=await jget('worlds.json');try{localStorage.setItem('sf_worlds',JSON.stringify(m))}catch(e){}buildWorlds(m.worlds)}catch(e){if(!cached)ostate('err')}}
function prog(w){const P=S.w[w.id]||{stars:{}},total=w.count||20,v=Object.values(P.stars),done=Math.min(total,v.length);return{done,total,stars:v.reduce((x,y)=>x+y,0),pct:Math.round(done/total*100)}}
function buildWorlds(ws){chip('ok');const l=$('#wl');l.innerHTML='';
 ws.forEach(w=>{const p=prog(w),c=w.color||['#86c6f7','#6f95ee'],b=document.createElement('button');b.className='oc';b.style.setProperty('--c1',c[0]);b.style.setProperty('--c2',c[1]);
  b.innerHTML='<span class="oav"><span class="wart art-'+w.fx+' fill"></span></span><span class="otx"><b>'+w.name+'</b><small>'+(w.tagline||w.desc||'')+'</small></span><span class="ost"><span><i>'+p.total+'</i>Levels</span><span><i>'+p.stars+'/'+p.total*3+'</i>Stars</span><span><i>'+p.done+'</i>Done</span></span><span class="ocirc"><i>'+p.pct+'%</i><small>Complete</small></span><em class="oplay">&#9654;</em>'+(w.featured?'<u class="ofe">FEATURED</u>':'');
  b.onclick=()=>openWorld(w);l.appendChild(b)});
 const s=document.createElement('div');s.className='oc soon';s.style.setProperty('--c1','#f27aa0');s.style.setProperty('--c2','#e04a6a');
 s.innerHTML='<span class="oav lockav">🔒</span><span class="otx"><b>More worlds</b><small>New worlds are added regularly</small></span><span class="ocirc"><i>?</i><small>Coming soon</small></span>';l.appendChild(s);window.WORLDS=ws}
function openWorldById(id){const w=(window.WORLDS||[]).find(x=>x.id===id);if(w)openWorld(w)}
async function openWorld(w){toast('Loading '+w.name+'...');try{const L=await jget(w.levels);ACTIVE=L;WORLD=w;applyBg();ANIM=Object.fromEntries(Object.entries(w.anim||{}).map(([k,v])=>[k,/^https?:/.test(v)?v:ONLINE_BASE+v]));document.body.classList.add('w-'+w.fx);WorldFX.start(w.fx);show('levels')}catch(e){toast('Could not load this world')}}
function leaveWorld(){if(WORLD)document.body.classList.remove('w-'+WORLD.fx);ACTIVE=null;WORLD=null;ANIM={};WorldFX.stop();applyBg()}
function backLevels(){if(ACTIVE){leaveWorld();show('online')}else show('home')}
function playOffline(){leaveWorld();show('levels')}
