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
        messaging
          .requestPermission()
          .then(() => {
            console.log('Have permission')
            return messaging.getToken()
          })
          .then((currentToken) => {
            console.log('currentToken: ', currentToken)

            if (currentToken) {
              sendTokenToServer(auth.user._id, currentToken)
            } else {
              console.warn('Не удалось получить токен.')
              // setTokenSentToServer(false)
            }
          })
          .catch((err) => {
            console.warn('An error occurred while getting the token', err)
          })

        messaging.onMessage((payload) => {
          console.log('On message: ', payload)
        })
      }
    }
  }, [auth])

  return props.children
}

export default FirebaseInit
