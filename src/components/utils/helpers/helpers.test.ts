import { formatNumbersToPrettyStyle, formatNumberToPrice, setMaxValue } from './helpers';

describe('helper utils', () => {
  describe('setMaxValue', () => {
    test('The expected value must be less than the initial value', () => {
      expect(setMaxValue(100, 1)).toEqual({ isBigger: true, value: 9 });
    });
    test('The expected value must be equal to initial value', () => {
      expect(setMaxValue(100, 4)).toEqual({ isBigger: false, value: 100 });
    });
  });

  describe('formatNumberToPrice', () => {
    test('Correct value', () => {
      expect(formatNumberToPrice(1)).toBe('1,00 $');
    });
    test('Value less than 0', () => {
      expect(formatNumberToPrice(-1)).toBe('-1,00 $');
    });
    test('The length of the fraction part must be equal to 2', () => {
      expect(formatNumberToPrice(0.123456)).toBe('0,12 $');
    });
    test('The length of the fraction part must be equal to 5', () => {
      expect(formatNumberToPrice(0.123450, 13, 5)).toBe('0,12345 $');
    });
    test('Value must be rounded up in the fraction part', () => {
      expect(formatNumberToPrice(0.123456, 13, 5)).toBe('0,12346 $');
    });
    test('The value with decimal part equal to 5 must be cut off', () => {
      expect(formatNumberToPrice(1234567, 5)).toBe('+99 999,00 $');
    });
    test('Fraction part must be equal to 5', () => {
      expect(formatNumberToPrice(0.008459128)).toBe('0,00846 $');
    });
  });

  describe('formatNumbersToPrettyStyle', () => {
    test('The value must be in prettier form', () => {
      expect(formatNumbersToPrettyStyle(1000)).toBe('1 000');
    });
    test('The empty fractional part must be removed', () => {
      expect(formatNumbersToPrettyStyle(-1.9900, 4)).toBe('-1,99');
    });
    test('The length of the fraction part must be equal to 2', () => {
      expect(formatNumbersToPrettyStyle(0.123456)).toBe('0,12');
    });
    test('The length of the fraction part must be equal to 4', () => {
      expect(formatNumbersToPrettyStyle(0.123440, 4)).toBe('0,1234');
    });
    test('Value must be rounded up in the fraction part', () => {
      expect(formatNumbersToPrettyStyle(0.123456, 4)).toBe('0,1235');
    });
    test('The value with decimal part equal to 5 must be cut off', () => {
      expect(formatNumbersToPrettyStyle(1234567, 2, 5)).toBe('+99 999');
    });
  });
});
