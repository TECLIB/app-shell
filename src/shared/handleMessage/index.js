/** @module handleMessage */

/** import dependencies */
import I18n from 'shared/i18n'
import logout from 'shared/logout'
import history from 'shared/history'
import publicURL from 'shared/publicURL'

function errorRoute(pathname, customErrorRoute) {
  if (customErrorRoute) {
    return customErrorRoute
  }
  let path
  if (publicURL !== '') {
    path = pathname.split(publicURL)[1].split('/')
  } else {
    path = pathname.split('/')
  }
  if (path[1] === 'app') {
    return `${publicURL}/app/${path[2]}/error`
  }
  if (!path[1] || path[1] === '') {
    return `${publicURL}/error`
  }
  return `${publicURL}/${path[1]}/error`
}

function pushError(pathname, code, customErrorRoute) {
  history.push(`${errorRoute(pathname, customErrorRoute)}?code=${code}`)
}

/**
 * Add format to error message
 * @param {string} type of message
 * @param {string} message content
 * @param {string} title of message
 * @returns {string} Get error message
 */
export default ({
  type = 'info',
  message,
  title,
  customErrorRoute,
  displayErrorPage = true,
}) => {
  const response = {
    type,
    title: (title || I18n.t(`commons.${(type !== 'alert') ? type : 'error'}`)),
    body: message ? (typeof message === 'string' || message instanceof String) ? message : message.statusText : '',
  }
  if (message) {
    switch (true) {
      case (message.status === 0):
        response.body = I18n.t('notifications.no_internet_connection')
        break
      case (message.status === 401):
        response.body = message.data[0][1] !== '' ? message.data[0][1] : message.statusText
        if (message.data[0][1] === 'session_token seems invalid') {
          logout()
        }
        break
      case (message.status === 404):
        response.body = message.data[0][1] !== '' ? message.data[0][1] : message.statusText
        break
      case (message.status >= 400 && message.status < 500):
        response.body = message.data[0][1]
          ? Array.isArray(message.data[1])
            ? message.data[1][0]
              ? message.data[1][0].message
              : message.statusText
            : message.data[0][1]
          : message.statusText
        if (displayErrorPage) {
          pushError(history.location.pathname, message.status, customErrorRoute)
        }
        break
      default:
        break
    }
  }
  return response
}
