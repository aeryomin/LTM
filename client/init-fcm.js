/* eslint-disable no-undef */
/* eslint-disable no-console */
const firebaseConfig = {
  apiKey: 'AIzaSyALi5loqMEBzR5Am8HUxGHPcD7G1pDhzDo',
  authDomain: 'lightweight-task-manager.firebaseapp.com',
  projectId: 'lightweight-task-manager',
  storageBucket: 'lightweight-task-manager.appspot.com',
  messagingSenderId: '939705651291',
  appId: '1:939705651291:web:4541e5c08f358f09712f7e',
  measurementId: 'G-2HLQRV3WHG'
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
console.log('messaging', messaging)

messaging
  .requestPermission()
  .then(() => {
    console.log('Have permission')
    return messaging.getToken()
  })
  .then((currentToken) => {
    console.log('currentToken: ', currentToken)

    // if (currentToken) {
    //   sendTokenToServer(currentToken);
    // } else {
    //   console.warn("Не удалось получить токен.");
    //   setTokenSentToServer(false);
    // }
  })
  .catch((err) => {
    console.warn('При получении токена произошла ошибка.', err)
  })

messaging.onMessage((payload) => {
  console.log('On message: ', payload)
})

// function sendTokenToServer(currentToken) {
//   if (!isTokenSentToServer(currentToken)) {
//     console.log("Отправка токена на сервер...");

//     var url = ""; // адрес скрипта на сервере который сохраняет ID устройства
//     $.post(url, {
//       token: currentToken,
//     });

//     setTokenSentToServer(currentToken);
//   } else {
//     console.log("Токен уже отправлен на сервер.");
//   }
// }

// // используем localStorage для отметки того,
// // что пользователь уже подписался на уведомления
// function isTokenSentToServer(currentToken) {
//   return (
//     window.localStorage.getItem("sentFirebaseMessagingToken") == currentToken
//   );
// }

// function setTokenSentToServer(currentToken) {
//   window.localStorage.setItem(
//     "sentFirebaseMessagingToken",
//     currentToken ? currentToken : ""
//   );
// }
