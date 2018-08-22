import I18n from 'shared/i18n'
import Home from 'containers/Home'
import Contact from 'containers/Contact'
import Settings from 'containers/Settings'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.home'),
    component: Home,
    exact: true,
    authenticate: true,
  },
  {
    path: '/contacts',
    name: I18n.t('commons.contacts'),
    component: Contact,
    exact: false,
    authenticate: true,
  },
  {
    path: '/settings',
    name: I18n.t('commons.settings'),
    component: Settings,
    exact: false,
  },
]

export default routes
