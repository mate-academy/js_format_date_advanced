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
  // write code here
  const dateArray = date.match(/\d+/gi);
  const cloneFromFormat = [...fromFormat];
  const toFormatSeparator = toFormat[toFormat.length - 1];
  let cloneToFormat = [...toFormat];
  const dateFormatStorage = {};

  cloneFromFormat.length = cloneFromFormat.length - 1;
  cloneToFormat.length = cloneToFormat.length - 1;

  let indYear = 0;

  cloneFromFormat.map((ell, i) => {
    if (ell === 'YY' || ell === 'YYYY') {
      indYear += i;
    }
    dateFormatStorage[ell] = dateArray[i];
  });

  let newData = dateArray[indYear].slice(-2);

  if (dateArray[indYear].length === 2) {
    newData = dateArray[indYear] < 30
      ? '20' + dateArray[indYear]
      : '19' + dateArray[indYear];
  }

  cloneToFormat = cloneToFormat.map(ell => {
    if (dateFormatStorage[ell] === undefined) {
      return newData;
    }

    return dateFormatStorage[ell];
  });

  const newFormat = cloneToFormat.join(`${toFormatSeparator}`);

  return newFormat;
}
module.exports = formatDate;
