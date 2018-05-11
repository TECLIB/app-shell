import publicURL from './publicURL'

export default function (title, body, icon = `${publicURL}/images/dashboard.png`) {
  if (Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(() => {
      Notification(title, { body, icon })
    })
  }
}
