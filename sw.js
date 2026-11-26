/* Leo Personal — service worker único para todas as fichas.
   Rede primeiro (sempre pega a versão mais nova publicada quando há internet) com fallback
   para o cache em até 4 s (academia com sinal fraco ou offline).
   Não precisa trocar versão a cada atualização: o conteúdo novo chega sozinho. */
const CACHE = 'leo-treinos-v2';
const CORE = ['./app.js', './app.css', './icons/coach.jpg', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {}));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function fromNetwork(req) {
  // Parâmetro único fura o cache de 10 min do GitHub Pages: com internet, sempre vem a versão publicada mais nova.
  const fresh = new URL(req.url);
  if (fresh.origin === location.origin) fresh.searchParams.set('_v', Date.now());
  const net = fresh.origin === location.origin ? fetch(fresh.href, { cache: 'no-store', credentials: 'same-origin' }) : fetch(req);
  return net.then(res => {
    if (res && (res.ok || res.type === 'opaque')) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
    }
    return res;
  });
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(url.host);
  if (url.origin !== location.origin && !fonts) return;
  if (fonts) { // fontes não mudam: cache primeiro
    e.respondWith(caches.match(req).then(hit => hit || fromNetwork(req)));
    return;
  }
  e.respondWith(new Promise(resolve => {
    let done = false;
    const fallback = () => caches.match(req, { ignoreSearch: true }).then(hit => hit);
    const timer = setTimeout(() => fallback().then(hit => { if (hit && !done) { done = true; resolve(hit); } }), 4000);
    fromNetwork(req).then(res => { clearTimeout(timer); if (!done) { done = true; resolve(res); } })
      .catch(() => { clearTimeout(timer); fallback().then(hit => { if (!done) { done = true; resolve(hit || Response.error()); } }); });
  }));
});
