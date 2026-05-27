const CACHE = "hd2-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon192.png",
  "./icon512.png",
  "./Randomizer_black.png",
  "./Jumping_Diver.png",
  "./Warbonds.png",
  "./Factions.png",
  "./Statistics.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.url.includes("script.google.com")) return;
  if (e.request.url.includes("fonts.googleapis.com")) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
