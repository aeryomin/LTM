/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
const version = '2'
const CACHE_NAME = `cache-v${version}`
const urlsToCache = [
  '/',
  '/js/main.bundle.js',
  '/css/main.css',
  '/images/login.jpg',
  '/images/main-page.jpg',
  '/images/groups-profile.jpg'
]

self.addEventListener('install', (event) => {
  console.log('SW is installed')
  event
    .waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
    .then(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  console.log('SW is activated', event)
  const currentCaches = CACHE_NAME
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        console.log(cacheNames)
        return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName))
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete)
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  // const { request } = event
  // const url = new URL(request.url)
  // console.log('Request to server', request)
  // console.log('request: ', request)
  // console.log('url:', url)
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request)
    })
    // caches.match(event.request).then((response) => {
    //   if (response) {
    //     return response
    //   }
    //   return fetch(event.request)
    // })
  )
})
