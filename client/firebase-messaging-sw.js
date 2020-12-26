/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// import { sendTokenToServer } from './redux/reducers/auth'

importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyALi5loqMEBzR5Am8HUxGHPcD7G1pDhzDo',
  authDomain: 'lightweight-task-manager.firebaseapp.com',
  projectId: 'lightweight-task-manager',
  storageBucket: 'lightweight-task-manager.appspot.com',
  messagingSenderId: '939705651291',
  appId: '1:939705651291:web:4541e5c08f358f09712f7e',
  measurementId: 'G-2HLQRV3WHG'
}

// if (!firebase.apps.length) {
//   try {
//     firebase.initializeApp(firebaseConfig)
//   } catch (err) {
//     console.error('Firebase initialization error raised', err.stack)
//   }
// }

firebase.initializeApp(firebaseConfig)
// eslint-disable-next-line no-unused-vars
const messaging = firebase.messaging()

// messaging.onBackgroundMessage((payload) => {
//   console.log('payload: ', payload)
//   const { title } = payload.data
//   const options = {
//     body: payload.data.status
//   }
//   // eslint-disable-next-line no-restricted-globals
//   self.registration.showNotification(title, options)
// })

// const version = '2'
// const CACHE_NAME = `cache-v${version}`
// const urlsToCache = [
//   // '/js/main.bundle.js',
//   // '/css/main.css',
//   '/images/login.jpg',
//   '/images/main-page.jpg',
//   '/images/groups-profile.jpg'
// ]

// self.addEventListener('install', (event) => {
//   console.log('SW is installed')
//   event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
//   // .then(self.skipWaiting())
// })

// self.addEventListener('activate', (event) => {
//   console.log('SW is activated')
//   const currentCaches = CACHE_NAME
//   event.waitUntil(
//     caches
//       .keys()
//       .then((cacheNames) => {
//         // console.log(cacheNames)
//         return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName))
//       })
//       .then((cachesToDelete) => {
//         return Promise.all(
//           cachesToDelete.map((cacheToDelete) => {
//             return caches.delete(cacheToDelete)
//           })
//         )
//       })
//       .then(() => self.clients.claim())
//   )
// })

// self.addEventListener('fetch', (event) => {
//   if (
//     event.request.url.startsWith(self.location.origin) &&
//     event.request.method.toUpperCase() === 'GET' &&
//     event.request.url.indexOf('install_sw') < 0
//   ) {
//     // Generic fallback
//     event.respondWith(
//       caches
//         .match(event.request)
//         .then((response) => {
//           return response || fetch(event.request)
//         })
//         .catch(() => {
//           return caches.match('/offline')
//         })
//     )
//   }
// })
