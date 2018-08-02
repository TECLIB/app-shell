/** @module publicURL */

/** Get path without URL base */
const path = () => {
  const location = document.createElement('a')
  location.href = process.env.PUBLIC_URL
  return (process.env.PUBLIC_URL !== '') ? location.pathname : ''
}

export default path()
