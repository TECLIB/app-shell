/** @module validateDate */

/**
 * Validate date between a range
 * @param {date} value date to validate
 * @param {date} min date
 * @param {date} max date
 * @returns {string} valid date between a range
 */
export default (value, min, max) => {
  if (value instanceof Date && min instanceof Date && max instanceof Date) {
    value.setHours(0)
    min.setHours(0)
    max.setHours(1)
    return (value.getTime() >= min && value.getTime() <= max)
  }
  return false
}
