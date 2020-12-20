/* eslint-disable no-console */
/* eslint-disable no-undef */
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

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig)
  } catch (err) {
    console.error('Firebase initialization error raised', err.stack)
  }
}

// firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('payload: ', payload)
  const { title } = payload.data
  const options = {
    body: payload.data.status
  }
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(title, options)
})
