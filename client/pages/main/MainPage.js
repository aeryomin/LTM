/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React from 'react'
import { useSelector } from 'react-redux'

// import firebase from 'firebase/app'
// import 'firebase/messaging'

import Header from '../../components/Header/Header'
import Footer from '../../components/MainPage/Footer/Footer'
import TaskList from '../../components/MainPage/TaskList/TaskList'
import FormNewTask from '../../components/FormNewTask/FormNewTask'
// import { sendTokenToServer } from '../../redux/reducers/auth'

const MainPage = () => {
  const { isFormShown } = useSelector((s) => s.form)
  // const { user } = useSelector((s) => s.auth)

  // const firebaseConfig = {
  //   apiKey: 'AIzaSyALi5loqMEBzR5Am8HUxGHPcD7G1pDhzDo',
  //   authDomain: 'lightweight-task-manager.firebaseapp.com',
  //   projectId: 'lightweight-task-manager',
  //   storageBucket: 'lightweight-task-manager.appspot.com',
  //   messagingSenderId: '939705651291',
  //   appId: '1:939705651291:web:4541e5c08f358f09712f7e',
  //   measurementId: 'G-2HLQRV3WHG'
  // }

  // if (!firebase.apps.length) {
  //   try {
  //     firebase.initializeApp(firebaseConfig)
  //   } catch (err) {
  //     console.error('Firebase initialization error raised', err.stack)
  //   }
  // }

  // const messaging = firebase.messaging()
  // console.log('messaging in MainPage: ', messaging)

  // messaging
  //   .requestPermission()
  //   .then(() => {
  //     console.log('Have permission')
  //     return messaging.getToken()
  //   })
  //   .then((currentToken) => {
  //     console.log('currentToken: ', currentToken)

  //     if (currentToken) {
  //       sendTokenToServer(user._id, currentToken)
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

  return (
    <div className="relative w-screen h-screen bg-custom-main-page bg-cover flex flex-col divide-y md:max-w-screen-md md:mx-auto">
      <Header />
      <TaskList />
      <Footer />
      {isFormShown && <FormNewTask />}
    </div>
  )
}

MainPage.propTypes = {}

export default MainPage
