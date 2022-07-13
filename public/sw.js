// let cacheData = 'appv1'
this.addEventListener('fetch', (event) => {
  event.waitUntil(
    this.registration.showNotification('hello', {
      body: 'hello form noti',
      url: 'geetsfashionwear.herokuapp.com',
    })
  )
})
