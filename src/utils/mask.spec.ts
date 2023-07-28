import { maskDate, maskPhone, maskPrice, maskTime } from "./mask"

describe("Utils: mask", () => {
  it('should be apply a date mask to a string of numbers', () => {
    const mask = maskDate('28');
    const mask2 = maskDate('2804');
    const mask3 = maskDate('28072029');

    expect(mask).toBe('28');
    expect(mask2).toBe('28/04');
    expect(mask3).toBe('28/07/2029');
  })

  it('should be apply a time mask to a string of numbers', () => {
    const mask = maskTime('10');
    const mask2 = maskTime('1047');

    expect(mask).toBe('10');
    expect(mask2).toBe('10:47');
  })

  it('should be apply a phone mask to a string of numbers', () => {
    const mask = maskPhone('')
    const mask2 = maskPhone('85');
    const mask3 = maskPhone('85999');
    const mask4 = maskPhone('85999999990');
  
    expect(mask).toBe('');
    expect(mask2).toBe('(85');
    expect(mask3).toBe('(85) 999');
    expect(mask4).toBe('(85) 99999-9990');
  })

  it('should be apply a price mask to a string of numbers', () => {
    const mask = maskPrice('1234')
    const mask2 = maskPrice('100000');

    expect(mask).toBe('12,34')
    expect(mask2).toBe('1.000,00')
  })
})