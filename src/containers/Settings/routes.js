/** import dependencies */
import EmptyMessage from 'components/EmptyMessage'
import Notifications from './components/Notifications'
import Display from './components/Display'

/**
 * Represents all private routes from Settings
 * @constant routes
 * @type {Array}
 */
const routes = [{
  path: '/',
  name: 'commons.no_selection',
  component: EmptyMessage,
  exact: true,
},
{
  path: '/notifications',
  name: 'commons.notifications',
  component: Notifications,
  exact: false,
},
{
  path: '/display',
  name: 'commons.display',
  component: Display,
  exact: false,
},
]

export default routes
