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
  let targetDate = '';

  const [param1, param2, param3, separator] = fromFormat;
  const [val1, val2, val3] = date.split(separator);

  const sourceDate = {};

  sourceDate[param1] = val1;
  sourceDate[param2] = val2;
  sourceDate[param3] = val3;

  if (Object.keys(sourceDate).includes('YYYY')) {
    sourceDate['YY'] = +sourceDate['YYYY'] % 100;
  } else if (Object.keys(sourceDate).includes('YY')) {
    sourceDate['YYYY'] = (
      +sourceDate['YY'] < 30)
      ? 2000 + +sourceDate['YY']
      : 1900 + +sourceDate['YY'];
  }

  for (let i = 0; i <= toFormat.length - 2; i++) {
    targetDate += sourceDate[toFormat[i]];

    if (i < 2) {
      targetDate += toFormat[3];
    }
  }

  return targetDate;
}

module.exports = formatDate;
