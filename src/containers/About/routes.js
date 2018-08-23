/** import dependencies */
import EmptyMessage from 'components/EmptyMessage'
import Overview from './components/Overview'
import Contact from './components/Contact'
import TermsOfUse from './components/TermsOfUse'
import Licence from './components/License'

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
{
  path: '/contact',
  name: 'about.contact.title',
  component: Contact,
  exact: true,
},
{
  path: '/term',
  name: 'about.term_of_use.title',
  component: TermsOfUse,
  exact: false,
},
{
  path: '/license',
  name: 'about.license.title',
  component: Licence,
  exact: false,
},
]

export default routes
