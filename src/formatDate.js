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
  const toObject = {};
  const fromObject = {};
  const formatedDate = date.split(fromFormat[3]);
  const formatArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    fromObject[fromFormat[i]] = formatedDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    toObject[toFormat[i]] = '0';
  }

  toObject.MM = fromObject.MM;
  toObject.DD = fromObject.DD;

  if (fromObject.YYYY
    && fromObject.YYYY.length === 4
    && toObject.YYYY === '0') {
    toObject.YYYY = fromObject.YYYY;
  }

  if (fromObject.YY && fromObject.YY.length === 2 && toObject.YYYY === '0') {
    if (+fromObject.YY < 22) {
      toObject.YYYY = '20' + fromObject.YY;
    }

    if (+fromObject.YY > 23) {
      toObject.YYYY = '19' + fromObject.YY;
    }
  }

  if (fromObject.YYYY && fromObject.YYYY.length === 4 && toObject.YY === '0') {
    toObject.YY = fromObject.YYYY.slice(-2);
  }

  for (const key in toObject) {
    formatArray.push(toObject[key]);
  }

  return (formatArray.join(toFormat[3]).trim());
}
module.exports = formatDate;
