import history from 'shared/history'
import logout from '../index'

describe('logout', () => {
  beforeEach(() => {
    localStorage.setItem('currentUser', 'my user data')
    localStorage.setItem('sessionToken', '12345678')
    sinon.stub(history, 'push').returns({})
  })

  afterEach(() => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('sessionToken')
    history.push.restore()
  })

  it('should close the session', async () => {
    logout()
    expect(localStorage.getItem('currentUser')).toBeUndefined()
    expect(localStorage.getItem('sessionToken')).toBeUndefined()
    expect(history.push.called).toEqual(true)
  })
})
