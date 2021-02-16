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
  const splittedData = date.split(fromFormat[3]);
  const arrayFrom = [[fromFormat[0], splittedData[0]],
    /*             */[fromFormat[1], splittedData[1]],
    /*             */[fromFormat[2], splittedData[2]]];

  const formatted = {};

  formatted[arrayFrom[0][0]] = arrayFrom[0][1];
  formatted[arrayFrom[1][0]] = arrayFrom[1][1];
  formatted[arrayFrom[2][0]] = arrayFrom[2][1];

  if (toFormat.indexOf('YY') >= 0 && formatted['YYYY']) {
    formatted['YY'] = formatted['YYYY'].substring(2, 4);
  }

  if (toFormat.indexOf('YYYY') >= 0 && formatted['YY']) {
    if (Number(formatted['YY']) < 30) {
      formatted['YYYY'] = '20' + formatted['YY'];
    } else {
      formatted['YYYY'] = '19' + formatted['YY'];
    }
  }

  return `${formatted[toFormat[0]]}${toFormat[3]}`
  + `${formatted[toFormat[1]]}${toFormat[3]}${formatted[toFormat[2]]}`;
}

module.exports = formatDate;
