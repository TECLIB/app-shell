import getMode from '../index'

describe('getMode', () => {
  it('should return "small"', () => {
    window.innerWidth = 360
    expect(getMode()).toEqual('small')
  })

  it('should return "medium"', () => {
    window.innerWidth = 772
    expect(getMode()).toEqual('medium')
  })

  it('should return "large"', () => {
    window.innerWidth = 1024
    expect(getMode()).toEqual('large')
  })
})
