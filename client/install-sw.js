/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // const currentWorkerUrl = '/sw.js'
    const currentWorkerUrl = '/firebase-messaging-sw.js'

    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        if (registration.active !== null && registration.active.scriptURL !== currentWorkerUrl) {
          registration.unregister()
        }
      }
      if (window.location.host.indexOf('www') < 0) {
        navigator.serviceWorker.register(currentWorkerUrl, {
          updateViaCache: 'none',
          scope: '/'
        })
        navigator.serviceWorker.ready.then((registration) => {
          console.log('Service worker successfully registered on scope', registration.scope)
        })
      }
    })
  })
}

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/firebase-messaging-sw.js')
//     .then((registration) => {
//       // eslint-disable-next-line no-console
//       console.log('[SW]: SCOPE: ', registration.scope)
//       return registration.scope
//     })
//     .catch((err) => {
//       return err
//     })
// }
