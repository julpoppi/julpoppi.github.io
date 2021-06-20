var cacheName = 'v2';
var filesToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/images/notif-mobile.png',
    '/images/notif-desktop.png',
    '/images/install-mobile.png',
    '/images/install-desktop.png',
];

const voteForClem = async () => {
    const url = `https://www.starmaxx-club.fr/vote/29/5`;
    const response = await fetch(url, {mode: 'no-cors'});

    const timestamp = new Date()
    const body = "Vote pour Clément effectué à " + timestamp;

    await self.registration.showNotification('Vote pour Clément effectué',
        {
            tag: timestamp, // a unique ID
            silent: true,
            body: body, // content of the push notification
        });

    console.info('Result of the fetch is ' + response);

};

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
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

self.addEventListener('notificationclick', event => {
    event.waitUntil(self.clients.openWindow('/'));
});
