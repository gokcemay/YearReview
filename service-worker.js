const CACHE_NAME = "year-review-cache-v1";
const ASSETS_TO_CACHE = [
  "./",              // index.html
  "./index.html",
  "./manifest.json",
  "./yrEN.html",
  "./yrTR.html",
  "./yrES.html",
  "./yrFR.html",
  "./yrDE.html",
  // plus any CSS, JS, fonts, images, etc.
  // e.g., "./styles.css", "./script.js"
];

// INSTALL: Cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ACTIVATE: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// FETCH: Serve cached assets when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached file or fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});
