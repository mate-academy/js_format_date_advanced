'use strict';

describe('formatDate', () => {
  const formatDate = require('./formatDate');
  const result = formatDate(
    '2012-12-21',
    ['YYYY', 'MM', 'DD', '-'],
    ['DD', 'MM', 'YY', '/'],
  );
  const result2 = formatDate(
    '10/22/1979',
    ['MM', 'DD', 'YYYY', '/'],
    ['DD', 'MM', 'YY', '.'],
  );
  const result3 = formatDate(
    '11.12.1999',
    ['DD', 'MM', 'YYYY', '.'],
    ['MM', 'DD', 'YYYY', '-'],
  );

  const result4 = formatDate(
    '97/02/18',
    ['YY', 'MM', 'DD', '/'],
    ['DD', 'MM', 'YYYY', ' ']
  );

  const result5 = formatDate(
    '14/13/08',
    ['YY', 'DD', 'MM', '/'],
    ['MM', 'YYYY', 'DD', '_']
  );

  const result6 = formatDate(
    '27/12/09',
    ['DD', 'MM', 'YY', '/'],
    ['YYYY', 'MM', 'DD', '.']
  );

  it(`Function 'formatDate' should be declared`, () => {
    expect(formatDate).toBeInstanceOf(Function);
  });

  it(`Function 'formatDate' should return a string`, () => {
    expect(typeof result).toBe('string');
  });

  it(`Function 'formatDate' should return date in 'toFormat' format`, () => {
    expect(result).toBe('21/12/12');
  });

  it(`Function 'formatDate' should return date in 'toFormat' format`, () => {
    expect(result2).toBe('22.10.79');
  });

  it(`Function 'formatDate' should return date in 'toFormat' format`, () => {
    expect(result3).toBe('12-11-1999');
  });

  it(`Function 'formatDate' should return date in 'toFormat' format`, () => {
    expect(result4).toBe('18 02 1997');
  });

  it(`Function 'formatDate' should return date in 'toFormat' format`, () => {
    expect(result5).toBe('08_2014_13');
  });

  it(`Function 'formatDate' should return date in 'toFormat' format`, () => {
    expect(result6).toBe('2009.12.27');
  });
});
