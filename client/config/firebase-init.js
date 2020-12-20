/* eslint-disable no-console */
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/messaging'
import { sendTokenToServer } from '../redux/reducers/auth'

const FirebaseInit = (props) => {
  const auth = useSelector((s) => s.auth)

  useEffect(() => {
    if (!!auth.user && !!auth.token) {
      console.log('firebase-init', auth.user, auth.token)
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

      const messaging = firebase.messaging()
      console.log('messaging in MainPage: ', messaging)

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
  }, [auth])

  return props.children
}

export default FirebaseInit
