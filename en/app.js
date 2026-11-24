// Kanji Friends (English) – learn Japanese kanji with English explanations.
// Data: window.KDATA (data-g1.js, built by en_data.py)
"use strict";
const D=window.KDATA;
const KS=D.secs.flatMap(s=>s[1]);           // 学ぶ順（テーマ別）
const K=D.k;
const SECS=D.secs.map(s=>s[1]);
const SEC_NAMES=D.secs.map(s=>s[0]);
const $=s=>document.querySelector(s), app=$("#app");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle=a=>{ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const pick=a=>a[Math.floor(Math.random()*a.length)];
const calm=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- friends ----------
const STAGES={
 pirate:["Little Pirate","Mini Pirate","Kid Pirate","Young Pirate","Pirate Trainee","Pirate in a Big Hat","Swashbuckler","Sea Pirate","Crew Pirate","Drummer Pirate","Helmsman Pirate","Sea-Palace Pirate","Treasure Pirate","Future Pirate King","Legendary Kanji Pirate"],
 unicorn:["Baby Unicorn","Toddling Unicorn","Little Unicorn","Ribbon Unicorn","Rainbow Unicorn","Star-Necklace Unicorn","Flower Unicorn","Fairy's Partner","Winged Unicorn","Caped Unicorn","Great-Winged Unicorn","Jewel Unicorn","Princess Unicorn","Golden Unicorn","Legendary Kanji Unicorn"],
 penguin:["Penguin Egg","Penguin Chick","Kid Penguin","Young Penguin","Grown-up Penguin","Penguin in a Cap","Scarf Penguin","Diving Penguin","Wise Penguin","Flapping Penguin","Star Penguin","Lake Penguin","Rainbow Penguin","Golden Penguin","Legendary Kanji Penguin"],
 dragon:["Mystery Egg","Tiny Dragon","Kid Dragon","Young Dragon","Grown-up Dragon","Sky Dragon","Wise Dragon","Fire Dragon","Water Dragon","Cloud Dragon","Earth Dragon","Shadow Dragon","Wind Dragon","Holy Dragon","Legendary Kanji Dragon"]};
const FR={
 pirate:{name:"Kanji Pirate",jp:"かんじパイレーツ",who:"Pirate",box:"Treasure chest",boxE:"🧰",place:"🏝️",
  say:{hi:"Ahoy! Let's hunt for kanji treasure!",look:"Watch the stroke order closely, matey!",nari:"Here's the secret story of this kanji!",trace:"Trace the light lines from the red dot.",write:"Now write it without looking!",word:"Let's see this kanji in real words.",sent:"Read each sentence out loud!",check:"Last step: a quick check!"},
  items:[["🪙","gold coin"],["💎","gem"],["🗺️","treasure map"],["🧭","compass"],["⚓","anchor"],["🐚","seashell"],["🔭","spyglass"],["🗝️","mystery key"],["💍","ring"],["📿","necklace"],["🍾","message in a bottle"],["🦀","crab"],["🐙","octopus"],["🐠","tropical fish"],["🦜","parrot"],["🏴‍☠️","pirate flag"],["🪝","hook"],["🧱","gold brick"],["🍖","meat on the bone"],["🍌","banana"],["🥥","coconut"],["🐢","sea turtle"],["🦈","shark"],["🐳","whale"]],
  special:[["👑","crown"],["⛵","pirate ship"],["🏝️","treasure island"],["🏆","gold trophy"],["🔱","sea trident"],["🌊","giant wave"],["🐋","great whale"],["🌋","fire mountain"],["🎖️","medal"],["🗿","mystery statue"]]},
 unicorn:{name:"Kanji Unicorn",jp:"かんじユニコーン",who:"Unicorn",box:"Sparkle box",boxE:"💝",place:"🌈",
  say:{hi:"Let's collect magic kanji together!",look:"Watch the stroke order, it's like magic!",nari:"Here's how this kanji was born!",trace:"Trace the light lines from the red dot.",write:"Now try writing it on your own!",word:"Let's use this kanji in words!",sent:"Read each sentence out loud!",check:"One last little check!"},
  items:[["🌟","star"],["🌸","cherry blossom"],["🌈","rainbow"],["🦋","butterfly"],["🍭","lollipop"],["💐","bouquet"],["🎀","ribbon"],["💖","heart"],["🔮","magic ball"],["🌙","moon"],["☁️","cloud"],["🌷","tulip"],["🧁","cupcake"],["🍬","candy"],["🫧","bubbles"],["🪄","magic wand"],["💎","jewel"],["🌼","daisy"],["🍓","strawberry"],["🎐","wind chime"],["🐚","seashell"],["🪽","wing"],["🍀","four-leaf clover"],["🌺","hibiscus"]],
  special:[["👑","tiara"],["🏰","castle"],["🎠","merry-go-round"],["🌌","starry sky"],["🏆","gold trophy"],["👗","dress"],["🧚","fairy"],["🎆","fireworks"],["🎖️","medal"],["🌠","shooting star"]]},
 penguin:{name:"Kanji Penguin",jp:"かんじペンギン",who:"Penguin",box:"Ice box",boxE:"🧊",place:"🐧",
  say:{hi:"Let's learn kanji together!",look:"Watch the stroke order carefully!",nari:"Let me tell you this kanji's secret!",trace:"Trace the light lines from the red dot.",write:"Now write it without looking!",word:"Let's use this kanji in words!",sent:"Read each sentence out loud!",check:"Let's check what you learned!"},
  items:[["🐟","fish"],["🦐","shrimp"],["🦑","squid"],["🐠","tropical fish"],["🐡","pufferfish"],["🦀","crab"],["🐚","seashell"],["🧊","ice cube"],["❄️","snowflake"],["⛄","snowman"],["🧣","scarf"],["🧤","mittens"],["🧢","cap"],["⛸️","ice skates"],["🎿","skis"],["🛷","sled"],["🪁","kite"],["🎈","balloon"],["🧸","teddy bear"],["🍙","rice ball"],["🍦","soft-serve"],["🍧","shaved ice"],["⭐","star"],["🔦","flashlight"]],
  special:[["🏠","penguin house"],["🛝","ice slide"],["🌌","aurora"],["🎂","cake"],["🏆","gold trophy"],["🛏️","fluffy bed"],["🎠","merry-go-round"],["🚂","steam train"],["🎖️","medal"],["🏰","castle"]]},
 dragon:{name:"Kanji Dragon",jp:"かんじドラゴン",who:"Dragon",box:"Jewel box",boxE:"🧰",place:"🐉",
  say:{hi:"Let's gather the power of kanji!",look:"Watch the stroke order closely!",nari:"I'll tell you where this kanji came from!",trace:"Trace the light lines from the red dot.",write:"Now write it without looking!",word:"Let's use this kanji in words!",sent:"Read each sentence out loud!",check:"Final check, let's go!"},
  items:[["💎","gem"],["🔥","fire orb"],["⚡","lightning"],["🌙","moon stone"],["⭐","star shard"],["🔮","crystal"],["🍖","meat"],["🍎","apple"],["🪨","magic rock"],["🌿","healing herb"],["🍄","mystery mushroom"],["🗡️","sword"],["🛡️","shield"],["💠","blue gem"],["🔶","orange gem"],["🟢","green gem"],["🪶","feather"],["🦴","bone"],["☄️","comet"],["🌈","rainbow shard"],["🧪","magic potion"],["📜","scroll"],["🪵","firewood"],["🍯","honey"]],
  special:[["👑","dragon crown"],["🏯","dragon castle"],["🌋","volcano"],["🥚","legendary egg"],["🏆","gold trophy"],["🐉","dragon charm"],["🌌","galaxy"],["⛰️","dragon mountain"],["🎖️","medal"],["🔱","thunder spear"]]},
};
const CHS=["pirate","unicorn","penguin","dragon"];
const PER=8;            // correct answers per evolution stage
const TICKET=10;        // correct answers per play ticket
const PER_ITEM=5;       // kanji learned per item

// ---------- state ----------
const SKEY="kanji-friends-en-v1";
let S=(()=>{ try{ const v=JSON.parse(localStorage.getItem(SKEY)||"{}"); return v&&typeof v==="object"?v:{}; }catch(e){ return {}; } })();
S.set=Object.assign({roma:true,furi:true,en:"show",sound:true,theme:"auto"},S.set||{});
S.ch=CHS.includes(S.ch)?S.ch:null;
S.learned=S.learned||{};   // k -> {n,t}
S.st=S.st||{};             // k -> {type:[ok,ng]}
S.fr=S.fr||{};             // ch -> {correct, items:{}, sp:{}}
S.play=S.play||{used:0,best:{}};
S.q=S.q||{};               // total quiz {correct,answered}
function save(){ try{ localStorage.setItem(SKEY,JSON.stringify(S)); }catch(e){} }
const FS=ch=>S.fr[ch]=S.fr[ch]||{correct:0,items:{},sp:{}};
const L=S.learned;
const totalCorrect=()=>CHS.reduce((a,c)=>a+((S.fr[c]&&S.fr[c].correct)||0),0);
const tickets=()=>Math.max(0,Math.floor(totalCorrect()/TICKET)-S.play.used);
const stageOf=ch=>Math.min(14,Math.floor(FS(ch).correct/PER));
const evoImg=(ch,n)=>`img/evo/${ch}-${n==null?stageOf(ch):n}.webp`;
function applySettings(){
  const b=document.body.classList;
  b.toggle("noroma",!S.set.roma); b.toggle("nofuri",!S.set.furi); b.toggle("entap",S.set.en==="tap");
  if(S.set.theme==="auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme",S.set.theme);
}
function theme(ch){ document.body.className=(ch||"home"); applySettings(); }

// ---------- kana / romaji ----------
const hira=s=>s.replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
const kata=s=>s.replace(/[ぁ-ゖ]/g,c=>String.fromCharCode(c.charCodeAt(0)+0x60));
const RT=(()=>{ const t={}; const B="あa いi うu えe おo かka きki くku けke こko さsa しshi すsu せse そso たta ちchi つtsu てte とto なna にni ぬnu ねne のno はha ひhi ふfu へhe ほho まma みmi むmu めme もmo やya ゆyu よyo らra りri るru れre ろro わwa をo がga ぎgi ぐgu げge ごgo ざza じji ずzu ぜze ぞzo だda ぢji づzu でde どdo ばba びbi ぶbu べbe ぼbo ぱpa ぴpi ぷpu ぺpe ぽpo ぁa ぃi ぅu ぇe ぉo";
  B.split(" ").forEach(p=>t[p[0]]=p.slice(1));
  [["き","k"],["ぎ","g"],["に","n"],["ひ","h"],["び","b"],["ぴ","p"],["み","m"],["り","r"]].forEach(([c,b])=>{ t[c+"ゃ"]=b+"ya"; t[c+"ゅ"]=b+"yu"; t[c+"ょ"]=b+"yo"; });
  [["し","sh"],["じ","j"],["ち","ch"],["ぢ","j"]].forEach(([c,b])=>{ t[c+"ゃ"]=b+"a"; t[c+"ゅ"]=b+"u"; t[c+"ょ"]=b+"o"; t[c+"ぇ"]=b+"e"; });
  return t; })();
function romaji(s){
  s=hira(s); let o="",i=0;
  while(i<s.length){
    const two=s.slice(i,i+2); if(two.length===2&&RT[two]){ o+=RT[two]; i+=2; continue; }
    const c=s[i];
    if(c==="っ"){ const nx=romaji(s.slice(i+1,i+3)); o+=nx&&!/^[aiueon']/.test(nx)?(nx.startsWith("ch")?"t":nx[0]):""; i++; continue; }
    if(c==="ん"){ o+=/[あいうえおやゆよ]/.test(s[i+1]||"")?"n'":"n"; i++; continue; }
    if(c==="ー"){ const m=o.match(/[aiueo]$/); o+=m?m[0]:"-"; i++; continue; }
    o+=RT[c]!=null?RT[c]:c; i++;
  }
  return o;
}
// on'yomi in CAPITALS, kun'yomi in small letters (dictionary style)
const romaOn=s=>romaji(s).toUpperCase();

// ---------- ruby text {漢|かん|on} ----------
const RB=/\{([^|}]+)\|([^|}]+)(?:\|([a-z]*))?\}/g;
function ruby(s,k,opt){
  opt=opt||{};
  return esc(s).replace(RB,(m,a,b,t)=>{
    if(opt.blank&&t&&a.includes(k)) return `<ruby><span class="blank"></span><rt class="y-${t}">${esc(b)}</rt></ruby>`;
    const cls=t&&!opt.nocolor?` class="y-${t}"`:"";
    const r=`<ruby>${a}<rt${cls}>${opt.both&&t&&a.includes(k)?`${b}・${kata(b)}`:b}</rt></ruby>`;
    return t&&a.includes(k)?`<mark${opt.nocolor?' class="plain"':""}>${r}</mark>`:r; });
}
const plainR=s=>s.replace(RB,(m,a)=>a);           // 漢字かなまじり
const readR=s=>s.replace(RB,(m,a,b)=>b);           // ぜんぶ かな
function tgtHTML(w,k,sent){ // 「学 = ガッ GAK」: on'yomi in katakana / CAPITALS
  RB.lastIndex=0; let m, t=null; while((m=RB.exec(w))){ if(m[1].includes(k)&&m[3]){ t={g:m[1],y:m[2],t:m[3],end:m.index+m[0].length}; break; } }
  if(!t) return "";
  const nx=readR(w.slice(t.end))[0]||""; let r=romaji(t.y);
  if(/っ$/.test(t.y)&&nx){ r=romaji(t.y+nx); r=r.slice(0,r.length-romaji(nx).length); }
  if(t.t==="on") r=r.toUpperCase();
  const al=sent?altR(w,k,true):(altR(w,k)?[plainR(w),altR(w,k)]:null);
  return `${TAGS[t.t]} ${esc(t.g)} = <b class="y-${t.t}">${esc(t.t==="on"?`${kata(t.y)}（${t.y}）`:t.y)}</b> <span class="roma">${esc(r)}</span>${al?`<span class="also">${esc(al[0])} can also be read <b class="jp">${esc(al[1])}</b> <span class="roma">${esc(romaji(al[1]))}</span>. Both are correct.</span>`:""}`;
}
// 十本 じゅっぽん/じっぽん のように、どちらの読みも正しいもの
const ALT={"十":{"じっ":"じゅっ","じゅっ":"じっ"}};
function altR(w,k,part){ const t=targetR(w,k), a=t&&ALT[k]&&ALT[k][t.y]; if(!a) return null;
  const w2=w.replace(`{${t.g}|${t.y}|${t.t}}`,`{${t.g}|${a}}`); if(!part) return readR(w2);
  // 文の中では、対象の字を ふくむ 漢字のまとまり（十本 など）だけ
  const m=w2.match(new RegExp(`(?:\\{[^}]*\\})*\\{${t.g}\\|${a}\\}(?:\\{[^}]*\\})*`)); return m?[plainR(m[0]),readR(m[0])]:null; }
function targetR(s,k){ RB.lastIndex=0; let m; while((m=RB.exec(s))){ if(m[1].includes(k)&&m[3]) return {g:m[1],y:m[2],t:m[3]}; } return null; }
const TAGS={on:'<span class="tag on">On’yomi</span>',kun:'<span class="tag kun">Kun’yomi</span>',sp:'<span class="tag sp">Special</span>'};
const TYPE={pic:["Picture kanji","象形","It started as a drawing of a real thing."],sym:["Sign kanji","指事","It uses simple marks to show an idea."],comb:["Combined kanji","会意・形声","It is made by putting kanji parts together."]};
function enHTML(t){ return `<span class="en ${S.set.en==="tap"?"cover":""}" onclick="this.classList.remove('cover')">${esc(t)}</span>`; }

// ---------- speech ----------
// 声は Google Cloud TTS（Callirrhoe）で 先に作った mp3（voice/）。ないものは 鳴らさない。
const VOICE=window.KVOICE||{};
const vkey=t=>hira(String(t)).trim();
const hasVoice=t=>!!VOICE[vkey(t)];
let curAudio=null;
function speak(text){
  if(!S.set.sound) return; const f=VOICE[vkey(text)]; if(!f) return;
  try{ if(curAudio){ curAudio.pause(); } curAudio=new Audio("voice/"+f); curAudio.play().catch(()=>{}); }catch(e){}
}
const sayBtn=(text,label)=>hasVoice(text)?`<button class="say" data-say="${esc(text)}" aria-label="${esc(label||"Listen")}">🔈</button>`:"";
function bindSay(root){ (root||app).querySelectorAll("[data-say]").forEach(b=>b.onclick=e=>{ e.stopPropagation(); speak(b.dataset.say); }); }

// ---------- KanjiVG strokes ----------
const NS="http://www.w3.org/2000/svg";
const measure=document.createElementNS(NS,"svg"); measure.setAttribute("width","0"); measure.setAttribute("height","0"); measure.style.position="absolute"; document.body.appendChild(measure);
const PTS={};
function strokePts(k){
  if(PTS[k]) return PTS[k];
  PTS[k]=(D.kvg[k]||[]).map(d=>{ const p=document.createElementNS(NS,"path"); p.setAttribute("d",d); measure.appendChild(p); const len=p.getTotalLength(); const pts=[]; for(let i=0;i<=24;i++){ const q=p.getPointAtLength(len*i/24); pts.push([q.x,q.y]); } measure.removeChild(p); return {d,len,pts}; });
  return PTS[k];
}
const SC=i=>`var(--s${i%18+1})`;
const gridSVG=()=>`<rect x="1" y="1" width="107" height="107" rx="6" fill="none"/><path d="M54.5 4V105M4 54.5H105" stroke="var(--grid)" stroke-width=".8" stroke-dasharray="3 3" fill="none"/>`;
const kanjiSVG=(k,cls)=>`<svg class="${cls||"kv"}" viewBox="0 0 109 109" role="img" aria-label="${k}">${gridSVG()}<g fill="none" stroke-linecap="round" stroke-linejoin="round"></g><g class="nums"></g></svg>`;
function animate(svg,k){
  const g=svg.querySelector("g"), nums=svg.querySelector(".nums"); g.innerHTML=""; nums.innerHTML="";
  const st=strokePts(k); const token={}; svg._tok=token;
  st.forEach(s=>{ const p=document.createElementNS(NS,"path"); p.setAttribute("d",s.d); p.setAttribute("stroke","var(--ghost)"); p.setAttribute("stroke-width","5"); g.appendChild(p); });
  let i=0; const placed=[];
  function next(){
    if(svg._tok!==token||i>=st.length) return;
    const s=st[i]; const p=document.createElementNS(NS,"path"); p.setAttribute("d",s.d); p.setAttribute("stroke",SC(i)); p.setAttribute("stroke-width","5.5");
    p.style.strokeDasharray=s.len; p.style.strokeDashoffset=s.len; g.appendChild(p);
    const t=document.createElementNS(NS,"text"); const [x,y]=s.pts[0]; let tx=Math.min(100,Math.max(2,x-7)), ty=Math.min(104,Math.max(8,y-2));
    for(let tries=0;tries<6&&placed.some(q=>Math.abs(q[0]-tx)<6&&Math.abs(q[1]-ty)<7);tries++){ tx=Math.max(2,tx-6); if(tries%2) ty=Math.min(104,ty+6); }
    placed.push([tx,ty]); t.setAttribute("x",tx); t.setAttribute("y",ty); t.setAttribute("font-size","8"); t.setAttribute("font-weight","900"); t.setAttribute("fill",SC(i)); t.setAttribute("stroke","var(--surface)"); t.setAttribute("stroke-width","1.6"); t.setAttribute("paint-order","stroke"); t.textContent=i+1; nums.appendChild(t);
    const dur=calm()?0:Math.max(260,s.len*11);
    p.getBoundingClientRect();
    p.style.transition=`stroke-dashoffset ${dur}ms linear`; p.style.strokeDashoffset=0;
    i++; setTimeout(next,dur+220);
  }
  setTimeout(next,300);
}
const animTime=k=>Math.min(9000,1200+strokePts(k).reduce((a,s)=>a+Math.max(260,s.len*11)+220,0));
function staticKanji(svg,k,hl){ const g=svg.querySelector("g"); g.innerHTML=strokePts(k).map((s,i)=>`<path d="${s.d}" stroke="${hl==null?SC(i):i===hl?"var(--ng)":"var(--ghost)"}" stroke-width="${hl===i?7:5.5}"/>`).join(""); }

// ---------- trace / write pad (checks each stroke) ----------
function resample(pts,n){
  const d=[0]; for(let i=1;i<pts.length;i++) d.push(d[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));
  const T=d[d.length-1]; if(T<1e-6) return Array.from({length:n+1},()=>pts[0].slice());
  const out=[]; let j=0; for(let i=0;i<=n;i++){ const t=T*i/n; while(j<d.length-2&&d[j+1]<t) j++; const r=(t-d[j])/((d[j+1]-d[j])||1); out.push([pts[j][0]+(pts[j+1][0]-pts[j][0])*r, pts[j][1]+(pts[j+1][1]-pts[j][1])*r]); }
  return out;
}
const plen=p=>{ let s=0; for(let i=1;i<p.length;i++) s+=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]); return s; };
const dist=(a,b)=>{ let s=0; for(let i=0;i<a.length;i++) s+=Math.hypot(a[i][0]-b[i][0],a[i][1]-b[i][1]); return s/a.length; };
const ord=n=>n+(["th","st","nd","rd"][(n%100>10&&n%100<14)?0:Math.min(n%10,4)%4]||"th");
function makePad(host,k,mode,onDone,onMsg){
  host.innerHTML=`<svg class="kv" viewBox="0 0 109 109" aria-label="Writing pad">${gridSVG()}<g class="ghost" fill="none" stroke-linecap="round" stroke-linejoin="round"></g><g class="done" fill="none" stroke-linecap="round" stroke-linejoin="round"></g><g class="hint" fill="none" stroke-linecap="round"></g><path class="fail" fill="none" stroke="var(--ng)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/><path class="ink" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const svg=host.querySelector("svg"), ghost=svg.querySelector(".ghost"), done=svg.querySelector(".done"), hint=svg.querySelector(".hint"), ink=svg.querySelector(".ink"), fail=svg.querySelector(".fail");
  const st=strokePts(k); let cur=0, miss=0, totalMiss=0, pts=null, pid=null, penUsed=false;
  const TOL=mode==="trace"?13:17;
  if(mode==="trace") ghost.innerHTML=st.map(s=>`<path d="${s.d}" stroke="var(--ghost)" stroke-width="7"/>`).join("");
  function showHint(strong){
    hint.innerHTML=""; if(cur>=st.length) return;
    if(mode==="write"&&!strong) return;
    const s=st[cur], [x,y]=s.pts[0], [x2,y2]=s.pts[3];
    const a=Math.atan2(y2-y,x2-x)*180/Math.PI;
    hint.innerHTML=(strong||mode==="trace"?`<path d="${s.d}" stroke="color-mix(in srgb,${SC(cur)} 40%,transparent)" stroke-width="7"/>`:"")+`<circle cx="${x}" cy="${y}" r="4.2" fill="var(--ng)"/><path d="M${x+5},${y} l4,0 m-2,-2.2 l2,2.2 l-2,2.2" stroke="var(--ng)" stroke-width="1.6" transform="rotate(${a} ${x} ${y})"/>`;
  }
  showHint(false);
  function pt(e){ const m=svg.getScreenCTM().inverse(); const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(m); return [p.x,p.y]; }
  svg.addEventListener("pointerdown",e=>{ if(cur>=st.length||pid!==null) return; if(e.pointerType==="pen") penUsed=true; else if(penUsed&&e.pointerType==="touch") return; e.preventDefault(); pid=e.pointerId; try{svg.setPointerCapture(pid);}catch(_){} pts=[pt(e)]; ink.setAttribute("d",`M${pts[0][0]},${pts[0][1]}`); });
  svg.addEventListener("pointermove",e=>{ if(e.pointerId!==pid||!pts) return; e.preventDefault(); const p=pt(e), q=pts[pts.length-1]; if(Math.hypot(p[0]-q[0],p[1]-q[1])<.6) return; pts.push(p); ink.setAttribute("d",ink.getAttribute("d")+` L${p[0]},${p[1]}`); });
  const end=e=>{ if(e.pointerId!==pid) return; pid=null; const p=pts; pts=null; if(p) judge(p); };
  svg.addEventListener("pointerup",end); svg.addEventListener("pointercancel",e=>{ if(e.pointerId===pid){ pid=null; pts=null; ink.setAttribute("d",""); } });
  ["touchstart","touchmove"].forEach(t=>svg.addEventListener(t,e=>e.preventDefault(),{passive:false}));
  const offs=[];
  const cen=p=>{ let x=0,y=0; p.forEach(q=>{x+=q[0];y+=q[1];}); return [x/p.length,y/p.length]; };
  function shiftOf(){ if(mode!=="write"||!offs.length) return [0,0]; const m=cen(offs); return [Math.max(-18,Math.min(18,m[0])),Math.max(-18,Math.min(18,m[1]))]; }
  function check(user,s){
    const ul=plen(user), N=24, sh=shiftOf();
    const first=mode==="write"&&!offs.length, T=first?TOL*1.4:TOL;
    const u=resample(user,N).map(q=>[q[0]-sh[0],q[1]-sh[1]]);
    const uc=cen(u), sc=cen(s.pts);
    if(s.len<16){ const d=Math.hypot(uc[0]-sc[0],uc[1]-sc[1]); return {r:ul<=Math.max(30,s.len*2.5)&&d<T*1.3?"ok":"no",d}; }
    const f=dist(u,s.pts), rv=dist(u.slice().reverse(),s.pts);
    const tol=Math.max(T, Math.min(T*1.5,s.len*.22));
    const lenOk=ul>s.len*.35 && ul<s.len*2.2+14;
    const ue=[u[N][0]-u[0][0],u[N][1]-u[0][1]], se=[s.pts[24][0]-s.pts[0][0],s.pts[24][1]-s.pts[0][1]];
    const cos=(ue[0]*se[0]+ue[1]*se[1])/((Math.hypot(...ue)*Math.hypot(...se))||1);
    const curved=Math.hypot(...se)<s.len*.5;
    if(f<tol&&lenOk&&(curved?f<rv:(cos>.3||f<rv*.7))) return {r:"ok",d:f};
    if(rv<tol&&lenOk&&rv<f*.8&&(curved||cos<-.3)) return {r:"rev",d:rv};
    return {r:"no",d:f};
  }
  function judge(user){
    const s=st[cur]; const c0=check(user,s); let res=c0.r;
    let other=-1; for(let j=cur+1;j<st.length;j++){ const cj=check(user,st[j]); if(cj.r==="ok"&&(res!=="ok"||cj.d<c0.d*.6)){ other=j; break; } }
    if(other>=0) res="no";
    if(res==="ok"){
      { const uc=cen(resample(user,24)), sc=cen(s.pts); offs.push([uc[0]-sc[0],uc[1]-sc[1]]); }
      ink.setAttribute("d","");
      const p=document.createElementNS(NS,"path"); p.setAttribute("d",s.d); p.setAttribute("stroke",SC(cur)); p.setAttribute("stroke-width","5.5"); done.appendChild(p);
      cur++; miss=0; showHint(false);
      if(cur>=st.length){ hint.innerHTML=""; onMsg&&onMsg(totalMiss===0?"Perfect! Great job!":"Done! Nice work!","ok"); onDone&&onDone(totalMiss); }
      else onMsg&&onMsg(`Stroke ${cur} OK! Now stroke ${cur+1}.`,"ok");
      return;
    }
    miss++; totalMiss++;
    fail.setAttribute("d",ink.getAttribute("d")); ink.setAttribute("d",""); const ft=fail._t=(fail._t||0)+1; setTimeout(()=>{ if(fail._t===ft) fail.setAttribute("d",""); },700);
    const msg=res==="rev"?"Wrong direction. Start from the red dot.":other>=0?`That's the ${ord(other+1)} stroke. Write stroke ${cur+1} first!`:"Almost! Try that stroke again.";
    onMsg&&onMsg(msg,"ng");
    showHint(mode==="trace"||miss>=2||res==="rev"||other>=0);
  }
  return {get misses(){ return totalMiss; }, get stroke(){ return cur; }, hint(){ showHint(true); }};
}

// ---------- shared bits ----------
const meaning=k=>K[k].m;
const shortM=k=>K[k].m.split(";")[0].replace(/\s*\(.*?\)/g,"").trim();
const talk=(ch,t)=>`<div class="talk"><img src="img/chara-${ch}.webp" alt=""><p>${esc(t)}</p></div>`;
const pipsH=(n,need)=>need<2?"":`<div class="pips" aria-label="${n} of ${need}">${Array.from({length:need},(_,i)=>`<i class="${i<n?"on":""}"></i>`).join("")}</div>`;
function kira(){
  if(calm()) return;
  const set=["✨","⭐","🌟","💫"];
  for(let i=0;i<18;i++){ const s=document.createElement("span"); s.className="kira"; s.textContent=set[i%4]; s.style.left="50%"; s.style.top="40%"; s.style.setProperty("--dx",(Math.random()*300-150)+"px"); s.style.setProperty("--dy",(Math.random()*300-120)+"px"); document.body.appendChild(s); setTimeout(()=>s.remove(),1500); }
}
const secOf=k=>SECS.findIndex(a=>a.includes(k));
const nextK=()=>KS.find(k=>!L[k]);
const stOk=(k,t)=>{ const x=(S.st[k]||{}); return t?(x[t]&&x[t][0]>0):Object.values(x).some(v=>v[0]>0); };
function readingsList(k){
  const I=K[k];
  const on=I.on.map(x=>({k:x,r:romaOn(x),t:"on"}));
  const kun=I.kun.map(([a,b])=>({k:a,ok:b,r:romaji(a)+(b?"("+romaji(b)+")":""),g:I.y[a+b]||"",t:"kun",full:a+b}));
  return {on,kun};
}
const DAKU={"か":"が","き":"ぎ","く":"ぐ","け":"げ","こ":"ご","さ":"ざ","し":"じ","す":"ず","せ":"ぜ","そ":"ぞ","た":"だ","ち":"じ","つ":"ず","て":"で","と":"ど","は":"ば","ひ":"び","ふ":"ぶ","へ":"べ","ほ":"ぼ"};
const HAND={"は":"ぱ","ひ":"ぴ","ふ":"ぷ","へ":"ぺ","ほ":"ぽ"};
function sameReading(y,base){ // がっ ≈ がく, ぞら ≈ そら, ぱつ ≈ はつ
  const vs=new Set([base]); if(DAKU[base[0]]) vs.add(DAKU[base[0]]+base.slice(1)); if(HAND[base[0]]) vs.add(HAND[base[0]]+base.slice(1));
  [...vs].forEach(v=>{ if(v.length>1) vs.add(v.slice(0,-1)+"っ"); });
  return vs.has(y);
}
function wordsFor(k,y){ // words where k is read as y
  return [...K[k].w,...(K[k].e||[])].filter(([w])=>{ const t=targetR(w,k); return t&&t.g.length===1&&(y.t==="on"?sameReading(t.y,hira(y.k)):(t.t==="kun"&&sameReading(t.y,y.k))); });
}
function yomiHTML(k){
  const {on,kun}=readingsList(k);
  let n=0;
  const one=y=>{ const ws=wordsFor(k,y); const id="yx"+(n++);
    return `<button class="yv" ${ws.length?`data-yx="${id}" aria-expanded="false"`:"disabled"}><span class="k y-${y.t}">${esc(y.k)}${y.ok?`<span class="okuri">(${esc(y.ok)})</span>`:""}${y.t==="on"?`<span class="hk">${esc(hira(y.k))}</span>`:""}</span><span class="r roma">${esc(y.r)}</span>${y.g?`<span class="g">${esc(y.g)}</span>`:""}${ws.length?`<span class="more">▸ example</span>`:""}</button>
    ${ws.length?`<div class="yx" id="${id}" hidden>${ws.slice(0,2).map(([w,e])=>`<span><span class="jp" style="font-size:1.15rem">${ruby(w,k)}</span> <span class="roma">${esc(romaji(readR(w)))}</span> · ${esc(e)}</span>`).join("")}</div>`:""}`; };
  return `<div class="yomi">${on.length?`<div class="yh">${TAGS.on}<span class="spacer"></span>${sayBtn(on.map(y=>y.k).join("、"),"Listen to on'yomi")}</div><div class="ylist">${on.map(one).join("")}</div>`:""}
  ${kun.length?`<div class="yh">${TAGS.kun}<span class="spacer"></span>${sayBtn(kun.map(y=>y.full).join("、"),"Listen to kun'yomi")}</div><div class="ylist">${kun.map(one).join("")}</div>`:""}<p class="legend" style="text-align:left;margin:0">Tap a reading to see a word that uses it.</p></div>`;
}
function bindYomi(root){ (root||app).querySelectorAll("[data-yx]").forEach(b=>b.onclick=()=>{ const x=document.getElementById(b.dataset.yx); const open=x.hidden; x.hidden=!open; b.setAttribute("aria-expanded",open); const m=b.querySelector(".more"); if(m) m.textContent=open?"▾ example":"▸ example"; }); }
const ONKUN_TIP=`<details class="tip"><summary>What are on’yomi and kun’yomi?</summary>
<p><b class="y-on">On’yomi (音読み)</b> is the “Chinese reading” that came to Japan with the kanji. It is written in <b>katakana</b> here (and CAPITALS in romaji). It is mostly used in words made of two or more kanji, like 学校 (gakkou).</p>
<p><b class="y-kun">Kun’yomi (訓読み)</b> is the native Japanese word for the same meaning. It is written in <b>hiragana</b>. It is often used when the kanji stands alone or has kana after it, like 山 (yama) or 見る (miru).</p>
<p>Kana in (brackets) is <b>okurigana</b>: the kana that follows the kanji, like the る in 見る.</p></details>`;

// ---------- router ----------
let leaveCurrent=null;
function go(h){ if(location.hash===h) route(); else location.hash=h; }
function route(){
  if(leaveCurrent){ try{ leaveCurrent(); }catch(e){} leaveCurrent=null; }
  try{ speechSynthesis.cancel(); }catch(e){}
  document.querySelectorAll(".ov,.sheet").forEach(x=>x.remove());
  const h=decodeURIComponent(location.hash.slice(1)).split("/").filter(Boolean);
  if(h[0]==="f"&&CHS.includes(h[1])){ S.ch=h[1]; save(); return hub(); }
  if(!S.ch||!h.length) return home();
  if(h[0]==="learn"&&K[h[1]]) return lesson(h[1],+h[2]||0);
  if(h[0]==="quiz") return quiz();
  if(h[0]==="play") return play(h[1]);
  if(h[0]==="box") return box();
  return home();
}
window.addEventListener("hashchange",route);

// ---------- screen: home ----------
function home(){
  theme("home");
  const n=KS.filter(k=>L[k]).length;
  app.innerHTML=`<div class="top"><span class="spacer"></span><button class="pill" id="setBtn" aria-label="Settings">⚙ Settings</button></div>
  <header class="title"><h1>Kanji <span>Friends</span></h1><div class="jp">かんじフレンズ</div>
  <p>Learn real Japanese kanji with a friend. Meanings, stories, words and sentences are explained in English, with furigana and romaji.</p></header>
  <h2 class="sec">Choose your friend</h2>
  <div class="friends">${CHS.map(c=>`<a class="friend ${c} ${S.ch===c?"cur":""}" href="#/f/${c}"><img src="img/chara-${c}.webp" alt=""><b>${FR[c].name}</b><small>${esc(STAGES[c][stageOf(c)])}</small></a>`).join("")}</div>
  <h2 class="sec">Level</h2>
  <div class="levels"><div class="level on"><span class="lv-k">一</span><span>Grade 1 kanji <span class="jp" style="color:var(--muted);font-size:.8rem">1年生</span></span><small>${n} / ${KS.length} learned</small></div>
  <div class="level" style="opacity:.55"><span class="lv-k">二</span><span>Grade 2 kanji</span><small>coming soon</small></div></div>
  ${ONKUN_TIP}
  <p class="foot">Your progress is saved on this device (in this browser). Your learned kanji are shared by all four friends; each friend grows with your quiz answers.</p>`;
  $("#setBtn").onclick=settings;
}

// ---------- screen: friend hub ----------
function heroHTML(ch,sticky){
  const st=stageOf(ch), c=FS(ch).correct, need=st>=14?0:PER-(c%PER);
  const n=KS.filter(k=>L[k]).length;
  return `<div class="hero ${sticky?"sticky":""}" id="hero"><img src="${evoImg(ch,st)}" alt="${esc(STAGES[ch][st])}"><div><h1>${FR[ch].name}</h1><div class="stage">Stage ${st+1}: ${esc(STAGES[ch][st])}</div>
  ${sticky?`<div class="bar"><i style="width:${st>=14?100:(c%PER)/PER*100}%"></i></div><p>${st>=14?"Fully grown! Amazing!":`${need} more correct to grow`}</p>`:`<p>Kanji learned: <b>${n}</b> / ${KS.length}</p><div class="bar"><i style="width:${n/KS.length*100}%"></i></div>`}</div></div>`;
}
function hub(){
  const ch=S.ch; theme(ch); const F=FR[ch], fs=FS(ch);
  const n=KS.filter(k=>L[k]).length, nk=nextK();
  const star=k=>`<span class="st">${L[k]?"<b>★</b>":"☆"}${stOk(k)?"<b>★</b>":"☆"}${stOk(k,"write")?"<b>★</b>":"☆"}</span>`;
  let chaps="";
  SECS.forEach((ks,c)=>{
    const spi=fs.sp[c];
    chaps+=`<section class="chap" ${nk&&secOf(nk)===c?'id="cur"':""}><h2>${F.place} ${c+1}. ${esc(SEC_NAMES[c])} <span class="cnt">${ks.filter(k=>L[k]).length}/${ks.length}</span><span class="sp ${spi!=null?"got":""}" title="Learn them all for a special prize">${spi!=null?F.special[spi][0]:"🎁"}</span></h2><div class="tiles">`+
      ks.map(k=>`<button class="tile ${L[k]?"done":""} ${k===nk?"next":""}" data-k="${k}" aria-label="${k}, ${esc(shortM(k))}${L[k]?", learned":""}">${k}<span class="tm">${esc(shortM(k))}</span>${star(k)}</button>`).join("")+`</div></section>`;
  });
  const t=tickets();
  app.innerHTML=`<div class="top"><a class="pill" href="#/">‹ Friends</a><span class="spacer"></span><a class="pill" href="#/box">${F.boxE} ${esc(F.box)} (${Object.keys(fs.items).length+Object.keys(fs.sp).length})</a><button class="pill" id="setBtn" aria-label="Settings">⚙</button></div>
  ${heroHTML(ch)}
  <div class="modes"><a href="#/learn/${nk||KS[0]}" class="on">📖 Learn<small>おぼえる</small></a><a href="#/quiz">✏️ Quiz<small>クイズ</small></a><a href="#/play">🎪 Play<small>あそびば</small>${t?`<span class="n">${t}</span>`:""}</a></div>
  ${nk?`<a class="btn pri" href="#/learn/${nk}" style="padding:14px;font-size:1.08rem">Learn the next kanji: <span style="font-family:var(--f-k);font-size:1.4rem;margin:0 4px">${nk}</span> (${esc(shortM(nk))}) ›</a>`:`<p class="msg ok">You learned all ${KS.length} kanji! Try the quiz!</p>`}
  <details class="tip"><summary>How it works</summary>
  <p><b>Learn</b>: 7 short steps for each kanji: watch the stroke order, read its story, trace it, write it, then meet real words and sentences. Every ${PER_ITEM} kanji you learn, you get a prize for your ${esc(F.box.toLowerCase())}.</p>
  <p><b>Quiz</b>: every ${PER} correct answers, your ${esc(F.who)} grows to a new stage (15 stages!). Every ${TICKET} correct answers give you a ticket for the <b>Play</b> zone.</p>
  <p>Stars on each kanji: ★ learned · ★ correct in the quiz · ★ written correctly in the quiz.</p></details>
  ${chaps}
  <div class="card"><h3>${esc(F.who)}'s growth</h3><div class="evo-row">${STAGES[ch].map((nm,i)=>`<figure class="${i>stageOf(ch)?"lock":""} ${i===stageOf(ch)?"now":""}"><img src="${evoImg(ch,i)}" alt="" loading="lazy"><figcaption>${i<=stageOf(ch)?esc(nm):"?"}</figcaption></figure>`).join("")}</div></div>`;
  app.querySelectorAll(".tile").forEach(b=>b.onclick=()=>go("#/learn/"+b.dataset.k));
  $("#setBtn").onclick=settings;
  window.scrollTo(0,0);
}

// ---------- screen: treasure box ----------
function box(){
  const ch=S.ch; theme(ch); const F=FR[ch], fs=FS(ch);
  const spL=Object.values(fs.sp);
  app.innerHTML=`<div class="top"><a class="pill" href="#/f/${ch}">‹ Back</a></div>
  <div class="hero"><img src="${evoImg(ch)}" alt=""><div><h1>${F.boxE} ${esc(F.box)}</h1><p>Learn ${PER_ITEM} kanji to get a prize. Learn every kanji in one group to get a special prize!</p></div></div>
  <section class="card"><h3>Special prizes (${spL.length})</h3><div class="shelf">${F.special.map((x,i)=>spL.includes(i)?`<div class="it sp">${x[0]}<small>${esc(x[1])}</small></div>`:`<div class="it no">?</div>`).join("")}</div></section>
  <section class="card"><h3>Prizes (${Object.keys(fs.items).length} / ${F.items.length} kinds)</h3><div class="shelf">${F.items.map((x,i)=>fs.items[i]?`<div class="it">${fs.items[i]>1?`<span class="n">×${fs.items[i]}</span>`:""}${x[0]}<small>${esc(x[1])}</small></div>`:`<div class="it no">?</div>`).join("")}</div></section>`;
  window.scrollTo(0,0);
}
function giveItem(ch){
  const fs=FS(ch), all=FR[ch].items, notYet=all.map((x,i)=>i).filter(i=>!fs.items[i]);
  const i=notYet.length?pick(notYet):Math.floor(Math.random()*all.length);
  fs.items[i]=(fs.items[i]||0)+1; return {e:all[i][0],n:all[i][1],sp:false};
}
function giveSpecial(ch,ci){
  const fs=FS(ch); if(fs.sp[ci]!=null) return null;
  const used=new Set(Object.values(fs.sp)); let i=FR[ch].special.findIndex((x,j)=>!used.has(j)); if(i<0) i=0;
  fs.sp[ci]=i; return {e:FR[ch].special[i][0],n:FR[ch].special[i][1],sp:true};
}

// ---------- settings ----------
function settings(){
  document.querySelectorAll(".sheet,.ov").forEach(x=>x.remove());
  const bg=document.createElement("div"); bg.className="ov"; bg.style.background="rgba(30,20,40,.45)";
  const sh=document.createElement("div"); sh.className="sheet "+(S.ch||"home"); sh.setAttribute("role","dialog"); sh.setAttribute("aria-label","Settings");
  const seg=(key,opts)=>`<div class="seg">${opts.map(([v,l])=>`<button data-k="${key}" data-v="${v}" class="${S.set[key]===v?"on":""}">${l}</button>`).join("")}</div>`;
  sh.innerHTML=`<h2>⚙ Settings</h2>
  <label class="set"><div><b>Romaji</b><small>Show readings in Latin letters, like <i>yama</i>.</small></div><input type="checkbox" class="sw" data-b="roma" ${S.set.roma?"checked":""}></label>
  <label class="set"><div><b>Furigana</b><small>Small kana above kanji in words and sentences.</small></div><input type="checkbox" class="sw" data-b="furi" ${S.set.furi?"checked":""}></label>
  <div class="set"><div><b>English translations</b><small>“Tap to show” hides them so you can test yourself.</small></div>${seg("en",[["show","Show"],["tap","Tap to show"]])}</div>
  <label class="set"><div><b>Sound</b><small>Japanese voice for 🔈 buttons (uses your device’s voice).</small></div><input type="checkbox" class="sw" data-b="sound" ${S.set.sound?"checked":""}></label>
  <div class="set"><div><b>Theme</b></div>${seg("theme",[["auto","Auto"],["light","Light"],["dark","Dark"]])}</div>
  <div class="row"><button class="btn" id="reset" style="border-color:var(--ng);color:var(--ng)">Reset all progress</button><button class="btn pri" id="close">Done</button></div>`;
  document.body.append(bg,sh);
  const close=()=>{ bg.remove(); sh.remove(); route(); };
  bg.onclick=close; $("#close").onclick=close;
  sh.querySelectorAll("[data-b]").forEach(i=>i.onchange=()=>{ S.set[i.dataset.b]=i.checked; save(); applySettings(); });
  sh.querySelectorAll(".seg button").forEach(b=>b.onclick=()=>{ S.set[b.dataset.k]=b.dataset.v; save(); applySettings(); b.parentNode.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b)); });
  let armed=false;
  $("#reset").onclick=()=>{ if(!armed){ armed=true; $("#reset").textContent="Tap again to erase everything"; return; } const set=S.set; S={set,learned:{},st:{},fr:{},play:{used:0,best:{}},q:{}}; save(); location.hash="#/"; close(); };
}

// ---------- screen: lesson (7 steps) ----------
const STEPS=["Look","Story","Trace","Write","Words","Sentences","Check"];
const NEED_TRACE=1, NEED_WRITE=1;
function lesson(k,startStep){
  const ch=S.ch; theme(ch); const F=FR[ch], I=K[k];
  const firstTime=!L[k]; let step=firstTime?0:Math.min(startStep||0,STEPS.length-1);
  const done={};
  function frame(body,canNext,nextLabel){
    app.innerHTML=`<div class="top"><a class="pill" href="#/f/${ch}">‹ All kanji</a><span class="spacer"></span><span class="pill on" style="font-family:var(--f-k);font-size:1.1rem">${step===3?"？":k}</span><span class="pill">${esc(shortM(k))}</span></div>
    <div class="steps">${STEPS.map((s,i)=>`<button class="${i===step?"on":i<step?"dn":""} ${!firstTime?"jmp":""}" data-s="${i}" ${firstTime?'tabindex="-1"':""}>${i+1}<br>${s}</button>`).join("")}</div>
    <div class="lesson">${body}</div>
    <div class="nav"><button class="btn" id="prev" ${step===0?"disabled":""}>‹ Back</button><button class="btn pri" id="next" ${canNext||done[step]||!firstTime?"":"disabled"}>${nextLabel||"Next ›"}</button></div>`;
    $("#prev").onclick=()=>{ step--; show(); }; $("#next").onclick=()=>{ done[step]=true; step++; show(); };
    if(!firstTime) app.querySelectorAll(".steps button").forEach(b=>b.onclick=()=>{ step=+b.dataset.s; show(); });
    bindSay(); window.scrollTo(0,0);
  }
  const unlock=()=>{ done[step]=true; $("#next").disabled=false; };
  const nudge=()=>{ const b=$("#next"); if(!b) return; b.classList.remove("hop"); void b.offsetWidth; b.classList.add("hop"); };
  const msgFn=(t,c)=>{ const m=$("#msg"); if(m){ m.textContent=t; m.className="msg "+c; } };
  function show(){
    if(step>=STEPS.length) return finish();
    if(step===0){
      frame(`<div class="card look"><div class="look-top"><div class="big">${kanjiSVG(k,"kv kv-s")}</div><div class="look-side"><p class="mean">${esc(I.m)}</p><dl class="facts"><dt>Strokes</dt><dd>${I.s}</dd><dt>Radical</dt><dd><span style="font-family:var(--f-k);font-size:1.15rem">${esc(I.rad)}</span>${I.radE?` “${esc(I.radE)}”`:""}</dd></dl><button class="btn sm" id="again">▶ Play again</button></div></div>
      <p class="legend">Colors show the stroke order: <b style="color:var(--s1)">1 red</b> → <b style="color:var(--s2)">2 blue</b> → <b style="color:var(--s3)">3 yellow</b> → <b style="color:var(--s4)">4 green</b> → …</p>
      <h3>Readings <span class="jp">よみかた</span></h3>${yomiHTML(k)}
      </div>${ONKUN_TIP}`,true);
      const svg=app.querySelector(".kv"); bindYomi(); animate(svg,k); const tk=setTimeout(nudge,animTime(k)); $("#again").onclick=()=>{ animate(svg,k); };
    }else if(step===1){
      const T=TYPE[I.t]||TYPE.comb;
      frame(`${talk(ch,F.say.nari)}<div class="card"><span class="badge" style="align-self:flex-start">${T[0]} <span class="jp" style="opacity:.85">${T[1]}</span></span><div class="nari-k">${k}</div><p class="mean" style="font-size:1.2rem">${esc(I.m)}</p><p class="nari">${esc(I.o)}</p><p class="legend" style="text-align:left">${T[2]}</p>
      <details><summary class="legend" style="text-align:left;cursor:pointer">日本語で読む (Read it in Japanese)</summary><p class="nari-jp" lang="ja">${esc(I.oj)}</p></details></div>`,true);
    }else if(step===2){
      let round=0;
      frame(`${talk(ch,F.say.trace)}<div class="card"><p class="count" id="cnt"></p><div id="pp"></div><div class="big" id="pad"></div><p class="msg" id="msg" aria-live="polite"></p><div class="row"><button class="btn" id="redo">↺ Start over</button></div></div>`,false);
      const run=()=>{ $("#cnt").textContent=done[2]?`You traced it! Trace again if you like.`:`Trace from the red dot`; $("#pp").innerHTML=pipsH(Math.min(round,NEED_TRACE),NEED_TRACE);
        makePad($("#pad"),k,"trace",()=>{ round++; $("#pp").innerHTML=pipsH(Math.min(round,NEED_TRACE),NEED_TRACE); if(round>=NEED_TRACE&&!done[2]){ unlock(); $("#cnt").textContent=`You traced it! Tap Next.`; nudge(); } else if(round<NEED_TRACE) setTimeout(()=>{ msgFn("One more time!",""); run(); },900); },msgFn); };
      run(); $("#redo").onclick=()=>{ msgFn("",""); run(); };
    }else if(step===3){
      let round=0;
      frame(`${talk(ch,F.say.write)}<div class="card"><p class="count" id="cnt"></p><div id="pp"></div><div id="ctx"></div><div class="big" id="pad"></div><p class="msg" id="msg" aria-live="polite"></p><div class="row"><button class="btn" id="peek">👀 Show me</button><button class="btn" id="redo">↺ Start over</button></div></div>`,false);
      const run=()=>{
        const r=Math.min(round,NEED_WRITE-1), inSent=NEED_WRITE>=3&&r>=NEED_WRITE-2&&I.x.length;
        $("#pp").innerHTML=pipsH(Math.min(round,NEED_WRITE),NEED_WRITE);
        $("#cnt").textContent=done[3]?`You wrote it! Write again if you like.`:inSent?`Write the kanji that goes in the box`:`Write it from memory`;
        const X=inSent&&!done[3]?I.x[(r-(NEED_WRITE-2))%I.x.length]:null;
        $("#ctx").innerHTML=X?`<p class="sent" style="text-align:center">${ruby(X[0],k,{blank:true})}</p><p class="legend">${esc(X[1])}</p>`:`<p class="wr-hint"><b>“${esc(shortM(k))}”</b><span class="jp">${I.on.map(x=>`<span class="y-on">${esc(x)}（${esc(hira(x))}）</span>`).join("・")}${I.on.length&&I.kun.length?"・":""}${I.kun.map(([a,b])=>`<span class="y-kun">${esc(a)}</span>${b?`<span class="okuri">(${esc(b)})</span>`:""}`).join("・")}</span></p>`;
        makePad($("#pad"),k,"write",()=>{ round++; $("#pp").innerHTML=pipsH(Math.min(round,NEED_WRITE),NEED_WRITE);
          if(round>=NEED_WRITE&&!done[3]){ unlock(); $("#cnt").textContent=`You wrote it! Excellent! Tap Next.`; nudge(); $("#ctx").innerHTML=""; }
          else if(round<NEED_WRITE) setTimeout(()=>{ msgFn(round===NEED_WRITE-2?"Now write it inside a sentence!":"One more time!",""); run(); },900); },msgFn); };
      run(); $("#redo").onclick=()=>{ msgFn("",""); run(); };
      $("#peek").onclick=()=>{ const h=$("#pad"); h.innerHTML=kanjiSVG(k); animate(h.querySelector("svg"),k); $("#peek").disabled=true; setTimeout(()=>{ $("#peek").disabled=false; run(); },animTime(k)); };
    }else if(step===4){
      frame(`${talk(ch,F.say.word)}<div class="card"><h3>Words with ${k} <span class="jp">ことば</span></h3><p class="legend" style="text-align:left">The reading of <mark>${k}</mark> is colored: <span class="y-on" style="font-weight:900">blue = on’yomi</span>, <span class="y-kun" style="font-weight:900">orange = kun’yomi</span>, <span class="y-sp" style="font-weight:900">purple = special reading</span>.</p>
      <div class="wlist">${I.w.map(([w,e])=>{ return `<div class="wrow"><span class="wk">${ruby(w,k)}</span>${sayBtn(readR(w),"Listen")}<span class="wm"><span class="roma">${esc(romaji(readR(w)))}</span><span class="roma"> · </span>${enHTML(e)}</span><span class="wt">${tgtHTML(w,k)}</span></div>`; }).join("")}</div></div>`,true);
    }else if(step===5){
      const ACT=[["rep","🗣 Read it aloud"],["hide","🙈 Hide furigana & read"]];
      const st=I.x.map(()=>({rep:false,hide:false}));
      let busy=false;
      frame(`${talk(ch,F.say.sent)}<div class="card"><h3>Example sentences <span class="jp">れいぶん</span></h3><p class="legend" style="text-align:left">① Press <b>“Read it aloud”</b> and read along with the <b style="background:rgba(255,205,60,.75)">yellow line</b>.<br>② Then <b>hide the furigana</b> and read it once more. Tap 🔈 to hear it.</p><div class="rei-box">${I.x.map((x,i)=>`<div class="rei-item" id="ri${i}"><div class="rei-now">▶ Read this sentence</div><div class="rei-line"><p class="sent">${ruby(x[0],k)}</p>${sayBtn(readR(x[0]),"Listen")}</div><span class="roma">${esc(x[2])}</span>${enHTML(x[1])}<div class="legend" style="text-align:left">${tgtHTML(x[0],k,true)}</div><div class="rei-tools">${ACT.map(([a,l])=>`<button class="btn" data-a="${a}" data-i="${i}">${l}</button>`).join("")}</div></div>`).join("")}</div><p class="count" id="cnt"></p></div>`,false);
      // split each sentence into units (one kana or one ruby word) so the yellow line moves along, line by line
      I.x.forEach((x,i)=>{ const p=$("#ri"+i+" .sent"); [...p.childNodes].forEach(n=>{ if(n.nodeType===3){ const f=document.createDocumentFragment(); [...n.textContent].forEach(c=>{ const u=document.createElement("span"); u.className="su"; u.textContent=c; f.appendChild(u); }); p.replaceChild(f,n); } else { const u=document.createElement("span"); u.className="su"; p.replaceChild(u,n); u.appendChild(n); } }); });
      const sweep=(i,then)=>{ const us=[...$("#ri"+i).querySelectorAll(".su")]; us.forEach(u=>u.classList.remove("lit")); busy=true; upd();
        const n=us.reduce((a,u)=>a+Math.max(1,(u.querySelector("rt")||u).textContent.length),0), per=calm()?60:Math.max(1500,n*260)/n; let j=0;
        const step=()=>{ if(j>=us.length){ busy=false; then(); upd(true); return; } const u=us[j++]; u.classList.add("lit"); setTimeout(step,per*Math.max(1,(u.querySelector("rt")||u).textContent.length)); };
        step(); };
      const need=i=>st[i].rep&&st[i].hide;
      const upd=(scroll)=>{ const n=st.filter((x,i)=>need(i)).length; const cur=st.findIndex((x,i)=>!need(i));
        I.x.forEach((x,i)=>{ const bx=$("#ri"+i); bx.classList.toggle("now",i===cur); bx.classList.toggle("wait",cur>=0&&i>cur);
          bx.querySelector('[data-a="rep"]').disabled=busy||i!==cur||st[i].rep; bx.querySelector('[data-a="hide"]').disabled=busy||i!==cur||!st[i].rep; });
        $("#cnt").textContent=n>=st.length?"You read them all! Great!":`Sentences done: ${n} / ${st.length}`;
        if(n>=st.length){ unlock(); nudge(); }
        else if(scroll){ const bx=$("#ri"+cur); setTimeout(()=>bx.scrollIntoView({behavior:calm()?"auto":"smooth",block:"center"}),350); } };
      app.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{ if(busy) return; const i=+b.dataset.i, a=b.dataset.a, bx=$("#ri"+i);
        if(a==="rep"){ sweep(i,()=>{ st[i].rep=true; b.classList.add("done"); b.textContent="✓ Read it aloud"; }); }
        if(a==="hide"){ bx.classList.add("rt-hide"); sweep(i,()=>{ st[i].hide=true; b.classList.add("done"); b.textContent="✓ I read it!"; bx.classList.remove("rt-hide"); bx.classList.add("rdone"); }); } });
      upd();
    }else if(step===6){
      const qs=lessonQuiz(k); let qi=0;
      frame(`${talk(ch,F.say.check)}<div class="card" id="quiz"></div>`,false,"Finish ✨");
      function q(){
        const Q=qs[qi], bx=$("#quiz");
        bx.innerHTML=`<h3>Check ${qi+1} / ${qs.length}</h3><p class="q">${Q.q}</p><div class="choices ${Q.one?"one":""}">${Q.c.map((c,i)=>`<button data-i="${i}">${c.h}</button>`).join("")}</div><p class="msg" id="qm" aria-live="polite"></p>`;
        bx.querySelectorAll(".choices button").forEach(b=>b.onclick=()=>{
          const c=Q.c[+b.dataset.i];
          if(c.v===Q.a){ b.classList.add("ok"); bx.querySelectorAll(".choices button").forEach(x=>x.disabled=true); $("#qm").innerHTML="Correct!"+(Q.after?`<br><span style="font-size:.9rem;color:var(--ink)">${Q.after}</span>`:""); $("#qm").className="msg ok";
            setTimeout(()=>{ qi++; if(qi<qs.length) q(); else { bx.innerHTML=`<p class="msg ok">All correct! Well done!</p>`; unlock(); $("#next").scrollIntoView({behavior:"smooth",block:"center"}); } },Q.after?1800:900);
          }else{ b.classList.remove("ng"); void b.offsetWidth; b.classList.add("ng"); $("#qm").textContent="Not quite. Try again!"; $("#qm").className="msg ng"; }
        });
      }
      q();
    }
  }
  function finish(){
    const rec=L[k]||{n:0}; rec.n=(rec.n||0)+1; rec.t=Date.now(); L[k]=rec;
    const gifts=[]; const cnt=KS.filter(x=>L[x]).length;
    if(firstTime){
      if(cnt%PER_ITEM===0) gifts.push(giveItem(ch));
      const ci=secOf(k); if(SECS[ci].every(x=>L[x])){ const sp=giveSpecial(ch,ci); if(sp) gifts.push(sp); }
    }
    save();
    const ov=document.createElement("div"); ov.className="ov "+ch; document.body.appendChild(ov);
    let gi=0; const nk=nextK();
    const nav=()=>`${nk?`<button class="btn pri" id="nx">Next: <span style="font-family:var(--f-k);margin:0 4px">${nk}</span> (${esc(shortM(nk))}) ›</button>`:""}<button class="btn" id="ok">All kanji</button>`;
    const bind=()=>{ $("#ok").onclick=()=>{ ov.remove(); go("#/f/"+ch); }; $("#nx")&&($("#nx").onclick=()=>{ ov.remove(); go("#/learn/"+nk); }); };
    function showBox(){
      if(!gifts.length){
        const left=PER_ITEM-(cnt%PER_ITEM);
        ov.innerHTML=`<div class="prize"><h2>${firstTime?"You learned":"Review done:"} <span style="font-family:var(--f-k)">${k}</span>!</h2><div class="got"><svg class="stamp" viewBox="0 0 100 100" width="132" height="132" role="img" aria-label="Great job!"><g fill="#FFE6F0" stroke="#E2579A" stroke-width="3" stroke-linejoin="round"><path transform="rotate(0 50 50)" d="M50 52C26 42 23 10 40 3L50 11L60 3C77 10 74 42 50 52Z"/><path transform="rotate(72 50 50)" d="M50 52C26 42 23 10 40 3L50 11L60 3C77 10 74 42 50 52Z"/><path transform="rotate(144 50 50)" d="M50 52C26 42 23 10 40 3L50 11L60 3C77 10 74 42 50 52Z"/><path transform="rotate(216 50 50)" d="M50 52C26 42 23 10 40 3L50 11L60 3C77 10 74 42 50 52Z"/><path transform="rotate(288 50 50)" d="M50 52C26 42 23 10 40 3L50 11L60 3C77 10 74 42 50 52Z"/></g><circle cx="50" cy="51" r="26" fill="#FFF5F9" stroke="#E2579A" stroke-width="1.5" stroke-dasharray="3 2.5"/><g fill="#D63A83" font-weight="900" text-anchor="middle" dominant-baseline="central" style="font-family:var(--f-ui);font-size:9px"><text x="50" y="44.5">Great</text><text x="50" y="57.5">job!</text></g></svg></div><p style="margin:0;font-weight:800">${esc(I.m)}</p>
        ${firstTime?`<p style="margin:0;font-weight:700">${left} more kanji until your next prize!</p>${pipsH(PER_ITEM-left,PER_ITEM)}`:`<p style="margin:0">Reviewing makes kanji stick!</p>`}<div class="row">${nav()}</div></div>`; bind(); return; }
      const g=gifts[gi];
      ov.innerHTML=`<div class="prize"><span class="sp-tag">${g.sp?`You learned every kanji in “${esc(SEC_NAMES[secOf(k)])}”!`:`${PER_ITEM} more kanji learned!`}</span><h2>You learned <span style="font-family:var(--f-k)">${k}</span>!</h2><button class="box" id="open" aria-label="Open">${g.sp?"🎁":F.boxE}</button><p style="margin:0;font-weight:800">Tap to open!</p></div>`;
      $("#open").onclick=()=>{
        kira(); const more=gi<gifts.length-1;
        ov.innerHTML=`<div class="prize">${g.sp?`<span class="sp-tag">Special prize</span>`:""}<div class="got">${g.e}</div><div class="got-name">${esc(g.n)}</div><p style="margin:0">You got it! It’s in your ${esc(F.box.toLowerCase())}.</p>
        <div class="row">${more?`<button class="btn pri" id="more">There’s one more! 🎁</button>`:nav()}</div></div>`;
        if(more) $("#more").onclick=()=>{ gi++; showBox(); }; else bind();
      };
    }
    showBox();
  }
  show();
}
// choices helpers
const kChoice=x=>({v:x,h:`<span class="ck">${x}</span>`});
const kanaChoice=x=>({v:x,h:`<span class="ckana">${esc(x)}</span><span class="roma">${esc(romaji(x))}</span>`});
// wrong readings for a word: swap the target kanji's reading with its other readings
let VALID=null;
function validReadings(w){ // every reading this app knows for the same written word
  if(!VALID){ VALID={}; KS.forEach(x=>{ const I=K[x]; [...I.w,...(I.e||[])].forEach(([ww])=>{ const p=plainR(ww); (VALID[p]=VALID[p]||new Set()).add(readR(ww)); const al=altR(ww,x); if(al) VALID[p].add(al); });
    (VALID[x]=VALID[x]||new Set()); I.kun.forEach(([a,b])=>{ if(!b) VALID[x].add(a); }); I.on.forEach(o=>VALID[x].add(hira(o))); }); }
  return VALID[plainR(w)]||new Set();
}
function wrongReadings(w,k,n){
  const t=targetR(w,k), right=readR(w), out=new Set(), ok=validReadings(w), add=s=>{ if(s!==right&&!ok.has(s)) out.add(s); };
  if(t&&t.g.length===1){
    const I=K[k]; const alts=[...I.on.map(hira),...I.kun.map(([a])=>a)].filter(a=>a!==t.y);
    shuffle(alts).forEach(a=>{ const s=readR(w.replace(`{${t.g}|${t.y}|${t.t}}`,`{${t.g}|${a}}`)); add(s); });
  }
  const others=shuffle(KS.filter(x=>x!==k));
  for(const o of others){ if(out.size>=n) break; const ww=pick(K[o].w)[0], s=readR(ww); if(Math.abs(s.length-right.length)<=2) add(s); }
  for(const o of others){ if(out.size>=n) break; add(readR(pick(K[o].w)[0])); }
  return shuffle([...out]).slice(0,n);
}
function meaningChoices(k,n){
  const right=shortM(k), pool=shuffle(KS.filter(x=>x!==k&&shortM(x)!==right)).slice(0,n);
  return pool.map(shortM);
}
function lessonQuiz(k){
  const I=K[k], qs=[];
  // 1) meaning
  { const opts=shuffle([shortM(k),...meaningChoices(k,2)]);
    qs.push({q:`What does <span style="font-family:var(--f-k);font-size:1.6rem">${k}</span> mean?`,a:shortM(k),one:true,c:opts.map(x=>({v:x,h:esc(x)}))}); }
  // 2) reading of a word
  { const ws=I.w.filter(([w])=>targetR(w,k)); const [w,e]=pick(ws.length?ws:I.w); const right=readR(w);
    qs.push({q:`How do you read <span class="jp" style="font-size:1.5rem">${esc(plainR(w))}</span>? <span class="legend" style="display:block;text-align:left">(${esc(e)})</span>`,a:right,c:shuffle([right,...wrongReadings(w,k,2)]).map(kanaChoice),one:true}); }
  // 3) fill the blank
  { const x=pick(I.x), sec=SECS[secOf(k)].filter(y=>y!==k);
    qs.push({q:`<span class="sent" style="display:block;text-align:center">${ruby(x[0],k,{blank:true})}</span><span class="legend" style="display:block">${esc(x[1])}</span>Which kanji goes in the box?`,a:k,c:shuffle([k,...shuffle(sec).slice(0,2)]).map(kChoice)}); }
  // 4) on or kun
  // 字が 文の中に 1回だけ ある 文を つかう（ふじ山は日本で一ばんたかい山です のように 2回あると 答えが 2つになる）
  { const once=w=>plainR(w).split(k).length===2;
    let cand=I.x.filter(x=>{ const t=targetR(x[0],k); return t&&t.t!=="sp"&&once(x[0]); }), inWord=false;
    if(!cand.length){ cand=I.w.filter(w=>{ const t=targetR(w[0],k); return t&&t.t!=="sp"&&once(w[0]); }); inWord=true; }
    if(cand.length){ const x=pick(cand), t=targetR(x[0],k);
      qs.push({q:`<span class="sent" style="display:block">${ruby(x[0],k,{nocolor:true,both:true})}</span>In this ${inWord?"word":"sentence"}, is <b>${k}</b> (${esc(hira(t.y))}・${esc(kata(t.y))}) read with on’yomi or kun’yomi?`,a:t.t,c:[{v:"on",h:`<span class="y-on">On’yomi</span>`},{v:"kun",h:`<span class="y-kun">Kun’yomi</span>`}],after:t.t==="on"?"On’yomi readings came from Chinese.":"Kun’yomi is the native Japanese word."}); } }
  return qs;
}

// ---------- screen: quiz ----------
const QT={k2m:18,m2k:18,read:20,wmean:10,blank:12,write:14,strokes:4,order:4};
function quizPool(scope){
  const learned=KS.filter(k=>L[k]);
  if(scope==="all") return KS.slice();
  if(scope&&scope.startsWith("s")){ return SECS[+scope.slice(1)].slice(); }
  return learned;
}
function nearNums(n){ let lo=Math.max(1,n-1-Math.floor(Math.random()*3)); const out=[]; for(let i=0;i<4;i++) out.push(lo+i); if(!out.includes(n)) return [n-1,n,n+1,n+2].filter(x=>x>0); return out; }
function makeQ(pool,last){
  // weak kanji come back more often
  const w=pool.map(k=>{ const s=S.st[k]||{}; let ok=0,ng=0; Object.values(s).forEach(v=>{ ok+=v[0]; ng+=v[1]; }); return 1+ng*2/(1+ok)+(ok===0?1:0); });
  let k; for(let tries=0;tries<10;tries++){ let r=Math.random()*w.reduce((a,b)=>a+b,0); k=pool[pool.length-1]; for(let i=0;i<pool.length;i++){ r-=w[i]; if(r<0){ k=pool[i]; break; } } if(k!==last||pool.length<2) break; }
  const I=K[k];
  const types=Object.keys(QT).filter(t=>!(t==="strokes"&&I.s<2)&&!(t==="order"&&I.s<3));
  let r=Math.random()*types.reduce((a,t)=>a+QT[t],0), type=types[0]; for(const t of types){ r-=QT[t]; if(r<0){ type=t; break; } }
  const others=n=>{ const seen=new Set([shortM(k)]), out=[]; for(const x of shuffle(KS.filter(x=>x!==k))){ if(!seen.has(shortM(x))){ seen.add(shortM(x)); out.push(x); } if(out.length>=n) break; } return out; };
  const near=n=>{ const s=SECS[secOf(k)].filter(x=>x!==k&&shortM(x)!==shortM(k)); return shuffle(s.length>=n?s:KS.filter(x=>x!==k)).slice(0,n); };
  const word=pick(I.w), wt=targetR(word[0],k);
  switch(type){
    case "k2m": return {k,type,q:`What does this kanji mean?<span class="big-k">${k}</span>`,a:shortM(k),c:shuffle([k,...others(3)]).map(x=>({v:shortM(x),h:esc(shortM(x))}))};
    case "m2k": return {k,type,q:`Which kanji means…<span class="big-m">“${esc(shortM(k))}”</span>`,a:k,c:shuffle([k,...near(3)]).map(kChoice)};
    case "read": { const right=readR(word[0]); const wr=wrongReadings(word[0],k,3);
      return {k,type,q:`How do you read this word?<span class="big-w">${esc(plainR(word[0]))}</span><span class="legend" style="display:block">${esc(word[1])}</span>`,a:right,c:shuffle([right,...wr]).map(kanaChoice),word}; }
    case "wmean": { const ow=[]; for(const x of shuffle(KS.filter(x=>x!==k))){ const m=pick(K[x].w)[1]; if(m!==word[1]&&!ow.includes(m)) ow.push(m); if(ow.length>=3) break; }
      return {k,type,q:`What does this word mean?<span class="big-w">${ruby(word[0],k)}</span><span class="roma" style="display:block;text-align:center">${esc(romaji(readR(word[0])))}</span>`,a:word[1],c:shuffle([word[1],...ow]).map(x=>({v:x,h:esc(x)})),one:true,word}; }
    case "blank": { const x=pick(I.x), bt=targetR(x[0],k);
      const has=o=>bt&&bt.g.length===1&&[...K[o].on.map(hira),...K[o].kun.map(([a])=>a)].some(r=>sameReading(bt.y,r));
      const bc=shuffle(SECS[secOf(k)].filter(o=>o!==k&&!has(o))); if(bc.length<3) bc.push(...shuffle(KS.filter(o=>o!==k&&!has(o)&&!bc.includes(o))));
      return {k,type,q:`Which kanji goes in the box?<span class="sent" style="display:block;text-align:center;margin-top:6px">${ruby(x[0],k,{blank:true})}</span><span class="legend" style="display:block">${esc(x[1])}</span>`,a:k,c:shuffle([k,...bc.slice(0,3)]).map(kChoice),sent:x}; }
    case "write": return {k,type,write:true,q:`Write the kanji for <b style="color:var(--c)">“${esc(shortM(k))}”</b>${wt?`<span class="legend" style="display:block;margin-top:4px">as in <span class="jp" style="font-size:1rem">${ruby(word[0],k,{blank:true})}</span> (${esc(word[1])})</span>`:""}`,word};
    case "strokes": return {k,type,q:`How many strokes does this kanji have?<span class="big-k">${k}</span>`,a:I.s,c:nearNums(I.s).map(n=>({v:n,h:String(n)}))};
    case "order": { const h=Math.floor(Math.random()*I.s); return {k,type,order:h,q:`Which stroke is the <b style="color:var(--ng)">red</b> one? (1st, 2nd, …)`,a:h+1,c:nearNums(h+1).map(n=>({v:n,h:ord(n)}))}; }
  }
}
function quiz(){
  const ch=S.ch; theme(ch); const F=FR[ch];
  const learned=KS.filter(k=>L[k]);
  let scope=quiz._scope||(learned.length>=4?"learned":"s"+Math.max(0,secOf(nextK()||KS[0])));
  if(scope==="learned"&&learned.length<4) scope="s0";
  let cur=null, answered=false, streak=0, last=null, pad=null, sess={ok:0,n:0};
  app.innerHTML=`<div class="top"><a class="pill" href="#/f/${ch}">‹ All kanji</a><span class="spacer"></span><span class="pill" id="sess">✔ 0 / 0</span><button class="pill" id="setBtn" aria-label="Settings">⚙</button></div>
  <div id="heroBox">${heroHTML(ch,true)}</div>
  <div class="scope" id="scope">${learned.length>=4?`<button data-s="learned">My kanji (${learned.length})</button>`:""}${SECS.map((s,i)=>`<button data-s="s${i}">${esc(SEC_NAMES[i])}</button>`).join("")}<button data-s="all">All ${KS.length}</button></div>
  <div class="card" id="qcard"></div>`;
  $("#setBtn").onclick=settings;
  const markScope=()=>app.querySelectorAll("#scope button").forEach(b=>b.classList.toggle("on",b.dataset.s===scope));
  app.querySelectorAll("#scope button").forEach(b=>b.onclick=()=>{ scope=quiz._scope=b.dataset.s; markScope(); next(); });
  markScope(); { const on=app.querySelector("#scope .on"); if(on) on.scrollIntoView({block:"nearest",inline:"center"}); }
  const onKey=e=>{
    if(e.target.closest&&e.target.closest("input,textarea")) return;
    if(answered&&(e.key==="Enter"||e.key===" ")){ e.preventDefault(); next(); return; }
    const n=+e.key; if(!answered&&n>=1&&n<=4){ const b=app.querySelectorAll("#qcard .choices button")[n-1]; if(b) b.click(); }
  };
  document.addEventListener("keydown",onKey); leaveCurrent=()=>document.removeEventListener("keydown",onKey);
  function record(ok){
    const s=S.st[cur.k]=S.st[cur.k]||{}; const t=s[cur.type]=s[cur.type]||[0,0]; t[ok?0:1]++;
    S.q.answered=(S.q.answered||0)+1; sess.n++;
    if(ok){ S.q.correct=(S.q.correct||0)+1; sess.ok++; const before=stageOf(ch), tBefore=tickets(); FS(ch).correct++; save();
      const after=stageOf(ch);
      $("#heroBox").innerHTML=heroHTML(ch,true); const hb=$("#hero"); hb.classList.add("jump");
      if(after>before) setTimeout(()=>evolve(ch,after),900);
      if(tickets()>tBefore) cur.ticket=true;
    } else save();
    $("#sess").textContent=`✔ ${sess.ok} / ${sess.n}`;
  }
  function info(){
    const I=K[cur.k], w=cur.word||I.w[0];
    return `<div class="info"><span class="ik">${cur.k}</span><b>${esc(I.m)}</b><span class="jp" style="font-size:.92rem">${I.on.map(x=>`<span class="y-on">${esc(x)}</span>`).join("・")}${I.on.length&&I.kun.length?"・":""}${I.kun.map(([a,b])=>`<span class="y-kun">${esc(a)}</span>${b?`<span class="okuri">(${esc(b)})</span>`:""}`).join("・")}</span>
    <span class="iw"><span class="jp" style="font-size:1.15rem">${ruby(w[0],cur.k)}</span> ${sayBtn(readR(w[0]),"Listen")} <span class="roma">${esc(romaji(readR(w[0])))}</span> · ${esc(w[1])}</span></div>
    ${cur.sent?`<p class="sent" style="font-size:1.05rem;margin:0">${ruby(cur.sent[0],cur.k)}</p><span class="roma">${esc(cur.sent[2])}</span>`:""}`;
  }
  function feedback(ok,extra){
    const box=$("#qcard");
    const fb=document.createElement("div"); fb.className="fb";
    fb.innerHTML=`<span class="res ${ok?"ok":"ng"}">${ok?pick(["Correct! ⭕","Great! ⭕","Nice! ⭕","Yes! ⭕"]):"Not quite ❌"}</span>${extra||""}${cur.ticket?`<a class="btn tix" href="#/play">🎟 You got a Play ticket! <b>Go to the Play zone ›</b></a>`:""}${info()}<button class="btn pri" id="nextQ" style="padding:12px">Next question ›</button>`;
    box.appendChild(fb); bindSay(fb); $("#nextQ").onclick=next;
    requestAnimationFrame(()=>{ const r=$("#nextQ").getBoundingClientRect(); if(r.bottom>innerHeight-10) window.scrollBy({top:r.bottom-innerHeight+20,behavior:calm()?"auto":"smooth"}); });
  }
  function next(){
    const pool=quizPool(scope);
    if(pool.length<1){ $("#qcard").innerHTML=`<p class="msg">Learn a few kanji first!</p><a class="btn pri" href="#/learn/${nextK()||KS[0]}">Go to Learn</a>`; return; }
    cur=makeQ(pool,last); last=cur.k; answered=false;
    const box=$("#qcard");
    if(cur.write){
      box.innerHTML=`<h3>✍ Writing</h3><p class="q">${cur.q}</p><div class="big" id="pad"></div><p class="msg" id="msg" aria-live="polite"></p><div class="row"><button class="btn" id="giveup">I don’t know, show me</button></div>`;
      pad=makePad($("#pad"),cur.k,"write",miss=>{ if(answered) return; answered=true; const ok=miss<=2; record(ok); if(ok){ const p=S.st[cur.k]; } $("#giveup").remove(); feedback(ok,ok?"":`<span class="legend" style="text-align:left">You finished it, but with ${miss} mistakes. Try again next time!</span>`); },(t,c)=>{ const m=$("#msg"); if(m){ m.textContent=t; m.className="msg "+c; } });
      $("#giveup").onclick=()=>{ if(answered) return; answered=true; record(false); const h=$("#pad"); h.innerHTML=kanjiSVG(cur.k); animate(h.querySelector("svg"),cur.k); $("#giveup").remove(); $("#msg").textContent=""; feedback(false); };
    }else{
      box.innerHTML=`<p class="q">${cur.q}</p>${cur.type==="order"?`<div class="big">${kanjiSVG(cur.k,"kv")}</div>`:""}<div class="choices ${cur.one?"one":""}">${cur.c.map((c,i)=>`<button data-i="${i}">${c.h}</button>`).join("")}</div>`;
      if(cur.type==="order"){ const sv=box.querySelector(".kv"); sv.style.width="min(56vw,200px)"; staticKanji(sv,cur.k,cur.order); }
      box.querySelectorAll(".choices button").forEach(b=>b.onclick=()=>{
        if(answered) return; answered=true;
        const c=cur.c[+b.dataset.i], ok=c.v===cur.a;
        box.querySelectorAll(".choices button").forEach((x,i)=>{ x.disabled=true; if(cur.c[i].v===cur.a) x.classList.add(ok?"ok":"ans"); });
        if(!ok) b.classList.add("ng");
        record(ok); feedback(ok);
      });
    }
    bindSay(box);
    if(sess.n>0){ const card=$("#hero"); const top=card?card.getBoundingClientRect().bottom:0; const r=box.getBoundingClientRect(); if(r.top<top||r.top>innerHeight*.6) window.scrollBy({top:r.top-top-10,behavior:calm()?"auto":"smooth"}); }
  }
  next();
}
function toast(t){ const d=document.createElement("div"); d.className="sp-tag"; d.style.cssText="position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:70;font-size:1rem;padding:8px 16px;box-shadow:0 6px 16px rgba(0,0,0,.25)"; d.textContent=t; document.body.appendChild(d); setTimeout(()=>d.remove(),2600); }
function evolve(ch,st){
  kira();
  const ov=document.createElement("div"); ov.className="ov "+ch;
  ov.innerHTML=`<div class="prize"><span class="sp-tag">Your ${esc(FR[ch].who)} evolved!</span><img class="evo" src="${evoImg(ch,st)}" alt=""><h2>${esc(STAGES[ch][st])}</h2><p style="margin:0;font-weight:700">Stage ${st+1} of 15</p><div class="row"><button class="btn pri" id="evOk">Keep going!</button></div></div>`;
  document.body.appendChild(ov); $("#evOk").onclick=()=>ov.remove();
}

// ---------- screen: play zone ----------
function play(game){
  const ch=S.ch; theme(ch);
  const pool=KS.filter(k=>L[k]||stOk(k)); const usable=pool.length>=6?pool:KS.slice(0,Math.max(6,pool.length));
  if(game==="memory"||game==="rain"){
    if(!play._paid){ go("#/play"); return; }
    play._paid=false;
    return game==="memory"?memory(usable):rain(usable);
  }
  const t=tickets();
  app.innerHTML=`<div class="top"><a class="pill" href="#/f/${ch}">‹ All kanji</a><span class="spacer"></span><span class="pill">🎟 ${t} ticket${t===1?"":"s"}</span></div>
  <div class="hero"><img src="${evoImg(ch)}" alt=""><div><h1>🎪 Play zone <span class="jp" style="font-size:.85rem">あそびば</span></h1><p>Every ${TICKET} correct quiz answers give you 1 ticket. One game uses 1 ticket.</p><div class="bar"><i style="width:${(totalCorrect()%TICKET)/TICKET*100}%"></i></div><p>${TICKET-(totalCorrect()%TICKET)} more correct answers for the next ticket</p></div></div>
  <div class="games">
   <button class="game" data-g="memory" ${t?"":"disabled"}><span class="gi">🃏</span><span><b>Kanji Memory</b><small>Match each kanji with its English meaning. Fewer turns is better!</small></span><span class="legend">${S.play.best.memory?`Best: ${S.play.best.memory} turns`:""}</span></button>
   <button class="game" data-g="rain" ${t?"":"disabled"}><span class="gi">🌧️</span><span><b>Kanji Rain</b><small>Kanji fall from the sky. Tap the one that matches the meaning, as fast as you can!</small></span><span class="legend">${S.play.best.rain?`Best: ${S.play.best.rain}`:""}</span></button>
  </div>
  ${t?"":`<a class="btn pri" href="#/quiz">✏️ Go to the quiz to earn tickets</a>`}`;
  app.querySelectorAll(".game").forEach(b=>b.onclick=()=>{ if(tickets()<1) return; S.play.used++; save(); play._paid=true; go("#/play/"+b.dataset.g); });
  window.scrollTo(0,0);
}
function memory(pool){
  const ch=S.ch; const ks=shuffle(pool.slice()).slice(0,6);
  const cards=shuffle(ks.flatMap(k=>[{k,kind:"k"},{k,kind:"m"}]));
  let open=[], turns=0, found=0, lock=false;
  app.innerHTML=`<div class="top"><a class="pill" href="#/play">‹ Play zone</a><span class="spacer"></span><span class="pill" id="turns">Turns: 0</span></div>
  <div class="card"><h3>🃏 Kanji Memory</h3><p class="legend" style="text-align:left">Turn over two cards. Find each kanji and its meaning!</p><div class="mem">${cards.map((c,i)=>`<button class="mc" data-i="${i}" aria-label="Card ${i+1}"><span class="back">${FR[ch].place}</span></button>`).join("")}</div><p class="msg" id="msg"></p></div>`;
  app.querySelectorAll(".mc").forEach(b=>b.onclick=()=>{
    const i=+b.dataset.i, c=cards[i]; if(lock||b.classList.contains("open")||b.classList.contains("done")) return;
    b.classList.add("open"); b.innerHTML=c.kind==="k"?`<span class="ck">${c.k}</span>`:`<span>${esc(shortM(c.k))}</span>`; open.push([b,c]);
    if(open.length===2){
      turns++; $("#turns").textContent="Turns: "+turns; const [[b1,c1],[b2,c2]]=open; open=[];
      if(c1.k===c2.k&&c1.kind!==c2.kind){ b1.classList.add("done"); b2.classList.add("done"); found++; const I=K[c1.k]; const w0=I.w[0]; $("#msg").innerHTML=`<span class="jp" style="font-family:var(--f-k)">${c1.k}</span> = ${esc(I.m)} · <span class="jp">${ruby(w0[0],c1.k)}</span>`; $("#msg").className="msg ok";
        if(found===6){ const best=S.play.best.memory; if(!best||turns<best){ S.play.best.memory=turns; save(); } setTimeout(()=>done("🃏 All pairs found!",`${turns} turns${!best||turns<best?" · New best! 🏆":""}`),700); } }
      else{ lock=true; $("#msg").textContent="Not a pair. Try again!"; $("#msg").className="msg ng"; setTimeout(()=>{ [b1,b2].forEach(x=>{ x.classList.remove("open"); x.innerHTML=`<span class="back">${FR[ch].place}</span>`; }); lock=false; },900); }
    }
  });
  window.scrollTo(0,0);
}
function rain(pool){
  const ch=S.ch; let score=0, time=40, target=null, alive=true, drops=[], spawnT=null, tickT=null, raf=null;
  app.innerHTML=`<div class="top"><a class="pill" href="#/play">‹ Play zone</a></div>
  <div class="card"><div class="rain-top"><span>⭐ <span id="score">0</span></span><span>⏱ <span id="time">40</span>s</span></div><div class="target" id="target"></div><div class="rain" id="rain"></div><p class="legend">Tap the kanji that matches the meaning above.</p></div>`;
  const field=$("#rain");
  const newTarget=()=>{ target=pick(pool); $("#target").textContent="“"+shortM(target)+"”"; };
  function spawn(){
    if(!alive) return;
    const onField=drops.some(d=>d.k===target);
    const k=(!onField||Math.random()<.3)?target:pick(pool);
    const el=document.createElement("button"); el.className="drop"; el.textContent=k;
    const W=field.clientWidth; const x=8+Math.random()*(W-80);
    el.style.left=x+"px"; field.appendChild(el);
    const d={k,el,y:-70,v:(55+Math.random()*35)*(1+score/40)}; drops.push(d);
    el.onpointerdown=e=>{ e.preventDefault(); if(!alive) return;
      if(k===target){ score++; $("#score").textContent=score; el.classList.add("hit"); drops=drops.filter(x=>x!==d); setTimeout(()=>el.remove(),260); newTarget(); }
      else{ el.classList.remove("miss"); void el.offsetWidth; el.classList.add("miss"); time=Math.max(0,time-2); $("#time").textContent=time; }
    };
    spawnT=setTimeout(spawn,Math.max(450,1000-score*20));
  }
  let lastT=performance.now();
  function frame(t){
    const dt=Math.min(.05,(t-lastT)/1000); lastT=t; const H=field.clientHeight;
    drops.forEach(d=>{ d.y+=d.v*dt; d.el.style.transform=`translateY(${d.y+70}px)`; });
    drops=drops.filter(d=>{ if(d.y>H){ d.el.remove(); return false; } return true; });
    if(alive) raf=requestAnimationFrame(frame);
  }
  newTarget(); spawn(); raf=requestAnimationFrame(frame);
  tickT=setInterval(()=>{ time--; $("#time").textContent=Math.max(0,time); if(time<=0) end(); },1000);
  function end(){ if(!alive) return; alive=false; clearTimeout(spawnT); clearInterval(tickT); cancelAnimationFrame(raf);
    const best=S.play.best.rain||0; if(score>best){ S.play.best.rain=score; save(); }
    done("🌧️ Time’s up!",`You caught ${score} kanji${score>best?" · New best! 🏆":""}`); }
  leaveCurrent=()=>{ alive=false; clearTimeout(spawnT); clearInterval(tickT); cancelAnimationFrame(raf); };
  window.scrollTo(0,0);
}
function done(title,sub){
  kira(); const ch=S.ch;
  const ov=document.createElement("div"); ov.className="ov "+ch;
  ov.innerHTML=`<div class="prize"><img class="evo" src="${evoImg(ch)}" alt=""><h2>${esc(title)}</h2><p style="margin:0;font-weight:800">${esc(sub)}</p><div class="row"><button class="btn pri" id="dOk">Back to Play zone</button></div></div>`;
  document.body.appendChild(ov); $("#dOk").onclick=()=>{ ov.remove(); go("#/play"); };
}

applySettings();
route();
