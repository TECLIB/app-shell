/** @module calc100PercentMinus */

/**
 * Calculate the width of a element
 * @param {string} n count pixeles
 * @returns {string} count pixeles
 */
export default function calc100PercentMinus(n) {
  return n === '0'
    ? '100%'
    : `calc(100% - ${n}px)`
}
