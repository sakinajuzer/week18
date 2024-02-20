var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'products.js',
    'webstore.webmanifest',
    'images/catfood.jpg',
    'images/icon-store-512.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function(r){
            return r || fetch(e.request).then(function(response){
                return caches.open(cacheName).then(function(cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
        // // caches.match(e.request).then(function(r){
        // //     console.log('[Service Worker] fetching resource: '+ e.request.url);
        // //     return r;
        // })
    );
});