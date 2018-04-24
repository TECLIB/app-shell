import publicURL from '../../shared/publicURL'
import SignIn from '../../containers/SignIn'
import asyncAdminApp from '../../async/asyncAdminApp'

const routes = [
    {
        path: `${publicURL}/`,
        component: SignIn,
        exact: true,
        private: false
    },
    {
        path: `${publicURL}/app`,
        component: asyncAdminApp,
        exact: false,
        private: false
    }
]

export default routes