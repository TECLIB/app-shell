/** import dependencies */
import EmptyMessage from 'components/EmptyMessage'

/**
 * Represents all private routes from About
 * @constant
 * @type {Array}
 */
const routes = [{
  path: '/',
  name: 'commons.no_selection',
  component: EmptyMessage,
  exact: true,
},
]

export default routes
