import updateObject from '../index'

describe('updateObject', () => {
  it('should update object', () => {
    expect(updateObject({
      a: 'A1',
      b: 'B1',
    }, {
      a: 'A2',
      c: 'C1',
    })).toEqual({
      a: 'A2',
      b: 'B1',
      c: 'C1',
    })
  })
})
