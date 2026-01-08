const CACHE_NAME = 'jawhara-map-v1';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './plots.csv',
  './logo_alsakar.png',
  './logo_jawhara.png',
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
];

// التثبيت
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// الجلب
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
