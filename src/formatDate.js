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

// formatDate(
//   '18-02-2015',
//   ['DD', 'MM', 'YYYY', '-'],
//   ['DD', 'MM', 'YY', '/'],
// );

// formatDate(
//   '98/02/18',
//   ['YY', 'MM', 'DD', '/'],
//   ['DD', 'MM', 'YYYY', '.'],
// );

function formatDate(date, fromFormat, toFormat) {
  const baseDate = {};

  const dateArray = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];
    const value = dateArray[i];

    baseDate[key] = value;
  }

  let century = '';

  if (baseDate.YY >= 30) {
    century = '19';
  } else {
    century = '20';
  }

  if (baseDate.hasOwnProperty('YY')) {
    baseDate['YYYY'] = century + baseDate.YY;
  }

  if (baseDate.hasOwnProperty('YYYY')) {
    baseDate['YY'] = baseDate.YYYY.slice(2);
  }

  let result = '';

  for (let i = 0; i < 3; i++) {
    for (const key in baseDate) {
      if (toFormat[i] === key) {
        result += baseDate[key] + toFormat[3];
      }
    }
  }

  return result.slice(0, -1);
}

module.exports = formatDate;
