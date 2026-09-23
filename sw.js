const CACHE='q-pinta-v5-20260922-2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('q-pinta-v5-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET') return;
  if(u.pathname.endsWith('/index.html')||u.pathname==='/'||u.pathname.endsWith('/')){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(CACHE).then(k=>k.put('./index.html',c));return r}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const c=x.clone();caches.open(CACHE).then(k=>k.put(e.request,c));return x})));
});
