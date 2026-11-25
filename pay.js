// かんじフレンズ：有料のしくみ（アプリ内課金・買い切り1つ）
// むりょう：1年生ぜんぶ ＋ 2〜6年生の さいしょの ばしょ（はじまりの島など）。ほかは「ぜんぶ ひらく」を 買うと あそべる。
// iPhone/iPad アプリ（Capacitor）の ときだけ ロックする。Web版は WEB_LOCK で きりかえ（MAさんの きめ待ち）。
(function(){
  const PID="io.github.mamikkokanji.kanjifriends.all";   // App Store Connect の 製品ID（非消耗型）
  const KEY="kanji-pro-v1";
  const WEB_LOCK=false;
  const C=window.Capacitor;
  const native=!!(C&&typeof C.isNativePlatform==="function"&&C.isNativePlatform());
  const plat=native&&typeof C.getPlatform==="function"?C.getPlatform():"web";
  const store=native&&plat==="ios";
  const enforced=native?store:WEB_LOCK;   // Android は 課金を 入れるまで ロックしない
  let owned=false; try{ owned=localStorage.getItem(KEY)==="1"; }catch(e){}
  function setOwned(v){ owned=!!v; try{ owned?localStorage.setItem(KEY,"1"):localStorage.removeItem(KEY); }catch(e){} }
  function call(m,o){
    if(!store) return Promise.reject(new Error("no-store"));
    o=Object.assign({id:PID},o||{});
    if(typeof C.nativePromise==="function") return C.nativePromise("KFStore",m,o);
    return C.registerPlugin("KFStore")[m](o);
  }
  // 起動のたびに App Store の きろくで たしかめる（返金・べつの端末で 買った ときも あわせる）
  if(store) call("owned").then(r=>{ const was=owned; setOwned(r&&r.owned); if(was!==owned) location.reload(); }).catch(()=>{});

  const free=(grade,sec)=>!enforced||owned||(+grade||1)<=1||(+sec||0)<1;
  let price="";
  function loadPrice(){ if(price||!store) return Promise.resolve(price); return call("getProduct").then(r=>{ price=(r&&r.price)||""; return price; }).catch(()=>""); }

  // ---------- ロックの 画面 ----------
  const CSS=`.kfpay-ov{position:fixed;inset:0;z-index:1000;background:rgba(30,25,20,.55);display:flex;align-items:center;justify-content:center;padding:16px}
.kfpay{background:#FFF8EE;color:#3a2f25;border-radius:22px;max-width:420px;width:100%;padding:22px 18px 16px;box-shadow:0 10px 40px rgba(0,0,0,.25);text-align:center;font-family:inherit}
.kfpay h2{margin:0 0 8px;font-size:1.25rem}
.kfpay p{margin:6px 0;line-height:1.6;font-size:.95rem}
.kfpay small{display:block;color:#7a6b5c;font-size:.8rem;line-height:1.5;margin-top:8px}
.kfpay button{font:inherit;font-weight:800;display:block;width:100%;border:0;border-radius:14px;padding:13px;margin-top:10px;cursor:pointer}
.kfpay .buy{background:#E08A2E;color:#fff;font-size:1.05rem}
.kfpay .buy:disabled{opacity:.6}
.kfpay .sub{background:#fff;color:#3a2f25;border:2px solid #e5d8c6}
.kfpay .msg{min-height:1.4em;font-weight:700;color:#B4541A}
.isle.paylock,.chap.paylock .tile{opacity:.55}
.isle.paylock b::after{content:""}
.kfpay-badge{margin-left:6px;font-size:.8rem}
@media (prefers-color-scheme: dark){.kfpay{background:#2b241d;color:#f3e9dc}.kfpay small{color:#bba99a}.kfpay .sub{background:#3a3027;color:#f3e9dc;border-color:#56483b}}`;
  let cssOn=false;
  function css(){ if(cssOn) return; cssOn=true; const s=document.createElement("style"); s.textContent=CSS; document.head.appendChild(s); }

  function open(){
    css();
    if(document.querySelector(".kfpay-ov")) return;
    const ov=document.createElement("div"); ov.className="kfpay-ov"; ov.setAttribute("role","dialog"); ov.setAttribute("aria-modal","true");
    const can=store;
    ov.innerHTML=`<div class="kfpay">
      <h2>🔒 ここから さきは「ぜんぶ ひらく」</h2>
      <p>1年生ぜんぶと、2〜6年生の さいしょの ばしょは むりょうで あそべます。</p>
      <p>「ぜんぶ ひらく」を いちど 買うと、2〜6年生の ぜんぶの ばしょ（4人の キャラ・おぼえる・クイズ）が ずっと あそべます。</p>
      ${can?`<button type="button" class="buy" id="kfBuy">🔓 ぜんぶ ひらく<span id="kfPrice"></span></button>
      <button type="button" class="sub" id="kfRestore">購入を復元（前に 買った 方）</button>`:`<p><b>つづきは iPhone・iPad の アプリ「かんじフレンズ」で あそべます。</b></p>`}
      <button type="button" class="sub" id="kfClose">とじる</button>
      <p class="msg" id="kfMsg" aria-live="polite"></p>
      <small>おうちの方へ：買い切り（1回だけの おしはらい）です。定期購入では ありません。</small>
    </div>`;
    document.body.appendChild(ov);
    const $=id=>ov.querySelector("#"+id), msg=t=>{ $("kfMsg").textContent=t; };
    const close=()=>ov.remove();
    $("kfClose").onclick=close;
    ov.addEventListener("click",e=>{ if(e.target===ov) close(); });
    if(!can) return;
    loadPrice().then(p=>{ if(p&&$("kfPrice")) $("kfPrice").textContent=`（${p}）`; });
    const busy=b=>{ $("kfBuy").disabled=b; $("kfRestore").disabled=b; };
    const done=()=>{ setOwned(true); msg("ありがとう！ ぜんぶ ひらいたよ 🎉"); setTimeout(()=>location.reload(),1200); };
    $("kfBuy").onclick=()=>{ busy(true); msg("App Store に つないでいます…");
      call("purchase").then(r=>{ const k=r&&r.result;
        if(k==="ok") return done();
        busy(false);
        msg(k==="cancel"?"":k==="pending"?"おうちの人の しょうにんを まっています。しょうにん されたら ひらきます。":"うまく いきませんでした。もう一度 ためしてね。");
      }).catch(()=>{ busy(false); msg("うまく いきませんでした。ネットに つながっているか たしかめてね。"); });
    };
    $("kfRestore").onclick=()=>{ busy(true); msg("たしかめています…");
      call("restore").then(r=>{ if(r&&r.owned) return done(); busy(false); msg("この Apple ID では まだ 買われていないようです。"); })
      .catch(()=>{ busy(false); msg("うまく いきませんでした。もう一度 ためしてね。"); });
    };
  }

  // ---------- クイズの ページ（島・くに・マップ） ----------
  function guardQuiz(){
    const G=+window.KF_GRADE||1;
    if(free(G,1)) return;
    css();
    let A; try{ A=ALL; }catch(e){ return; }
    const N=A.length<=80?8:10, freeSet=new Set(A.slice(0,Math.round(A.length/N)).map(c=>c.k));
    // 出題は さいしょの ばしょの 漢字だけ（進み具合の「チャプター練習」も ふくめて）
    try{ if(typeof pool==="function"){ const _p=pool; pool=function(){ const p=_p.apply(this,arguments)||[]; const f=p.filter(c=>freeSet.has(c.k)); return f.length?f:A.filter(c=>freeSet.has(c.k)); }; } }catch(e){}
    // ロックの ばしょに いたら さいしょに もどす
    try{ if(state.sec>0){ state.sec=0; state.chap=null; save(); try{ renderSea(); }catch(e){} try{ renderQuestion(); }catch(e){} } }catch(e){}
    // 島の ボタンに 🔒 を つけ、おすと「ぜんぶ ひらく」を 出す
    const deco=()=>document.querySelectorAll(".isle[data-i]").forEach(b=>{
      if(free(G,+b.dataset.i)||b.classList.contains("paylock")) return;
      b.classList.add("paylock"); b.disabled=false; b.setAttribute("aria-pressed","false");
      const t=b.querySelector("b"); if(t) t.textContent="🔒";
      b.setAttribute("aria-label",(b.textContent||"").replace("🔒","")+"（ぜんぶ ひらくと 行ける）");
    });
    new MutationObserver(deco).observe(document.body,{childList:true,subtree:true});
    deco();
    document.addEventListener("click",e=>{ const b=e.target.closest&&e.target.closest(".isle.paylock"); if(b){ e.preventDefault(); e.stopImmediatePropagation(); open(); } },true);
  }

  // ---------- おぼえる（learn.html） ----------
  function guardLearn(){
    let G=1; try{ G=+GRADE||1; }catch(e){}
    if(free(G,1)) return;
    css();
    const _l=lesson; lesson=function(k){ if(!free(G,chapOf(k))) return open(); return _l.apply(this,arguments); };
    const _h=home; home=function(){ const r=_h.apply(this,arguments);
      document.querySelectorAll("#app .chap").forEach((s,i)=>{ if(free(G,i)) return; s.classList.add("paylock"); const h=s.querySelector("h2"); if(h&&!h.querySelector(".kfpay-badge")) h.insertAdjacentHTML("beforeend",'<span class="kfpay-badge">🔒</span>'); });
      return r; };
  }

  window.KF_PAY={enforced,store,owned:()=>owned,free,open,loadPrice,guardQuiz,guardLearn,
    restore:()=>call("restore").then(r=>{ if(r&&r.owned){ setOwned(true); } return !!(r&&r.owned); })};
})();
