/** @module updateObject */

/**
 * Update properties object
 * @param {object} oldObject old properties
 * @param {object} updatedProperties properties to update
 * @param {function} callback function
 */
export default (oldObject, updatedProperties, callback) => {
  if (callback) callback()
  return {
    ...oldObject,
    ...updatedProperties,
  }
}
