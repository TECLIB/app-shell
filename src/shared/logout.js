import history from './history'
import publicURL from './publicURL'

export default () => {
  localStorage.removeItem('currentUser')
  localStorage.removeItem('sessionToken')
  history.push(`${publicURL}/`)
}