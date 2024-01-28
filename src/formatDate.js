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
  const DATES = date.split(fromFormat[fromFormat.length - 1]);

  let year = 0;
  let month = 0;
  let day = 0;
  const result = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        year = DATES[i] * 1;
        break;
      case 'YYYY':
        year = DATES[i] * 1;
        break;
      case 'DD':
        day = DATES[i];
        break;
      case 'MM':
        month = DATES[i];
        break;
    }
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    year %= 100;
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
        result.push(year);
        break;
      case 'YYYY':
        if (fromFormat.includes('YY')) {
          if (year < 30) {
            year += 2000;
          } else {
            year += 1900;
          }
        }
        result.push(year);
        break;
      case 'DD':
        result.push(day);
        break;
      case 'MM':
        result.push(month);
        break;
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}
module.exports = formatDate;
