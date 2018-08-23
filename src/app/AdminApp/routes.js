import I18n from 'shared/i18n'
import Home from 'containers/Home'
import Contact from 'containers/Contact'
import Settings from 'containers/Settings'
import About from 'containers/About'

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
  {
    path: '/about',
    name: I18n.t('commons.about'),
    component: About,
    exact: false,
  },
]

export default routes
