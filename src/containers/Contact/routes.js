import I18n from 'shared/i18n'
import EmptyMessage from 'components/EmptyMessage'

const routes = [
  {
    path: '/',
    name: I18n.t('commons.no_selection'),
    component: EmptyMessage,
    exact: true,
    authenticate: true,
  },
]

export default routes
