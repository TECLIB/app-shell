/** import dependencies */
import withAsyncComponent from 'hoc/withAsyncComponent'

/**
 * Calls asynchronous ForgotPassword component
 * @constant
 * @type {component}
 */
const asyncForgotPassword = withAsyncComponent(() => import('../containers/ForgotPassword'))

export default asyncForgotPassword
