const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  'assets/audioDetect.js',
  'assets/dom_request_script.js',
  'assets/base.css',
  'assets/Base64.js',
  'assets/bootstrap.min.css',
  'assets/bootstrap.min.js',
  'assets/jquery-1.11.0.min.js',
  'assets/loader.js',
  'assets/WebAudioAPI.js',
  'assets/Base64binary.js',
  'assets/helpers.js',
  'assets/gm.js',
  'assets/plugin.webaudio.js',
  'assets/plugin.webmidi.js',
  'assets/jQuery.fastClick.js',
  'assets/plugin.audiotag.js',
  'assets/acoustic_grand_piano-mp3.js',
  'assets/dom_request_xhr.js',
  'assets/base.js',
  'assets/jquery.hotkeys.js',
  'assets/intervals.js',
  'assets/perfect_pitch.js',
  'absolute-perfect-pitch-test.html',
  'index.html',
  'intervals.html',
  'service-worker.js',
  'manifest.json',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
