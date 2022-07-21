let cacheData = 'appV1'

// this(self) : our application
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        '/_next/static/chunks/main.js?ts=1657815870186',
        '/_next/static/chunks/react-refresh.js?ts=1657815870186',
        '/_next/static/chunks/pages/_app.js?ts=1657815870186',
        '/_next/static/chunks/pages/dm/%5BrecipientWalletAddr%5D.js?ts=1657815870186',
        '/_next/static/development/_buildManifest.js?ts=1657815870186',
        '/_next/static/development/_ssgManifest.js?ts=1657815870186',
        '/_next/static/development/_middlewareManifest.js?ts=1657815870186',
        '/_next/static/chunks/components_App_tsx.js',
        '/_next/static/chunks/webpack.js?ts=1657815870186',
        '/dm/0xBd5eA05df1B004129B19f98580aE346ba20d3876',
        '/',
      ])
    })
  )
})

this.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((res) => {
        if (res) {
          return res
        }
        let requestUrl = event.request.clone()
        return fetch(requestUrl)
      })
    )
  }
})

// this.addEventListener('message', (event) => {
//   event.waitUntil(
//     this.registration.showNotification('hello', {
//       body: 'hello form noti',
//       url: 'geetsfashionwear.herokuapp.com',
//     })
//   )
// })

self.addEventListener('message', (event) => {
  // console.log(event)
  this.registration.showNotification(event.data.msg, {
    body: `New message from ${event.data.id}`,
  })
})
