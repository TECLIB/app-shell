/** @module validateNotification */

/**
 * Validate notification type
 * @returns {object} if the notification should be shown and type
 */
export default () => {
  let show = localStorage.getItem('showNotifications') ? (localStorage.getItem('showNotifications') === 'true')
    : undefined
  let type = localStorage.getItem('notificationType')

  if (!show && show !== false) {
    localStorage.setItem('showNotifications', 'true')
    show = true
  }

  if (!type) {
    localStorage.setItem('notificationType', 'Toast')
    type = 'Toast'
  }

  return {
    show,
    type,
  }
}
