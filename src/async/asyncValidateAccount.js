/** import dependencies */
import withAsyncComponent from 'hoc/withAsyncComponent'

/**
 * Calls asynchronous ValidateAccount component
 * @constant
 * @type {component}
 */
const asyncValidateAccount = withAsyncComponent(() => import('../components/ValidateAccount'))

export default asyncValidateAccount
