/** @module validateData */

/**
 * Validate data
 * @param {string} data to validate
 * @param {string} specialReturn set a return value other than an empty string
 * @returns {string} valid data
 */
export default (data, specialReturn) => {
  let value

  if (!data && (specialReturn || specialReturn === '')) value = specialReturn
  else if (!data && data !== 0) value = ''
  else value = data

  if (Array.isArray(value)) return value
  return value.toString()
}
