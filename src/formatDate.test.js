'use strict';

describe('formatDate', () => {
  const formatDate = require('./formatDate');

  it(`should be declared`, () => {
    expect(formatDate)
      .toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    const result = formatDate(
      '2012-12-21',
      ['YYYY', 'MM', 'DD', '-'],
      ['DD', 'MM', 'YY', '/'],
    );

    expect(typeof result)
      .toBe('string');
  });

  describe('should return correct date', () => {
    it(`for a new separator`, () => {
      const result = formatDate(
        '2012-12-21',
        ['YYYY', 'MM', 'DD', '-'],
        ['YYYY', 'MM', 'DD', '.'],
      );

      expect(result)
        .toBe('2012.12.21');
    });

    it(`for parts in different order`, () => {
      const result = formatDate(
        '2012-12-21',
        ['YYYY', 'MM', 'DD', '-'],
        ['DD', 'MM', 'YYYY', '-'],
      );

      expect(result)
        .toBe('21-12-2012');
    });

    it(`for different separator and parts order`, () => {
      const result = formatDate(
        '2012-12-21',
        ['YYYY', 'MM', 'DD', '-'],
        ['DD', 'MM', 'YYYY', '-'],
      );

      expect(result)
        .toBe('21-12-2012');
    });

    it(`if we shorten year from 4 digits to 2 digits`, () => {
      const result = formatDate(
        '10/22/1979',
        ['MM', 'DD', 'YYYY', '/'],
        ['MM', 'DD', 'YY', '/'],
      );

      expect(result)
        .toBe('22/10/79');
    });

    it(`Function 'formatDate' should return date in 'toFormat' format`, () => {
      const result4 = formatDate(
        '97/02/18',
        ['YY', 'MM', 'DD', '/'],
        ['DD', 'MM', 'YYYY', ' ']
      );

      expect(result4)
        .toBe('18 02 1997');
    });

    it(`Function 'formatDate' should return date in 'toFormat' format`, () => {
      const result5 = formatDate(
        '14/13/08',
        ['YY', 'DD', 'MM', '/'],
        ['MM', 'YYYY', 'DD', '_']
      );

      expect(result5)
        .toBe('08_2014_13');
    });

    it(`Function 'formatDate' should return date in 'toFormat' format`, () => {
      const result6 = formatDate(
        '27/12/09',
        ['DD', 'MM', 'YY', '/'],
        ['YYYY', 'MM', 'DD', '.']
      );

      expect(result6)
        .toBe('2009.12.27');
    });
  });
});
