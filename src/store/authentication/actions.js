import * as actionTypes from './actionTypes'
import config from '../../config/config.json'
import { uiTransactionFinish, uiTransactionStart } from '../ui/actions'

// Actions

export const changeNotificationMessage = notification => {
  return {
    type: actionTypes.CHANGE_NOTIFICATION_MESSAGE,
    notification
  }
}

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = history => {
  return {
    type: actionTypes.LOGOUT,
    history
  }
}

export const authRefreshCaptcha = ({ idCaptcha, imgCaptcha, configurationPassword }) => {
  return {
    type: actionTypes.AUTH_REFRESH_CAPTCHA,
    captcha: {
      id: idCaptcha,
      img: imgCaptcha
    },
    configurationPassword: configurationPassword
  }
}

export function changePasswordConfiguration(newConfiguration) {
  return {
    type: actionTypes.CHANGE_PASSWORD_CONFIGURATION,
    newConfiguration
  }
}

// Actions Creators

/**
 * Fetch and Sign In a User with credentials
 * @param {String} username 
 * @param {String} password 
 */
export const fetchSignIn = (username, password) => {
  return dispatch => {
    dispatch(uiTransactionStart())
  
    const user = {
      id: 1,
      name: 'User App',
      email: 'user@teclib.com',
      picture: null
    }

    localStorage.setItem('sessionToken', 'token')
    localStorage.setItem('currentUser', JSON.stringify(user))

    dispatch(uiTransactionFinish())
    dispatch(authSuccess(user))
    dispatch(changeNotificationMessage({
      title: config.appName,
      body: 'Welcome!',
      type: 'success'
    }))
  }
}
