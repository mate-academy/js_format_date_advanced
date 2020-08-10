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
});
