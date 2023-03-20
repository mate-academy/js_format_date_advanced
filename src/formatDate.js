'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const symbols = fromFormat.slice(0, 3);
  const separator = fromFormat.slice(-1).toString();
  const givenDate = date.split(separator);

  const finalDate = toFormat.slice(0, 3);
  const expectedSeparator = toFormat.slice(-1).toString();

  let year, month, day;

  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i] === 'YY' || symbols[i] === 'YYYY') {
      year = givenDate[i];

      if (year.length < 4) {
        year = +year < 30
          ? `20${year}`
          : `19${year}`;
      }
      continue;
    }

    if (symbols[i] === 'MM') {
      month = givenDate[i];
      continue;
    }

    if (symbols[i] === 'DD') {
      day = givenDate[i];
      continue;
    }
  }

  const result = [];

  for (let i = 0; i < finalDate.length; i++) {
    if (finalDate[i] === 'DD') {
      result.push(day);
      continue;
    }

    if (finalDate[i] === 'MM') {
      result.push(month);
      continue;
    }

    if (finalDate[i] === 'YYYY') {
      result.push(year);
      continue;
    }

    if (finalDate[i] === 'YY') {
      result.push(year.slice(-2));
      continue;
    }
  }

  return result.join(expectedSeparator).toString();
}

module.exports = formatDate;
