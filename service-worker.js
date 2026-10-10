/* Explicit, scope-isolated precache. Bump VERSION for each published release. */
'use strict';
const VERSION='1.0.0-20261009';
const SCOPE=new URL(self.registration.scope);
const PREFIX='biomundo:'+SCOPE.pathname+':';
const CACHE=PREFIX+VERSION;
const FILES=[
 "./",
 "./index.html",
 "./manifest.webmanifest",
 "./css/accessibility.css",
 "./css/responsive.css",
 "./css/style.css",
 "./js/accessibility.js",
 "./js/audio.js",
 "./js/content.js",
 "./js/game.js",
 "./js/interactions.js",
 "./js/levels.js",
 "./js/main.js",
 "./js/progress.js",
 "./assets/mascot/celebrating.svg",
 "./assets/mascot/encouraging.svg",
 "./assets/mascot/explaining.svg",
 "./assets/mascot/happy.svg",
 "./assets/mascot/neutral.svg",
 "./assets/mascot/thinking.svg",
 "./assets/cells/animal-base.svg",
 "./assets/cells/animal-complete.svg",
 "./assets/cells/plant-base.svg",
 "./assets/cells/plant-complete.svg",
 "./assets/organelles/chloroplast.svg",
 "./assets/organelles/cytoplasm.svg",
 "./assets/organelles/golgi.svg",
 "./assets/organelles/lysosome.svg",
 "./assets/organelles/membrane.svg",
 "./assets/organelles/mitochondrion.svg",
 "./assets/organelles/nucleus.svg",
 "./assets/organelles/reticulum.svg",
 "./assets/organelles/ribosome.svg",
 "./assets/organelles/vacuole.svg",
 "./assets/organelles/wall.svg",
 "./assets/backgrounds/micro-world.svg",
 "./assets/icons/icon-192.png",
 "./assets/icons/icon-512.png",
 "./assets/icons/maskable-512.png",
 "./assets/icons/star.svg",
 "./assets/audio/success.wav"
];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
 // Updates wait until previous app tabs close; do not replace a running game's code.
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==SCOPE.origin||!url.pathname.startsWith(SCOPE.pathname))return;
 const relative='./'+url.pathname.slice(SCOPE.pathname.length);
 if(!FILES.includes(relative))return; // Never intercept unrelated apps or external links.
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  const stored=await cache.match(new URL(relative,SCOPE));
  if(stored)return stored;
  return fetch(event.request);
 })());
});
