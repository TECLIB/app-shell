import getID from '../index'

describe('getID', () => {
  it('should get user id', () => {
    expect(getID('/app/users/34')).toEqual('34')
  })
})
