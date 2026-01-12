// ===== Service Worker لإدارة PWA وتحديث التطبيق تلقائياً =====

// رقم الإصدار الخاص بالكاش
// قم بزيادة الرقم عند كل تحديث رئيسي للملفات
const CACHE_NAME = 'plots-map-v4';  // v4 ← زد الرقم عند كل تحديث مستقبلي

// الملفات التي سيتم تخزينها في الكاش
const urlsToCache = [
  '/',
  '/index.html',
  '/plots.csv',
  '/logo_alsakar.png',
  '/logo_jawhara.png',
  '/favicon.ico',
  '/manifest.json'
];

// عند تثبيت الـ Service Worker، قم بتخزين الملفات في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // فرض التفعيل الفوري
  );
});

// تنشيط الـ Service Worker وحذف الكاش القديم إذا كان موجود
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name); // حذف أي كاش قديم
          }
        })
      )
    )
  );
  self.clients.claim();
});

// التقاط طلبات الشبكة واسترجاع الملفات من الكاش عند عدم توفر الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
