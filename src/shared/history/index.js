/** @module history */

/** import dependencies */
import {
  createBrowserHistory as createHistory,
  createMemoryHistory,
} from 'history'

const history = function () {
  if (process.env.NODE_ENV !== 'test') {
    /** Get browser history */
    return createHistory()
  }
  return createMemoryHistory('/')
}

/** Export history object */
export default history()
