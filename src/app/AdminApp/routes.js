import Home from '../../containers/Home'
import Users from '../../containers/Users'
import { I18n } from 'react-i18nify'

const routes = [
    {
        path: '/',
        name: I18n.t('commons.home'),
        component: Home,
        exact: true,
        authenticate: true
    }, 
    {
        path: '/users',
        name: I18n.t('commons.users'),
        component: Users,
        exact: false,
        authenticate: true
    }
]

export default routes