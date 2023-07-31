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
  const arrayWithDate = date.split(fromFormat[3]);
  const objWithDate = {};
  const result = [];
  const indexOfOldFormatYear = fromFormat.indexOf('YY') === -1
    ? fromFormat.indexOf('YYYY') : fromFormat.indexOf('YY');
  const indexOfNewFormatYear = toFormat.indexOf('YY') === -1
    ? toFormat.indexOf('YYYY') : toFormat.indexOf('YY');

  for (let i = 0; i < arrayWithDate.length; i++) {
    objWithDate[fromFormat[i]] = arrayWithDate[i];
  }

  for (const dateEl of toFormat.slice(0, -1)) {
    result.push(objWithDate[dateEl]);
  }

  handlerYears(fromFormat[indexOfOldFormatYear],
    toFormat[indexOfNewFormatYear],
    arrayWithDate[indexOfNewFormatYear]);

  function handlerYears(from, to, year) {
    if (from.length > to.length) {
      result[indexOfNewFormatYear] = year.slice(2);
    } else if (to.length > from.length && +year >= 30) {
      result[indexOfNewFormatYear] = '19' + year;
    } else if (to.length > from.length && +year < 30) {
      result[indexOfNewFormatYear] = '20' + year;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
