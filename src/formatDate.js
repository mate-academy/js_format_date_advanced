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
  const fromDate = date.split(fromFormat[3]);
  const dates = {};

  if (fromFormat[0] === 'YY'
  && (toFormat[0] === 'YYYY' || toFormat[2] === 'YYYY')) {
    if (fromDate[0].toString() < 30) {
      fromDate[0] = '20' + fromDate[0];
    } else {
      fromDate[0] = '19' + fromDate[0];
    }
    fromFormat[0] = 'YYYY';
  }

  if (fromFormat[2] === 'YY'
  && (toFormat[0] === 'YYYY' || toFormat[2] === 'YYYY')) {
    if (fromDate[0].toString() > 31) {
      fromDate[2] = '19' + fromDate[2];
    } else {
      fromDate[2] = '20' + fromDate[2];
    }
    fromFormat[2] = 'YYYY';
  }

  if (fromFormat[0] === 'YYYY'
  && (toFormat[0] === 'YY' || toFormat[2] === 'YY')) {
    fromDate[0] = fromDate[0].slice(-2);
    fromFormat[0] = 'YY';
  }

  if (fromFormat[2] === 'YYYY'
  && (toFormat[0] === 'YY' || toFormat[2] === 'YY')) {
    fromDate[2] = fromDate[2].slice(-2);
    fromFormat[2] = 'YY';
  }

  for (let i = 0; i < 3; i++) {
    dates[fromFormat[i]] = fromDate[i];
  }

  const toArray = [];

  for (let j = 0; j < 3; j++) {
    toArray[j] = dates[toFormat[j]];
  }

  const result = toArray.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
