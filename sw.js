// かんじフレンズ：オフラインでも遊べるようにするしくみ
// ゲームを直したら VERSION を上げると、つぎに開いたとき新しい版に入れかわります
const VERSION = "nakama-v66";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./chara-pirate.png", "./chara-dragon.png", "./chara-hamster.png", "./chara-unicorn.png", "./pirate-10.html", "./pirate-9.html", "./pirate-8.html", "./pirate-7.html", "./pirate-6.html", "./pirate-5.html", "./dragon-10.html", "./dragon-9.html", "./dragon-8.html", "./dragon-7.html", "./dragon-6.html", "./dragon-5.html", "./hamster-10.html", "./hamster-9.html", "./hamster-8.html", "./hamster-7.html", "./hamster-6.html", "./hamster-5.html", "./unicorn-10.html", "./unicorn-9.html", "./unicorn-8.html", "./unicorn-7.html", "./unicorn-6.html", "./unicorn-5.html", "./learn.html", "./pay.js?v=1", "./evo/dragon-0.webp", "./evo/dragon-1.webp", "./evo/dragon-10.webp", "./evo/dragon-11.webp", "./evo/dragon-12.webp", "./evo/dragon-13.webp", "./evo/dragon-14.webp", "./evo/dragon-2.webp", "./evo/dragon-3.webp", "./evo/dragon-4.webp", "./evo/dragon-5.webp", "./evo/dragon-6.webp", "./evo/dragon-7.webp", "./evo/dragon-8.webp", "./evo/dragon-9.webp", "./evo/hamster-0.webp", "./evo/hamster-1.webp", "./evo/hamster-10.webp", "./evo/hamster-11.webp", "./evo/hamster-12.webp", "./evo/hamster-13.webp", "./evo/hamster-14.webp", "./evo/hamster-2.webp", "./evo/hamster-3.webp", "./evo/hamster-4.webp", "./evo/hamster-5.webp", "./evo/hamster-6.webp", "./evo/hamster-7.webp", "./evo/hamster-8.webp", "./evo/hamster-9.webp", "./evo/pirate-0.png", "./evo/pirate-0.webp", "./evo/pirate-1.webp", "./evo/pirate-10.webp", "./evo/pirate-11.webp", "./evo/pirate-12.webp", "./evo/pirate-13.webp", "./evo/pirate-14.webp", "./evo/pirate-2.webp", "./evo/pirate-3.webp", "./evo/pirate-4.webp", "./evo/pirate-5.webp", "./evo/pirate-6.webp", "./evo/pirate-7.webp", "./evo/pirate-8.webp", "./evo/pirate-9.webp", "./evo/unicorn-0.webp", "./evo/unicorn-1.webp", "./evo/unicorn-10.webp", "./evo/unicorn-11.webp", "./evo/unicorn-12.webp", "./evo/unicorn-13.webp", "./evo/unicorn-14.webp", "./evo/unicorn-2.webp", "./evo/unicorn-3.webp", "./evo/unicorn-4.webp", "./evo/unicorn-5.webp", "./evo/unicorn-6.webp", "./evo/unicorn-7.webp", "./evo/unicorn-8.webp", "./evo/unicorn-9.webp", "./cut/dragon-0.webp", "./cut/dragon-1.webp", "./cut/hamster-0.webp", "./cut/hamster-1.webp", "./cut/pirate-0.webp", "./cut/pirate-1.webp", "./cut/unicorn-0.webp", "./cut/unicorn-1.webp", "./play/card-igloo.webp", "./play/card-q.webp", "./play/fish0.webp", "./play/fish1.webp", "./play/fish2.webp", "./play/fish4.webp", "./play/fish5.webp", "./play/igloo.webp", "./play/nightsky.webp", "./play/star.webp", "./play/target.webp", "./play/tr-dug.webp", "./play/tr-gold.webp", "./play/tr-hot.webp", "./play/tr-sand.webp", "./learn-1.js?v=1", "./learn-2.js?v=1", "./learn-3.js?v=1", "./learn-4.js?v=1", "./learn-5.js?v=1", "./learn-6.js?v=1"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // よみあげの 音声：保存せず そのまま（iPhone の とちゅう読み込み対策）
  if (url.pathname.includes("/voice/")) return;
  // ページ：ネットがあれば最新、なければ保存した版
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req, {ignoreSearch: true}).then(hit => hit || caches.match("./index.html"))));
    return;
  }
  // 文字（Google Fonts）や絵：保存した版をすぐ使い、うらで更新
  if (url.origin === location.origin || url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  }
});
