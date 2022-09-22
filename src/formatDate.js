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
  const temp = [];
  const result = [];

  if (fromFormat.includes('YY')) {
    temp[0] = date.split(fromFormat[3])[fromFormat.indexOf('YY')];

    if (Number(temp[0]) >= 30) {
      temp[0] = '19' + temp[0];
    } else {
      temp[0] = '20' + temp[0];
    }
  }

  if (fromFormat.includes('YYYY')) {
    temp[0] = date.split(fromFormat[3])[fromFormat.indexOf('YYYY')];
  }

  temp[1] = date.split(fromFormat[3])[fromFormat.indexOf('MM')];
  temp[2] = date.split(fromFormat[3])[fromFormat.indexOf('DD')];

  if (toFormat.includes('YY')) {
    temp[0] = temp[0][2] + temp[0][3];
  }

  if (toFormat.includes('YY')) {
    result[toFormat.indexOf('YY')] = temp[0];
  }

  if (toFormat.includes('YYYY')) {
    result[toFormat.indexOf('YYYY')] = temp[0];
  }

  result[toFormat.indexOf('MM')] = temp[1];
  result[toFormat.indexOf('DD')] = temp[2];

  return result.join(toFormat[3]);
}

module.exports = formatDate;
