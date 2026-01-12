// service-worker.js

// رقم الكاش ديناميكي: كل تحديث على الكود يغير هذا الرقم
const CACHE_VERSION = 'v6';  // زد الرقم عند كل تحديث مستقبلي
const CACHE_NAME = `plots-map-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/logo_alsakar.png',
  '/logo_jawhara.png',
  '/plots.csv',
  '/service-worker.js',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet/dist/leaflet.js',
  'https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.css',
  'https://unpkg.com/leaflet.markercluster/dist/MarkerCluster.Default.css',
  'https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js',
  'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js',
  'https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@700&display=swap'
];

// ===== Install Event =====
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// ===== Activate Event =====
self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// ===== Fetch Event =====
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request);
    })
  );
});
