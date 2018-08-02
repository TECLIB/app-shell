import I18n from 'shared/i18n'
import EmptyMessage from 'components/EmptyMessage'
import UsersContent from './components/UsersContent'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true,
    authenticate: true,
  },
  {
    path: '/:id',
    name: I18n.t('commons.selected'),
    component: UsersContent,
    exact: true,
    authenticate: true,
  },
]

export default routes
