import validateDate from '../index'

describe('validateDate', () => {
  it('should validate if a date is within the range', () => {
    expect(validateDate(new Date('1-1-2018'), new Date('1-1-2018'), new Date('1-1-2018')))
      .toEqual(true)
  })
  it('should validate if a date is out the range', () => {
    expect(validateDate(new Date('1-3-2018'), new Date('1-4-2018'), new Date('1-10-2018')))
      .toEqual(false)
  })
  it('should validate if a date is incorrect', () => {
    expect(validateDate('1-1-2018', new Date('1-1-2018'), new Date('1-1-2018'))).toEqual(false)
    expect(validateDate(new Date('1-1-2018'), '1-1-2018', new Date('1-1-2018'))).toEqual(false)
    expect(validateDate(new Date('1-1-2018'), new Date('1-1-2018'), '1-1-2018')).toEqual(false)
  })
})
