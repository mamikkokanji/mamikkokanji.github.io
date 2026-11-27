// Kanji Friends (English): offline support. Bump VERSION on every update.
const VERSION = "kf-en-v17";
const CORE = ["./", "./index.html", "./app.js?v=12", "./voice-g1.js?v=2", "./manifest.webmanifest", "./icon-192.png?v=3", "./icon-512.png?v=3", "./apple-touch-icon.png?v=3", "./data-g1.js?v=6", "./data-g2.js?v=1", "./data-g3.js?v=1", "./games.js?v=1", "./img/play/fish0.webp", "./img/play/fish1.webp", "./img/play/fish2.webp", "./img/play/fish4.webp", "./img/play/fish5.webp", "./img/play/igloo.webp", "./img/play/nightsky.webp", "./img/play/star.webp", "./img/play/target.webp", "./img/play/tr-dug.webp", "./img/play/tr-gold.webp", "./img/play/tr-hot.webp", "./img/play/tr-sand.webp", "./img/hoi/hoi2-dragon-down.webp", "./img/hoi/hoi2-dragon-front.webp", "./img/hoi/hoi2-dragon-left.webp", "./img/hoi/hoi2-dragon-right.webp", "./img/hoi/hoi2-dragon-up.webp", "./img/hoi/hoi2-kid-down.webp", "./img/hoi/hoi2-kid-front.webp", "./img/hoi/hoi2-kid-left.webp", "./img/hoi/hoi2-kid-right.webp", "./img/hoi/hoi2-kid-up.webp", "./img/hoi/hoi2-unicorn-down.webp", "./img/hoi/hoi2-unicorn-front.webp", "./img/hoi/hoi2-unicorn-left.webp", "./img/hoi/hoi2-unicorn-right.webp", "./img/hoi/hoi2-unicorn-up.webp", "./img/chara-pirate.webp", "./img/chara-unicorn.webp", "./img/chara-penguin.webp", "./img/chara-dragon.webp", "./img/evo/pirate-0.webp", "./img/evo/pirate-1.webp", "./img/evo/pirate-2.webp", "./img/evo/pirate-3.webp", "./img/evo/pirate-4.webp", "./img/evo/pirate-5.webp", "./img/evo/pirate-6.webp", "./img/evo/pirate-7.webp", "./img/evo/pirate-8.webp", "./img/evo/pirate-9.webp", "./img/evo/pirate-10.webp", "./img/evo/pirate-11.webp", "./img/evo/pirate-12.webp", "./img/evo/pirate-13.webp", "./img/evo/pirate-14.webp", "./img/evo/unicorn-0.webp", "./img/evo/unicorn-1.webp", "./img/evo/unicorn-2.webp", "./img/evo/unicorn-3.webp", "./img/evo/unicorn-4.webp", "./img/evo/unicorn-5.webp", "./img/evo/unicorn-6.webp", "./img/evo/unicorn-7.webp", "./img/evo/unicorn-8.webp", "./img/evo/unicorn-9.webp", "./img/evo/unicorn-10.webp", "./img/evo/unicorn-11.webp", "./img/evo/unicorn-12.webp", "./img/evo/unicorn-13.webp", "./img/evo/unicorn-14.webp", "./img/evo/penguin-0.webp", "./img/evo/penguin-1.webp", "./img/evo/penguin-2.webp", "./img/evo/penguin-3.webp", "./img/evo/penguin-4.webp", "./img/evo/penguin-5.webp", "./img/evo/penguin-6.webp", "./img/evo/penguin-7.webp", "./img/evo/penguin-8.webp", "./img/evo/penguin-9.webp", "./img/evo/penguin-10.webp", "./img/evo/penguin-11.webp", "./img/evo/penguin-12.webp", "./img/evo/penguin-13.webp", "./img/evo/penguin-14.webp", "./img/evo/dragon-0.webp", "./img/evo/dragon-1.webp", "./img/evo/dragon-2.webp", "./img/evo/dragon-3.webp", "./img/evo/dragon-4.webp", "./img/evo/dragon-5.webp", "./img/evo/dragon-6.webp", "./img/evo/dragon-7.webp", "./img/evo/dragon-8.webp", "./img/evo/dragon-9.webp", "./img/evo/dragon-10.webp", "./img/evo/dragon-11.webp", "./img/evo/dragon-12.webp", "./img/evo/dragon-13.webp", "./img/evo/dragon-14.webp"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  // only delete this app's own old caches (the Japanese app shares the origin)
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("kf-en-") && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.pathname.includes("/voice/")) return; // 音声は ブラウザに まかせる（Range 読み込みのため）
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req, {ignoreSearch: true}).then(hit => hit || caches.match("./index.html"))));
    return;
  }
  if ((url.origin === location.origin && url.pathname.startsWith(new URL("./", self.registration.scope).pathname)) || url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    })));
  }
});
