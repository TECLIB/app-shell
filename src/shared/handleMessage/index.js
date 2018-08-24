/*
 *  LICENSE
 *
 *  This file is part of app-shell
 *
 *  app-shell is a subproject of Teclib.
 *
 *  app-shell is free software: you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License
 *  as published by the Free Software Foundation; either version 3
 *  of the License, or (at your option) any later version.
 *
 *  app-shell is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  ------------------------------------------------------------------------------
 *  @author     Hector Rondon (hrondon@teclib.com)
 *  @copyright  Copyright © 2018 Teclib. All rights reserved.
 *  @license    GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 *  @link       https://github.com/TECLIB/app-shell
 *  @link       https://teclib.github.io/app-shell
 *  @link       https://teclib-edition.com/en
 *  ------------------------------------------------------------------------------
 */

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
