import publicURL from 'shared/publicURL'
import SignIn from 'containers/SignIn'
import SignUp from 'containers/SignUp'
import asyncAdminApp from 'async/asyncAdminApp'

const routes = [
  {
    path: `${publicURL}/`,
    component: SignIn,
    exact: true,
    authenticate: false,
  },
  {
    path: `${publicURL}/SignUp`,
    component: SignUp,
    exact: true,
    authenticate: false,
  },
  {
    path: `${publicURL}/app`,
    component: asyncAdminApp,
    exact: false,
    authenticate: true,
  },
]

export default routes
