// Level loader: levels come from js/levels.js (unique solutions); this picks the emoji for each pair
function rng(s){return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function mk(n,fs,dl,cus){const SRC=ACTIVE||LEVELS,lv=cus||(dl?SRC[30+n%(SRC.length-30)]:SRC[Math.min(n,SRC.length)-1]),size=lv.s,r=rng(cus?cus.seed:n*7919+13),k=lv.p.length;
 const pk=PACKS[S.theme],pool=pk.e.slice();for(let i=pool.length-1;i>0;i--){const j=(r()*(i+1))|0;[pool[i],pool[j]]=[pool[j],pool[i]]}
 const ch=[];for(const c of pool)if(ch.length<k&&!(pk.bad&&ch.some(x=>pk.bad(x,c))))ch.push(c);
 for(const c of pool)if(ch.length<k&&!ch.includes(c))ch.push(c);
 return{size,blocks:lv.b||[],pairs:lv.p.map((s,i)=>({a:s[0],b:s[s.length-1],sol:s,e:ch[i]}))}}
