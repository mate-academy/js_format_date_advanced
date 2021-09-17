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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const arr = date.split(fromSeparator);
  const obj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    obj[fromFormat[i]] = arr[i];
  }

  for (let j = 0; j < toFormat.length - 1; j++) {
    if (toFormat[j] === 'YYYY') {
      toFormat[j] = 'YY';
      toFormat[j] = obj[toFormat[j]];

      if (toFormat[j]) {
        if (toFormat[j] < 30) {
          toFormat[j] = '20' + toFormat[j];
        } else {
          toFormat[j] = '19' + toFormat[j];
        }
      } else {
        toFormat[j] = 'YYYY';
        toFormat[j] = obj[toFormat[j]];
      }
    } else if (toFormat[j] === 'YY') {
      toFormat[j] = 'YYYY';
      toFormat[j] = obj[toFormat[j]].slice(2);
    } else {
      toFormat[j] = obj[toFormat[j]];
    }
  }
  toFormat.length = toFormat.length - 1;

  return toFormat.join(toSeparator);
}

module.exports = formatDate;
