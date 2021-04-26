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
  const separ = fromFormat[3];
  const dateArr = date.split(separ);
  const fromDate = fromFormat.slice(0, -1);
  const futureSepar = toFormat[3];
  const toDate = toFormat.slice(0, -1);
  const result = [];

  for (let i = 0; i < fromDate.length; i++) {
    for (let j = 0; j < toDate.length; j++) {
      if (fromDate[i] === 'YY' && toDate[j] === 'YYYY') {
        result[j] = +dateArr[i] >= 30 ? '19' + dateArr[i] : '20' + dateArr[i];
      }

      if (fromDate[i] === 'YYYY' && toDate[j] === 'YY') {
        result[j] = dateArr[i].split('').slice(-2).join('');
      }

      if (fromDate[i] === toDate[j]) {
        result[j] = dateArr[i];
      }
    }
  }

  return result.join(futureSepar);
}

module.exports = formatDate;
