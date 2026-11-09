import mathHelper from './math';

describe('Math helper', () => {
  describe('randomIntFromInterval', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return the minimum when random is 0', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0);
      expect(mathHelper.randomIntFromInterval(3, 9)).toBe(3);
    });

    it('should return the maximum when random is just below 1', () => {
      jest.spyOn(Math, 'random').mockReturnValue(0.999999);
      expect(mathHelper.randomIntFromInterval(3, 9)).toBe(9);
    });
  });

  describe('convertBigNumberToReadable', () => {
    it.each([
      [2500000000, '2.50 B'],
      [1500000, '1.50 M'],
      ['12345', '12.35 K'],
      [-2000, '2.00 K'],
      [999, 999],
      [0, 0],
    ])('should convert %p to %p', (input, expected) => {
      expect(mathHelper.convertBigNumberToReadable(input)).toBe(expected);
    });
  });

  describe('getNumerWithNDecimals', () => {
    it('should round to 2 decimals by default', () => {
      expect(mathHelper.getNumerWithNDecimals(7.456)).toBe(7.46);
    });

    it('should round to the given decimals', () => {
      expect(mathHelper.getNumerWithNDecimals('7.84', 1)).toBe(7.8);
      expect(mathHelper.getNumerWithNDecimals(7.5, 0)).toBe(8);
    });
  });
});
