/** import dependencies */
import EmptyMessage from 'components/EmptyMessage'
import Overview from './components/Overview'

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
{
  path: '/overview',
  name: 'about.overview.title',
  component: Overview,
  exact: true,
},
]

export default routes
