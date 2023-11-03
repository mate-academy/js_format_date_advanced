'use strict';

describe('formatDate', () => {
  const formatDate = require('./formatDate');

  it(`should be declared`, () => {
    expect(formatDate).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = formatDate(
      '2012-12-21',
      ['YYYY', 'MM', 'DD', '-'],
      ['DD', 'MM', 'YY', '/']
    );

    expect(typeof result).toBe('string');
  });

  describe('should return correct date', () => {
    it(`for a new separator`, () => {
      const result = formatDate(
        '2012-12-21',
        ['YYYY', 'MM', 'DD', '-'],
        ['YYYY', 'MM', 'DD', '.']
      );

      expect(result).toBe('2012.12.21');
    });

    it(`for parts in different order`, () => {
      const result = formatDate(
        '2012-12-21',
        ['YYYY', 'MM', 'DD', '-'],
        ['DD', 'MM', 'YYYY', '-']
      );

      expect(result).toBe('21-12-2012');
    });

    it(`for different separator and parts order`, () => {
      const result = formatDate(
        '2012-12-21',
        ['YYYY', 'MM', 'DD', '-'],
        ['DD', 'MM', 'YYYY', '-']
      );

      expect(result).toBe('21-12-2012');
    });

    it(`for non standard parts order '12-2012-21'
         from ['MM', 'YYYY', 'DD', '-']
         to ['DD', 'MM', 'YYYY', '-']`, () => {
      const result = formatDate(
        '12-2012-21',
        ['MM', 'YYYY', 'DD', '-'],
        ['DD', 'MM', 'YYYY', '-']
      );

      expect(result).toBe('21-12-2012');
    });

    it(`if we shorten YYYY to YY`, () => {
      const result = formatDate(
        '10/22/1979',
        ['MM', 'DD', 'YYYY', '/'],
        ['MM', 'DD', 'YY', '/']
      );

      expect(result).toBe('10/22/79');
    });

    it(`if we extend YY < 30 to YYYY`, () => {
      const result = formatDate(
        '20/02/18',
        ['YY', 'MM', 'DD', '/'],
        ['YYYY', 'MM', 'DD', '-']
      );

      expect(result).toBe('2020-02-18');
    });

    it(`if we extend YY = 00 to YYYY`, () => {
      const result = formatDate(
        '00.02.18',
        ['YY', 'MM', 'DD', '.'],
        ['YYYY', 'MM', 'DD', '.']
      );

      expect(result).toBe('2000.02.18');
    });

    it(`if we extend YY = 30 to YYYY`, () => {
      const result = formatDate(
        '30.02.18',
        ['YY', 'MM', 'DD', '.'],
        ['YYYY', 'MM', 'DD', '.']
      );

      expect(result).toBe('1930.02.18');
    });

    it(`if we extend YY > 30 to YYYY`, () => {
      const result = formatDate(
        '97/02/18',
        ['YY', 'MM', 'DD', '/'],
        ['YYYY', 'MM', 'DD', '/']
      );

      expect(result).toBe('1997/02/18');
    });
  });
});
