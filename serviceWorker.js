const CACHE_NAME = 'estacionamento-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles/style.css',
  './scripts/app.js',
  './img/buscacarro.png',
  './img/carross.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});