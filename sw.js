var cacheName = 'v2';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

const voteForClem = async () => {
  const url = `https://www.starmaxx-club.fr/vote/29/5`;
  const response = await fetch(url, { mode: 'no-cors'});

  self.showNotification('Vote pour Clément effectué',
  {
     tag: timestamp, // a unique ID
	 silent: true
     body: 'Vote pour Clément effectué', // content of the push notification
     data: {
       url: window.location.href, // pass the current url to the notification
     },
     badge: './images/hello-icon-144.png',
     icon: './images/hello-icon-144.png',
   }

  console.info('Result of the fetch is '+response);

};

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
	showNotification('Demo Push Notification',
        {
          tag: timestamp, // a unique ID
          body: 'Merci pour l\'installation', // content of the push notification
          data: {
            url: window.location.href, // pass the current url to the notification
          },
          badge: './images/hello-icon-144.png',
          icon: './images/hello-icon-144.png',
        }
      );
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

self.addEventListener('notificationclick', event => {
  event.waitUntil(self.clients.openWindow('/'));
});
