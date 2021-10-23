---
layout: null
---
const CACHE_NAME = 'h-ka-corona-tracker-{{ site.time | date: "%Y%m%d-%H%M" }}';
const urlsToCache = [
  {% for file in site.static_files %}{% unless file.path contains '/unsplash/' %}'{{ site.baseurl }}{{ file.path }}',{% endunless %}
  {% endfor %}
  '{{ site.baseurl }}/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(
        response => {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            if (event.request.url.indexOf('http') !== 0) return;
            cache.put(event.request, responseToCache);
          });

          return response;
        }
      );
    }).catch(() => {
      return caches.match('{{ site.baseurl }}/');
    })
  );
});

self.addEventListener('activate', event => {

  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.waitUntil(self.clients.matchAll().then(clients => {
    if (clients.length) clients[0].focus();
    else self.clients.openWindow('/');
  }));
});
