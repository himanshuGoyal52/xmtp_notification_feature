export const truncate = (
  str: string | undefined,
  length: number
): string | undefined => {
  if (!str) {
    return str
  }
  if (str.length > length) {
    return `${str.substring(0, length - 3)}...`
  }
  return str
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
function determineAppServerKey() {
  const vapidKey =
    'BLlXKf-Kf6hFXuveu4MxMvXs0A7vzbRvblMX3GIlo9h7XcQlrmZujaQeTi7rutJGcy3rpgk-dfLt7SvkA8FDiP8'
  return urlBase64ToUint8Array(vapidKey)
}

export const registerSW = () => {
  const swUrl = '/sw.js'
  navigator.serviceWorker.register(swUrl).then((res) => {
    return res.pushManager
      .getSubscription()
      .then(function (sub) {
        console.log(sub)
        return res.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: determineAppServerKey(),
        })
      })
      .catch((err) => console.error(err))
  })
}

export const formatDate = (d: Date | undefined): string =>
  d ? d.toLocaleDateString('en-US') : ''

export const formatTime = (d: Date | undefined): string =>
  d
    ? d.toLocaleTimeString(undefined, {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      })
    : ''
