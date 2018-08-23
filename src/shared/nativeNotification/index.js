/** @module nativeNotification */
import logo from 'assets/images/logo.png'
/**
 * Get one new native notification
 * @param {string} title message for notification
 * @param {string} body message content for notification
 * @param {string} icon for notification
 * @returns {object} of native notification type
 */
export default function (title, body, icon = logo) {
  let newNotification = null
  if (Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(() => {
      newNotification = new Notification(title, {
        body,
        icon,
      })
    })
  }
  return newNotification
}
