// Simple offline cache for Hoops Money marketing site

const CACHE_NAME = 'hoops-money-v1';
const URLS_TO_CACHE = [
'/', // root
'/index.html',
'/about.html',
'/privacy.html',
'/terms.html',
'/images/hooporia-logo.png'
];

// Install: cache core pages
self.addEventListener('install', event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(URLS_TO_CACHE))
.then(() => self.skipWaiting())
);
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(
keys.map(key => {
if (key !== CACHE_NAME) {
return caches.delete(key);
}
})
)
).then(() => self.clients.claim())
);
});

// Fetch: cache-first, then network
self.addEventListener('fetch', event => {
const req = event.request;

// Only handle GET
if (req.method !== 'GET') return;

event.respondWith(
caches.match(req).then(cached => {
if (cached) return cached;
return fetch(req).catch(() => {
// Optional: fall back to homepage when offline
if (req.mode === 'navigate') {
return caches.match('/index.html');
}
});
})
);
});
