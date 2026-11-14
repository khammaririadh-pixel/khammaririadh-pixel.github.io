/* Wortweg service worker: keeps the app working offline. AI and speech calls always go to the network. */
const CACHE="wortweg-v9";
const SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png","./favicon.png",
  "./wortweg-audio.js?v=4","./wortweg-vocab.js?v=4","./wortweg-grammar.js?v=4","./wortweg-scenes.js?v=4","./wortweg-plus.js?v=4"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const req=e.request;if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.origin===location.origin&&(/\.mp4$/.test(url.pathname)||req.headers.has("range")))return; // videos stream straight from the network
  if(url.origin===location.origin){
    // app files: network first (so updates arrive), cache as fallback when offline
    e.respondWith(fetch(req).then(r=>{if(r.ok&&r.status===200){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c))}return r}).catch(()=>caches.match(req).then(r=>r||caches.match("./index.html"))));
  }else if(/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    // fonts: cache first
    e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c));return r})));
  }
});
