// Service Worker per abilitare l'installazione PWA su Chrome (Android)
const CACHE_NAME = 'shiftflow-v1';

self.addEventListener('install', (event) => {
    // Forza il Service Worker a diventare attivo immediatamente
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Pulisce vecchie cache se presenti
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Gestione base delle richieste: prova la rete, se fallisce (offline) non bloccare l'app
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});

