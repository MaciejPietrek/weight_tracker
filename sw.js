const CACHE_NAME = 'weight-tracker-v3';

const APP_SHELL = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

const CDN_CACHE = [
  'https://code.highcharts.com/highcharts.js',
  'https://code.highcharts.com/modules/exporting.js',
  'https://code.highcharts.com/modules/export-data.js'
];

// -------------------- INSTALL --------------------
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
});

// -------------------- ACTIVATE --------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// -------------------- FETCH --------------------
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. HTML → NETWORK FIRST (najważniejsze!)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // 2. CDN → CACHE FIRST
  if (CDN_CACHE.some((cdn) => event.request.url.includes(cdn))) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return (
          cached ||
          fetch(event.request).then((res) => {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
            return res;
          })
        );
      })
    );
    return;
  }

  // 3. APP FILES → STALE-WHILE-REVALIDATE
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      });

      return cached || fetchPromise;
    })
  );
});

// -------------------- MANUAL UPDATE --------------------
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});