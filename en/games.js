// Kanji Friends (English): play-zone mini games ported from the Japanese version (app-build/play.js).
// Built by mkgames.py — edit the generator, not this file.
(function(){
const css=document.createElement("style");
css.textContent=`
.pz{--pc:var(--acc,var(--jade,#8A5CC2));display:flex;flex-direction:column;gap:10px}
.pz h2{margin:0;font-size:1.05rem;color:var(--pc)}
.pz .pz-t{margin:0;font-size:.95rem}
.pz .pz-t b{font-size:1.4rem;color:var(--pc)}
.pz .pz-t small{display:block;color:var(--muted);font-size:.78rem}
.pz-games{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.pz-g{font:inherit;color:var(--ink);background:var(--surface);border:3px solid var(--line);border-radius:16px;padding:10px 4px 8px;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;touch-action:manipulation}
.pz-g .i{font-size:1.9rem;line-height:1.1}
.pz-g b{font-size:.78rem;line-height:1.3;text-align:center}
.pz-g small{font-size:.68rem;color:var(--muted)}
.pz-g:not(:disabled):hover,.pz-g:not(:disabled):focus-visible{border-color:var(--pc)}
.pz-g:disabled{opacity:.45;cursor:default}
.pz-get{font-weight:900;color:var(--pc);margin:4px 0 2px;font-size:1rem}
.pz-ov{position:fixed;inset:0;z-index:100;background:rgba(20,14,10,.55);display:flex;align-items:center;justify-content:center;padding:max(10px,env(safe-area-inset-top,0px)) 10px max(10px,env(safe-area-inset-bottom,0px))}
.pz-box{--pc:var(--acc,var(--jade,#8A5CC2));background:var(--surface);color:var(--ink);border-radius:22px;width:min(100%,460px);max-height:100%;overflow:auto;padding:12px 14px 16px;display:flex;flex-direction:column;gap:10px;box-shadow:0 20px 50px rgba(0,0,0,.35)}
.pz-head{display:flex;align-items:center;gap:8px}
.pz-head b{font-size:1.05rem;flex:1}
.pz-score{font-weight:900;color:var(--pc);font-size:1.1rem;white-space:nowrap}
.pz-x{font:inherit;font-size:.85rem;font-weight:700;border:2px solid var(--line);background:var(--surface);color:var(--muted);border-radius:99px;padding:4px 12px;cursor:pointer}
.pz-time{height:8px;border-radius:99px;background:var(--line);overflow:hidden}
.pz-time i{display:block;height:100%;background:var(--pc);width:100%}
.pz-stage{position:relative;height:min(58vh,340px);border-radius:18px;overflow:hidden;background:linear-gradient(#FFF8EC,#F3E4C8);touch-action:none;user-select:none;-webkit-user-select:none}
.pz-box.dragon .pz-stage{background:linear-gradient(#DDF1FF,#CFEBDD)}
.pz-box.penguin .pz-stage{background:linear-gradient(#DDF0FA,#F4FAFD)}
.pz-box.penguin .pz-floor{background:linear-gradient(#FFFFFF,#D7EAF3)}
.pz-box.pirate .pz-stage{background:linear-gradient(#CFE9FA,#F4E3BC)}
.pz-box.unicorn .pz-stage{background:linear-gradient(#3B2E6E,#8C6CC8)}
.pz-box.unicorn .pz-seed::before{content:"⭐";font-size:34px;left:4px;top:2px;width:auto;height:auto;border:0;background:none;transform:none}
.pz-box.penguin .pz-seed::before{content:"";left:3px;top:4px;width:38px;height:36px;border:0;border-radius:0;background:url(img/play/fish0.webp) center/contain no-repeat;transform:none}
.pz-box.penguin .pz-seed.f1::before{background-image:url(img/play/fish1.webp)}
.pz-box.penguin .pz-seed.f2::before{background-image:url(img/play/fish2.webp)}
.pz-box.penguin .pz-seed.f4::before{background-image:url(img/play/fish4.webp)}
.pz-box.penguin .pz-seed.f5::before{background-image:url(img/play/fish5.webp)}

.pz-sand{display:grid;grid-template-columns:repeat(5,1fr);grid-template-rows:repeat(5,1fr);gap:6px;padding:10px;height:100%;aspect-ratio:1.08;max-width:100%;margin:0 auto;box-sizing:border-box;background:linear-gradient(#D6EAF8,#F3ECDD);border-radius:18px}
.pz-sand button{font:inherit;width:100%;height:100%;min-height:0;border:0;border-radius:14px;background:url(img/play/tr-sand.webp) center/100% 100% no-repeat;font-size:1.5rem;cursor:pointer;touch-action:manipulation;display:flex;align-items:center;justify-content:center;padding:0}
.pz-sand button.dug{background-image:url(img/play/tr-dug.webp);cursor:default}
.pz-sand button.hot{background-image:url(img/play/tr-hot.webp)}
.pz-sand button.gold{background-image:url(img/play/tr-gold.webp);animation:pzpop .3s}
.pz-msg{text-align:center;font-weight:700;min-height:1.6em;margin:0}
.pz-big{font:inherit;font-weight:900;font-size:1.2rem;border:0;border-radius:16px;padding:14px;background:var(--pc);color:#fff;cursor:pointer;touch-action:manipulation}
.pz-big:active{transform:scale(.97)}
.pz-chr{position:absolute;left:50%;bottom:6px;width:120px;height:120px;transform:translateX(-50%);transition:transform .25s}
.pz-chr svg{width:100%;height:100%;overflow:visible}
.pz-chr.munch{animation:pzmunch .35s}
@keyframes pzmunch{40%{transform:translateX(-50%) scale(1.15,.9)}}
.pz-seed{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;border:0;background:none;padding:0;cursor:pointer;animation:pzpop .25s ease-out}
.pz-seed::before{content:"";position:absolute;left:12px;top:6px;width:20px;height:32px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:repeating-linear-gradient(90deg,#3B2F2A 0 4px,#E9E1D2 4px 6px);border:2px solid #2A201B;transform:rotate(20deg)}
.pz-seed.fly{transition:left .35s ease-in,top .35s ease-in,transform .35s;transform:scale(.4);pointer-events:none}
.pz-tgt{position:absolute;width:64px;height:64px;margin:-32px 0 0 -32px;border-radius:50%;border:0;padding:0;cursor:pointer;background:radial-gradient(circle,#D33 0 18%,#fff 19% 36%,#D33 37% 56%,#fff 57% 74%,#D33 75%);box-shadow:0 3px 0 rgba(0,0,0,.2);animation:pzpop .2s ease-out}
.pz-tgt.hit{animation:pzhit .35s forwards;pointer-events:none}
@keyframes pzpop{from{transform:scale(0)}}
@keyframes pzhit{to{transform:scale(1.5);opacity:0}}
.pz-fire{position:absolute;font-size:44px;margin:-26px 0 0 -22px;pointer-events:none;animation:pzhit .5s forwards}
.pz-mem{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:10px;height:100%;box-sizing:border-box;align-content:center}
.pz-cheer{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:rgba(255,255,255,.55);pointer-events:none;animation:pzfade 1.4s forwards}
.pz-cheer .c{width:140px;height:140px;animation:pzjump .7s cubic-bezier(.3,.7,.4,1) 2}
.pz-cheer .c svg{width:100%;height:100%;overflow:visible}
.pz-cheer .bub{background:#fff;color:#2A2430;border:3px solid var(--pc);border-radius:16px;padding:6px 14px;font-weight:900;text-align:center;line-height:1.35;animation:pzpop .25s ease-out}
.pz-cheer .bub b{font-family:var(--f-kanji,serif);font-size:1.6rem;color:var(--pc)}
@keyframes pzjump{0%,100%{transform:none}15%{transform:translateY(4px) scale(1.08,.9)}45%{transform:translateY(-34px) scale(.95,1.06)}70%{transform:translateY(0) scale(1.05,.95)}}
@keyframes pzfade{0%{opacity:0}10%,85%{opacity:1}100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.pz-cheer .c,.pz-cheer .bub{animation:none}}
.pz-card{font:inherit;border:0;border-radius:12px;aspect-ratio:3/4;cursor:pointer;background:var(--pc);color:#fff;font-size:1.6rem;font-weight:900;display:flex;align-items:center;justify-content:center;padding:2px;transition:transform .2s;touch-action:manipulation}
.pz-card.open{background:var(--surface);color:var(--ink);border:3px solid var(--pc)}
.pz-card.open.k{font-family:var(--f-kanji,serif);font-size:2rem;font-weight:700}
.pz-card.open.y{font-size:.95rem;line-height:1.2;word-break:break-all}
.pz-card.done{background:var(--ok-soft,#D9F0E2);border-color:var(--ok,#2E8656);color:var(--ink)}
.pz-card.bad{animation:pzshake .35s}
/* MAさんの イラスト（img/play/、2026-11-23） */
.pz-card{aspect-ratio:1/1}
.pz-card:not(.open):not(.done){background:url(img/play/card-q.webp) center/100% 100% no-repeat;color:transparent}
.pz-box.penguin .pz-card:not(.open):not(.done){background-image:url(img/play/card-igloo.webp)}
.pz-tgt{background:url(img/play/target.webp) center/100% 100% no-repeat!important;box-shadow:none!important;border-radius:0}
.pz-box.unicorn .pz-seed::before{content:""!important;width:44px!important;height:42px!important;left:0!important;top:0!important;background:url(img/play/star.webp) center/contain no-repeat!important}
.pz-box.unicorn .pz-stage:has(.pz-seed),.pz-box.unicorn .pz-stage:has(.pz-chr){background:linear-gradient(rgba(40,30,90,.45),rgba(40,30,90,.45)),url(img/play/nightsky.webp) center/cover no-repeat!important}
.pz-box.penguin .pz-cupw .cup{background:url(img/play/igloo.webp) center bottom/100% auto no-repeat!important;box-shadow:none!important;border-radius:0!important}
.pz-box.penguin .pz-cupw .cup::after{display:none}
.pz-box.penguin .pz-cupw.pick .cup{filter:drop-shadow(0 0 6px #FFD54A) drop-shadow(0 0 3px #FFD54A)}
@keyframes pzshake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
.pz-cupw{position:absolute;bottom:40px;width:96px;height:120px;margin-left:-48px;transition:left .4s ease-in-out}
.pz-cupw .ham{position:absolute;left:8px;bottom:0;width:80px;height:80px}
.pz-cupw .ham svg{width:100%;height:100%;overflow:visible}
.pz-cupw .cup{position:absolute;left:0;bottom:-6px;width:96px;height:100px;border:0;padding:0;cursor:pointer;border-radius:46% 46% 10px 10px/30% 30% 10px 10px;background:linear-gradient(90deg,#C0392B,#E8604C 45%,#B03024);box-shadow:inset 0 -10px 0 rgba(0,0,0,.18),0 6px 0 rgba(0,0,0,.15);transition:transform .35s ease;touch-action:manipulation}
.pz-cupw .cup::after{content:"";position:absolute;left:12px;right:12px;top:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.35)}
.pz-cupw .cup.up{transform:translateY(-92px)}
.pz-cupw .ham{visibility:hidden;transition:visibility 0s .4s}.pz-cupw:has(.cup.up) .ham{visibility:visible;transition-delay:0s}
.pz-cupw .cup:disabled{cursor:default}
.pz-box.penguin .pz-cupw .cup{border-radius:50% 50% 8px 8px/70% 70% 8px 8px;background:repeating-linear-gradient(0deg,transparent 0 22px,rgba(120,160,190,.45) 22px 24px),radial-gradient(circle at 35% 30%,#FFFFFF,#E4F2FA 55%,#BFDDEE);box-shadow:inset 0 -8px 0 rgba(90,140,180,.25),0 6px 0 rgba(0,0,0,.12)}
.pz-box.penguin .pz-cupw .cup::after{left:34px;right:34px;top:auto;bottom:6px;height:34px;border-radius:18px 18px 4px 4px;background:rgba(70,110,150,.35)}
.pz-cupw.pick .cup{box-shadow:0 0 0 5px #FFD54A,inset 0 -10px 0 rgba(0,0,0,.18)}
.pz-floor{position:absolute;left:0;right:0;bottom:0;height:46px;background:#D9B98A}
.pz-big-t{position:absolute;left:0;right:0;top:38%;text-align:center;font-size:2.6rem;font-weight:900;color:var(--pc);text-shadow:0 3px 0 #fff;pointer-events:none;animation:pzpop .25s ease-out}
.pz-hoi{position:absolute;inset:0;display:flex;flex-direction:column;padding:10px;gap:8px}
.pz-mode{border-radius:14px;padding:8px 10px;font-weight:900;font-size:.95rem;line-height:1.35;text-align:center;color:#fff}
.pz-mode.atk{background:#E0703A}.pz-mode.def{background:#3A7BD5}
.pz-mode small{display:block;font-weight:700;font-size:.8rem;opacity:.95}
.pz-vs{flex:1;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:6px}
.pz-side{background:rgba(255,255,255,.85);color:#2A2430;border-radius:16px;height:100%;max-height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:6px;position:relative}
.pz-side .who{font-size:.8rem;font-weight:900;color:#6F6577}
.pz-side .face{font-size:64px;line-height:1;transition:transform .25s}
.pz-side .what{font-size:.85rem;font-weight:900;min-height:1.3em;text-align:center}
.pz-side .mini{width:96px;height:96px;transition:transform .25s}
.pz-side .mini svg{width:100%;height:100%;overflow:visible}
.pz-side .badge{position:absolute;top:6px;right:6px;font-size:34px;line-height:1}
.pz-face{width:100%;height:100%;overflow:visible}
.pz-hoi~.pz-big-t{top:8px;font-size:2rem}
.pz-big-t.pz-hoi-t{left:10px;right:10px;border-radius:14px;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.2);display:flex;align-items:center;justify-content:center;font-size:1.9rem;line-height:1}
.pz-hoi .pz-vs{grid-template-rows:minmax(0,1fr)}.pz-hoi .pz-side{min-height:0;overflow:hidden}.pz-hoi .pz-dots,.pz-hoi .pz-mode{flex-shrink:0}
.pz-face .hd,.pz-face .ft,.pz-face .pu{transition:transform .3s ease-out;transform-box:view-box;transform-origin:60px 70px}
.pz-side .mini{width:116px;height:116px}
.pz-side .mini[hidden]{display:none}
.pz-side .pic{width:100%;flex:1;min-height:0;overflow:hidden;border-radius:14px;display:flex;align-items:center;justify-content:center}
.pz-side .pic img{width:100%;height:100%;object-fit:cover;transition:transform .35s cubic-bezier(.3,.7,.4,1.2);transform-origin:50% 60%}
.pz-side .pic img.pop{animation:pzbob .45s}
@keyframes pzbob{40%{filter:brightness(1.08)}}
.pz-hoi .pz-side .badge{position:absolute;top:30px;bottom:auto;right:4px;font-size:36px;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))}
.pz-hoi .pz-side{max-height:none;padding:6px 6px 8px;justify-content:flex-start}
.pz-hoi .pz-vs{grid-template-columns:1fr auto 1fr;min-height:0}
.pz-box.unicorn .pz-hoi .pz-vsx,.pz-box.dragon .pz-hoi .pz-vsx{font-size:1.4rem}
.pz-vsx{font-weight:900;color:#fff;font-size:1.1rem;text-shadow:0 2px 0 rgba(0,0,0,.25)}
.pz-dots{display:flex;justify-content:center;gap:6px}
.pz-dots i{width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.6);display:flex;align-items:center;justify-content:center;font-style:normal;font-size:.8rem;font-weight:900;color:#fff}
.pz-dots i.w{background:#2E8656}.pz-dots i.l{background:#9A8F99}.pz-dots i.now{outline:3px solid #FFD54A}
.pz-rule{position:absolute;inset:0;background:rgba(255,255,255,.94);color:#2A2430;display:flex;flex-direction:column;justify-content:center;gap:10px;padding:16px;font-size:.92rem;line-height:1.5}
.pz-rule h3{margin:0;text-align:center;font-size:1.1rem}
.pz-rule p{margin:0}
.pz-rule .pz-big{margin-top:4px}
.pz-arrows{display:grid;grid-template-columns:repeat(3,minmax(0,96px));grid-template-areas:". up ." "left mid right" ". down .";justify-content:center;gap:6px}
.pz-arrows button[data-d=up]{grid-area:up}.pz-arrows button[data-d=down]{grid-area:down}.pz-arrows button[data-d=left]{grid-area:left}.pz-arrows button[data-d=right]{grid-area:right}
.pz-arrows .mid{grid-area:mid;display:flex;align-items:center;justify-content:center;font-size:1.8rem}
.pz-box:has(.pz-arrows) .pz-stage{height:min(44vh,300px);min-height:220px}
@media (max-height:600px){.pz-arrows button{padding:3px 0 4px}.pz-arrows button b{font-size:1.4rem}.pz-box:has(.pz-arrows) .pz-stage{height:220px}.pz-hoi{padding:6px;gap:5px}.pz-mode small{display:none}.pz-side .face{font-size:48px}.pz-side .mini{width:76px;height:76px}}
.pz-arrows button{font:inherit;font-weight:900;font-size:.85rem;line-height:1.2;border:3px solid var(--line);background:var(--surface);color:var(--ink);border-radius:14px;padding:6px 0 8px;cursor:pointer;touch-action:manipulation;display:flex;flex-direction:column;align-items:center;gap:2px}
.pz-arrows button b{font-size:1.7rem;line-height:1.1}
.pz-arrows button:disabled{opacity:.4}
.pz-end{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;background:rgba(255,255,255,.88);color:#2A2430;text-align:center;padding:16px}
.pz-end .n{font-size:2.6rem;font-weight:900;color:var(--pc)}
.pz-end .best{font-size:.9rem}
.pz-end .new{color:#C9940E;font-weight:900}
@media (prefers-reduced-motion:reduce){.pz-seed,.pz-tgt,.pz-chr.munch,.pz-card.bad{animation:none}}

.pz-box{--pc:var(--c)}
.pz-box .pz-chr img{width:100%;height:100%;object-fit:contain}
.pz-cupw .ham img{width:100%;height:100%;object-fit:contain}
.pz-cheer .c img{width:100%;height:100%;object-fit:contain}
`;
document.head.appendChild(css);
const rnd=n=>Math.floor(Math.random()*n);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let CH="pirate", NAME="Pirate", charSVG=()=>"";
let ov=null, cleanup=[], host=null;
function later(fn,ms){ const id=setTimeout(fn,ms); cleanup.push(()=>clearTimeout(id)); return id; }
function every(fn,ms){ const id=setInterval(fn,ms); cleanup.push(()=>clearInterval(id)); return id; }
function frame(fn){ let on=true; const loop=t=>{ if(!on) return; fn(t); requestAnimationFrame(loop); }; requestAnimationFrame(loop); cleanup.push(()=>{on=false}); }
function stopAll(){ cleanup.forEach(f=>f()); cleanup=[]; }
function closeGame(){ stopAll(); if(ov){ ov.remove(); ov=null; } document.documentElement.style.overflow=""; document.body.style.overflow=""; host&&host.onClose&&host.onClose(); }
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&ov) closeGame(); });
// h = {ch, name, img, game:{id,icon,name,desc,unit,low}, best, onEnd(v)->{best,better,old,left}, again(), toQuiz(), onClose()}
function open(h){
  host=h; CH=h.ch; NAME=h.name; charSVG=()=>`<img src="${h.img}" alt="">`;
  const g=h.game; const U=v=>v===1?g.unit.replace(/s$/,""):g.unit;
  ov=document.createElement("div"); ov.className="pz-ov";
  ov.innerHTML=`<div class="pz-box ${CH}" role="dialog" aria-modal="true" aria-label="${esc(g.name)}">
    <div class="pz-head"><b>${g.icon} ${esc(g.name)}</b><span class="pz-score" aria-live="polite"></span><button type="button" class="pz-x">Quit</button></div>
    <div class="pz-time" hidden><i></i></div>
    <div class="pz-stage"></div>
    <p class="pz-msg">${esc(g.desc)}</p>
    <div class="pz-ctl"></div></div>`;
  document.body.appendChild(ov);
  document.documentElement.style.overflow="hidden"; document.body.style.overflow="hidden";
  ov.querySelector(".pz-x").addEventListener("click",closeGame);
  const api={
    g, stage:ov.querySelector(".pz-stage"), msg:ov.querySelector(".pz-msg"), ctl:ov.querySelector(".pz-ctl"),
    score(v){ ov.querySelector(".pz-score").textContent=v+" "+U(v); },
    timer(sec,onEnd){ const bar=ov.querySelector(".pz-time"); bar.hidden=false; const i=bar.querySelector("i"); const t0=performance.now();
      frame(t=>{ const r=Math.max(0,1-(t-t0)/(sec*1000)); i.style.width=(r*100)+"%"; }); later(onEnd,sec*1000); },
    end(v){ stopAll(); const r=h.onEnd(v);
      const e=document.createElement("div"); e.className="pz-end";
      e.innerHTML=`<div>All done!</div><div class="n">${v} ${U(v)}</div>
        <div class="best">${r.better&&r.old!=null?'<span class="new">New best score!</span>':"Best: "+r.best+" "+U(r.best)}</div>
        <div class="best">Tickets left: ${r.left}</div>
        <button type="button" class="pz-big" style="margin-top:8px;min-width:12em">✏️ Back to the quiz</button>
        ${r.left?'<button type="button" class="pz-x" style="margin-top:4px">Play again (🎟 1)</button>':""}
        <button type="button" class="pz-x" style="margin-top:4px">Play zone</button>`;
      api.stage.appendChild(e); api.ctl.innerHTML="";
      const bs=e.querySelectorAll("button");
      bs[0].addEventListener("click",()=>{ closeGame(); h.toQuiz(); });
      if(r.left) bs[1].addEventListener("click",()=>{ closeGame(); h.again(); });
      bs[bs.length-1].addEventListener("click",closeGame);
      bs[0].focus({preventScroll:true});
    }
  };
  ({feed,cups,target,hoi,treasure})[g.id](api);
  ov.querySelector(".pz-x").focus({preventScroll:true});
}
// ---------- ペンギン：さかなを あげよう ----------
function feed(a){
  let n=0; a.score(0);
  a.stage.innerHTML=`<div class="pz-chr">${charSVG()}</div>`;
  const chr=a.stage.querySelector(".pz-chr");
  function spawn(){
    const W=a.stage.clientWidth, H=a.stage.clientHeight;
    const s=document.createElement("button"); s.type="button"; s.className="pz-seed"+(CH==="penguin"?" f"+[0,1,2,4,5][Math.floor(Math.random()*5)]:""); s.setAttribute("aria-label",CH==="penguin"?"fish":"seed");
    s.style.left=(30+Math.random()*(W-60))+"px"; s.style.top=(30+Math.random()*(H-180))+"px";
    s.addEventListener("pointerdown",e=>{ e.preventDefault(); if(s.classList.contains("fly")) return;
      n++; a.score(n); s.classList.add("fly"); s.style.left=(W/2)+"px"; s.style.top=(H-80)+"px";
      setTimeout(()=>{ s.remove(); chr.classList.remove("munch"); void chr.offsetWidth; chr.classList.add("munch"); },340); });
    a.stage.appendChild(s);
    later(()=>{ if(!s.classList.contains("fly")) s.remove(); },1700);
  }
  spawn(); every(spawn,650); later(spawn,300);
  a.timer(20,()=>a.end(n));
}

// ---------- ペンギン：どこかな？（かまくらの シャッフル） ----------
function cups(a){
  const R=5; let round=0, got=0; a.score(0);
  a.stage.innerHTML=`<div class="pz-floor"></div>`+[0,1,2].map(i=>`<div class="pz-cupw" data-c="${i}"><div class="ham">${i===0?charSVG():""}</div><button type="button" class="cup" aria-label="igloo ${i+1}" disabled></button></div>`).join("");
  const W=()=>a.stage.clientWidth, X=s=>W()*(0.2+0.3*s);
  const ws=[...a.stage.querySelectorAll(".pz-cupw")]; let slot=[0,1,2]; let hamCup=0;
  const place=()=>ws.forEach((w,i)=>w.style.left=X(slot[i])+"px");
  const cupsBtn=ws.map(w=>w.querySelector(".cup"));
  const big=t=>{ const d=document.createElement("div"); d.className="pz-big-t"; d.textContent=t; a.stage.appendChild(d); later(()=>d.remove(),900); };
  a.ctl.innerHTML=`<button type="button" class="pz-big" style="width:100%">Start!</button>`;
  const go=a.ctl.querySelector("button");
  place();
  function startRound(){
    go.hidden=true; ws.forEach(w=>w.classList.remove("pick"));
    hamCup=rnd(3); ws.forEach((w,i)=>w.querySelector(".ham").innerHTML=i===hamCup?charSVG():"");
    a.msg.textContent=`Round ${round+1}: the penguin hides in this igloo. Watch closely!`;
    cupsBtn.forEach(c=>{ c.disabled=true; c.classList.remove("up"); });
    cupsBtn[hamCup].classList.add("up");
    later(()=>{ cupsBtn[hamCup].classList.remove("up"); later(shuffleCups,500); },1300);
  }
  function shuffleCups(){
    a.msg.textContent="Mixing……";
    const n=3+round*2, dur=Math.max(220,480-round*60);
    ws.forEach(w=>w.style.transitionDuration=dur+"ms");
    let k=0;
    const step=()=>{ if(k++>=n){ ask(); return; }
      let i=rnd(3), j=rnd(2); if(j>=i) j++;
      [slot[i],slot[j]]=[slot[j],slot[i]]; place(); later(step,dur+60); };
    step();
  }
  function ask(){
    a.msg.textContent="Where is the penguin? Tap an igloo";
    cupsBtn.forEach(c=>c.disabled=false);
  }
  cupsBtn.forEach((c,i)=>c.addEventListener("click",()=>{
    cupsBtn.forEach(x=>x.disabled=true); ws[i].classList.add("pick");
    c.classList.add("up");
    const ok=i===hamCup;
    if(ok){ got++; a.score(got); big("Found it!"); a.msg.textContent="Right! Great watching!"; }
    else { later(()=>cupsBtn[hamCup].classList.add("up"),500); big("Oh no"); a.msg.textContent="The penguin was here"; }
    round++;
    later(()=>{ if(round>=R){ a.end(got); return; } cupsBtn.forEach(x=>x.classList.remove("up")); later(startRound,450); },1800);
  }));
  go.addEventListener("click",startRound);
  a.msg.textContent=`Follow the igloo with the penguin inside! ${R} rounds`;
}

// ---------- ドラゴン：ほのおで まとあて ----------
function target(a){
  let n=0; a.score(0);
  a.stage.innerHTML=`<div class="pz-chr">${charSVG()}</div>`;
  const chr=a.stage.querySelector(".pz-chr");
  function spawn(){
    const W=a.stage.clientWidth, H=a.stage.clientHeight;
    const s=document.createElement("button"); s.type="button"; s.className="pz-tgt"; s.setAttribute("aria-label","target");
    const x=40+Math.random()*(W-80), y=40+Math.random()*(H-190);
    s.style.left=x+"px"; s.style.top=y+"px";
    s.addEventListener("pointerdown",e=>{ e.preventDefault(); if(s.classList.contains("hit")) return;
      n++; a.score(n); s.classList.add("hit");
      const f=document.createElement("span"); f.className="pz-fire"; f.textContent=CH==="pirate"?"💥":"🔥"; f.style.left=x+"px"; f.style.top=y+"px"; a.stage.appendChild(f);
      setTimeout(()=>{ s.remove(); f.remove(); },500);
      chr.classList.remove("munch"); void chr.offsetWidth; chr.classList.add("munch"); });
    a.stage.appendChild(s);
    later(()=>{ if(!s.classList.contains("hit")) s.remove(); },1300);
  }
  spawn(); every(spawn,700);
  a.timer(20,()=>a.end(n));
}

// ---------- かいぞく：たからさがし ----------
function treasure(a){
  const N=25, T=3, DIG=10; const gold=new Set(); while(gold.size<T) gold.add(rnd(N));
  let digs=0, found=0; a.score(0);
  a.stage.innerHTML=`<div class="pz-sand">${Array.from({length:N},(_,i)=>`<button type="button" data-i="${i}" aria-label="sand ${i+1}"></button>`).join("")}</div>`;
  const near=i=>{ const x=i%5,y=Math.floor(i/5); for(const g of gold){ if(Math.abs(g%5-x)<=1&&Math.abs(Math.floor(g/5)-y)<=1) return true; } return false; };
  a.msg.textContent=`You can dig ${DIG} times. Orange sand means treasure is near!`;
  a.stage.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
    if(b.classList.contains("dug")||digs>=DIG) return;
    const i=+b.dataset.i; digs++; b.classList.add("dug");
    if(gold.has(i)){ found++; b.classList.add("gold"); a.score(found); a.msg.textContent="You found treasure!"; }
    else { const h=near(i); if(h) b.classList.add("hot"); a.msg.textContent=(h?"It’s close! ":"")+`${DIG-digs} digs left`; }
    if(found===T||digs>=DIG){ a.stage.querySelectorAll("button").forEach(x=>{ if(gold.has(+x.dataset.i)&&!x.classList.contains("gold")){ x.classList.add("dug","gold"); x.style.opacity=.5; } });
      later(()=>a.end(found),900); }
  }));
}

// ---------- あっちむいて ホイ ----------
function hoi(a){
  // 手は はだの いろに しない（ユニバーサルデザイン、MAさん 2026-11-23）：しろい てぶくろの 絵
  const HS='fill="#FFFFFF" stroke="#2A2430" stroke-width="2.2" stroke-linejoin="round"';
  const HAND=deg=>`<svg class="hand" viewBox="0 0 40 40" width="1.45em" height="1.45em" aria-hidden="true" style="vertical-align:-.25em"><g transform="rotate(${deg} 20 20)"><rect x="15.5" y="2" width="9" height="20" rx="4.5" ${HS}/><rect x="10" y="16" width="20" height="15" rx="6" ${HS}/><path d="M10.5 22q-4-1-4.5 3t4.5 4" ${HS}/><path d="M16 20v5M21 20v5M26 20v5" stroke="#2A2430" stroke-width="1.6" stroke-linecap="round"/><rect x="12" y="30" width="16" height="6" rx="2" fill="#8EC9F0" stroke="#2A2430" stroke-width="2.2"/></g></svg>`;
  const PALM=`<svg class="hand" viewBox="0 0 40 40" width="1.25em" height="1.25em" aria-hidden="true" style="vertical-align:-.2em"><path d="M12 30V14a2.5 2.5 0 015 0v-4a2.5 2.5 0 015 0v-1a2.5 2.5 0 015 0v3a2.5 2.5 0 015 0v13q0 6-6 8h-8q-4-1-6-5l-4-6a2.4 2.4 0 014-3l1 1z" ${HS}/><path d="M17 14v8M22 10v12M27 11v11" stroke="#2A2430" stroke-width="1.4" stroke-linecap="round"/></svg>`;
  const DIR={up:["⬆️","up",HAND(0)],down:["⬇️","down",HAND(180)],left:["⬅️","left",HAND(-90)],right:["➡️","right",HAND(90)]};
  const KEYS=["up","down","left","right"], R=6; let round=0, pts=0; const res=[]; a.score(0);
  // むきごとの絵（MAさんの絵 hoi2-<kind>-<front|right|left|down>.png）。うえ は正面の絵をそらせる
  const HSRC=(k,d)=>`img/hoi/hoi2-${k==="pirate"?"kid":k}-${d}.webp`;
  ["kid",CH].forEach(k=>["front","up","right","left","down"].forEach(d=>{const i=new Image(); i.src=HSRC(k,d);}));
  function turn(el,kind,dir){
    el.src=HSRC(kind,dir||"front");
    el.style.transform=dir==="up"?"perspective(420px) translateY(-9%) rotateX(24deg) scale(1.04)":"";
    el.classList.remove("pop"); void el.offsetWidth; if(dir) el.classList.add("pop");
  }
  a.stage.innerHTML=`<div class="pz-hoi">
      <div class="pz-mode"></div>
      <div class="pz-vs">
        <div class="pz-side"><span class="who">You</span><div class="pic"><img class="kidimg" src="img/hoi/hoi2-kid-front.webp" alt=""></div><span class="badge mb"></span><span class="what mew"></span></div>
        <span class="pz-vsx">VS</span>
        <div class="pz-side"><span class="who">${esc(NAME)}</span><div class="pic"><img class="chimg" src="img/hoi/hoi2-${CH}-front.webp" alt=""></div><span class="badge cb"></span><span class="what cw"></span></div>
      </div>
      <div class="pz-dots">${Array.from({length:R},()=>"<i></i>").join("")}</div>
    </div>
    <div class="pz-rule"><h3>↗️ How to play Look This Way!</h3>
      <p><b>⚔️ Your attack</b>: point with an arrow. If the ${esc(NAME)} looks the <b>same way</b>, you win!</p>
      <p><b>🛡 Your defense</b>: the ${esc(NAME)} points. If you look a <b>different way</b>, you win!</p>
      <p>Attack and defense take turns, ${R} rounds. Each win is 1 point.</p>
      <button type="button" class="pz-big">Start</button></div>`;
  const $q=sel=>a.stage.querySelector(sel);
  const mode=$q(".pz-mode"), kid=$q(".kidimg"), chi=$q(".chimg"), mb=$q(".mb"), mew=$q(".mew"), cw=$q(".cw"), cb=$q(".cb"), dots=[...a.stage.querySelectorAll(".pz-dots i")];
  a.ctl.innerHTML=`<div class="pz-arrows">${KEYS.map(k=>`<button type="button" data-d="${k}" disabled><b>${DIR[k][0]}</b>${DIR[k][1]}</button>`).join("")}<span class="mid" aria-hidden="true"></span></div>`;
  const btns=[...a.ctl.querySelectorAll("button")], mid=a.ctl.querySelector(".mid");
  const lock=v=>btns.forEach(b=>b.disabled=v);
  const big=t=>{ const d=document.createElement("div"); d.className="pz-big-t pz-hoi-t"; d.textContent=t; const m=$q(".pz-mode"); if(m){ d.style.top=m.offsetTop+"px"; d.style.height=m.offsetHeight+"px"; d.style.background=getComputedStyle(m).backgroundColor; } a.stage.appendChild(d); later(()=>d.remove(),800); };
  function setup(){
    if(round>=R){ a.end(pts); return; }
    const atk=round%2===0;
    dots.forEach((d,i)=>{ d.className=res[i]===true?"w":res[i]===false?"l":i===round?"now":""; d.textContent=res[i]===true?"○":res[i]===false?"×":""; });
    mode.className="pz-mode "+(atk?"atk":"def");
    mode.innerHTML=atk?`⚔️ Round ${round+1}: your attack<small>Point! If the ${esc(NAME)} looks the same way, you win!</small>`
                      :`🛡 Round ${round+1}: your defense<small>The ${esc(NAME)} points. Look a different way!</small>`;
    turn(kid,"kid",""); turn(chi,CH,""); mb.innerHTML=atk?PALM:""; cb.innerHTML=atk?"":PALM; mew.textContent=atk?"Point where?":"Look where?"; cw.textContent="";
    btns.forEach(b=>{ const k=b.dataset.d; b.innerHTML=`<b>${atk?DIR[k][2]:DIR[k][0]}</b>${atk?"point ":"look "}${DIR[k][1]}`; });
    a.msg.textContent=atk?"Which way will you point?":"Which way will you look?";
    mid.innerHTML=atk?PALM:"🙂";
    lock(false);
  }
  btns.forEach(b=>b.addEventListener("click",()=>{
    const my=b.dataset.d, its=KEYS[rnd(4)], atk=round%2===0; lock(true);
    a.msg.textContent="Look that way……"; big("Look that…");
    later(()=>{
      big("way!");
      if(atk){ mb.innerHTML=DIR[my][2]; mew.textContent="pointed "+DIR[my][1];
        turn(chi,CH,its); cb.textContent=DIR[its][0]; cw.textContent="looked "+DIR[its][1]; }
      else { cb.innerHTML=DIR[its][2]; cw.textContent="pointed "+DIR[its][1];
        turn(kid,"kid",my); mb.textContent=DIR[my][0]; mew.textContent="looked "+DIR[my][1]; }
      const win=atk?my===its:my!==its; res[round]=win; if(win) pts++; a.score(pts);
      later(()=>{ a.msg.textContent=atk?(win?"Same way! You win! 1 point":"A different way. So close!"):(win?"You dodged! You win! 1 point":"You looked the same way… so close!");
        big(win?"Win!":"Lose…"); },650);
      round++; later(setup,2400);
    },700);
  }));
  $q(".pz-rule .pz-big").addEventListener("click",()=>{ $q(".pz-rule").remove(); setup(); });
}


window.KGAMES={open};
})();
