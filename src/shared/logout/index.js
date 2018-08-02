/** @module logout */

/** import dependencies */
import history from 'shared/history'
import publicURL from 'shared/publicURL'

/**  Export fuction to logout user */
export default () => {
  /** Remove current user and session token from local store */
  localStorage.removeItem('currentUser')
  localStorage.removeItem('sessionToken')
  /** go to URL base */
  history.push(`${publicURL}/`)
}
