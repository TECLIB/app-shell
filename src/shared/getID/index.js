/** @module publicURL */

/** import dependencies */
import publicURL from 'shared/publicURL'

/**
 * Get element ID from URL
 * @param {string} path
 * @param {int} position
 */
export default (path, position = 3) => {
  let id
  if (publicURL !== '') {
    id = path.split(publicURL)[1].split('/')[position]
  } else id = path.split('/')[position]
  return id
}
