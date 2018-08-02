/** @module getMode */

/**
 * Get current size
 * @returns {string} the current size to string
 */
export default () => (
  window.innerWidth >= 1024 ? 'large'
    : window.innerWidth >= 772 ? 'medium'
      : 'small'
)
