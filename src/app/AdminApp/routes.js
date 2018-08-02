import I18n from 'shared/i18n'
import Home from 'containers/Home'
import Users from 'containers/Users'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.home'),
    component: Home,
    exact: true,
    authenticate: true,
  },
  {
    path: '/users',
    name: I18n.t('commons.users'),
    component: Users,
    exact: false,
    authenticate: true,
  },
]

export default routes
