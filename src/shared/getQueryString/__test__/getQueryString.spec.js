import getQueryString from '../index'

describe('getQueryString', () => {
  it('should get QueryString', () => {
    const history = {
      location: {
        search: '?x1=23&x2=test',
      },
    }
    expect(getQueryString(history)).toEqual({ x1: '23', x2: 'test' })
  })
})
