// 漢字なかまたち：オフラインでも遊べるようにするしくみ
// ゲームを直したら VERSION を上げると、つぎに開いたとき新しい版に入れかわります
const VERSION = "nakama-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png", "./chara-pirate.png", "./chara-dragon.png", "./chara-hamster.png", "./chara-unicorn.png", "./pirate-10.html", "./pirate-9.html", "./pirate-5.html", "./dragon-9.html", "./dragon-5.html", "./hamster-10.html", "./hamster-9.html", "./hamster-5.html", "./unicorn-10.html", "./unicorn-9.html", "./unicorn-5.html"];

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
