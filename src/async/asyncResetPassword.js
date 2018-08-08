/** import dependencies */
import withAsyncComponent from 'hoc/withAsyncComponent'

/**
 * Calls asynchronous ResetPassword component
 * @constant
 * @type {component}
 */
const asyncResetPassword = withAsyncComponent(() => import('../containers/ResetPassword'))

export default asyncResetPassword
