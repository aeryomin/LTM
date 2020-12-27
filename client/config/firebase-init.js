/* eslint-disable no-console */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { sendTokenToServer } from '../redux/reducers/auth'
import firebaseConfig from './firebase.config'

// if (!firebase.apps.length) {
//   try {
//     firebase.initializeApp(firebaseConfig)
//   } catch (err) {
//     console.error('Firebase initialization error raised', err.stack)
//   }
// }

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
// navigator.serviceWorker.register('sw.js').then((registration) => {
//   messaging.useServiceWorker(registration)
// })

const FirebaseInit = (props) => {
  const auth = useSelector((s) => s.auth)

  useEffect(() => {
    if (typeof auth.user !== 'undefined' && typeof auth.token !== 'undefined') {
      if (Object.keys(auth.user).length !== 0 && auth.token.length !== '') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            messaging.getToken().then((currentToken) => {
              // console.log('currentToken: ', currentToken)
              sendTokenToServer(auth.user._id, currentToken)
            })
          } else {
            console.log('Unable to get permission to notify.')
          }
        })
        // messaging
        //   .requestPermission()
        //   .then(() => {
        //     console.log('Have permission')
        //     return messaging.getToken()
        //   })
        //   .then((currentToken) => {
        //     console.log('currentToken: ', currentToken)
        //     if (currentToken) {
        //       sendTokenToServer(auth.user._id, currentToken)
        //     } else {
        //       console.warn('Не удалось получить токен.')
        //       // setTokenSentToServer(false)
        //     }
        //   })
        //   .catch((err) => {
        //     console.warn('An error occurred while getting the token', err)
        //   })
        // messaging.onMessage((payload) => {
        //   console.log('On message: ', payload)
        // })
        // messaging.onMessage((payload) => {
        //   navigator.serviceWorker.register('/firebase-messaging-sw.js')
        //   Notification.requestPermission((permission) => {
        //     if (permission === 'granted') {
        //       navigator.serviceWorker.ready
        //         .then((registration) => {
        //           const data = { ...payload.notification, ...payload.data }
        //           const notificationTitle = data.title
        //           const notificationOptions = {
        //             body: data.body,
        //             icon: data.icon,
        //             requireInteraction: true,
        //             data
        //           }
        //           return registration.showNotification(notificationTitle, notificationOptions)
        //         })
        //         .catch((error) => {
        //           console.log('ServiceWorker registration failed', error)
        //         })
        //     }
        //   })
        // })
      }
    }
  }, [auth])

  return props.children
}

export default FirebaseInit
