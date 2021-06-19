var cacheName = 'hello-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

const voteForClem = async () => {
  const url = `https://www.starmaxx-club.fr/vote/29/5`;
  const response = await fetch(url);

  console.info('Result of the fetch is '+response);

};

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'vote') {
    console.log('Vote for clem in the background');
    event.waitUntil(voteForClem());
  }
});
