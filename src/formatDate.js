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
  const result = Array(3);
  const splitedDate = date.split(fromFormat[3]);

  let oldFormatYearIndex = fromFormat.indexOf('YY');
  let newFormatYearIndex = toFormat.indexOf('YY');

  if (oldFormatYearIndex === -1) {
    oldFormatYearIndex = fromFormat.indexOf('YYYY');
  }

  if (newFormatYearIndex === -1) {
    newFormatYearIndex = toFormat.indexOf('YYYY');
  }

  result[newFormatYearIndex] = splitedDate[oldFormatYearIndex];
  result[toFormat.indexOf('MM')] = splitedDate[fromFormat.indexOf('MM')];
  result[toFormat.indexOf('DD')] = splitedDate[fromFormat.indexOf('DD')];

  if (toFormat.includes('YY')) {
    result[newFormatYearIndex] = splitedDate[oldFormatYearIndex].slice(-2);
  } else if (fromFormat.includes('YY')) {
    if (splitedDate[oldFormatYearIndex] < 30) {
      result[newFormatYearIndex] = +(splitedDate[oldFormatYearIndex]) + 2000;
    } else {
      result[newFormatYearIndex] = +(splitedDate[oldFormatYearIndex]) + 1900;
    }
  }

  const newFormatDate = result.join(toFormat[3]);

  return newFormatDate;
}

module.exports = formatDate;
