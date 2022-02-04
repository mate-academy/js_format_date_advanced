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
//  * @param {string} date
//  * @param {string[]} fromFormat
//  * @param {string[]} toFormat
//  *
//  * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const arrDate = date.split(separator);
  const objDate = {};
  let res = '';

  for (let i = 0; i < fromFormat.length; i++) {
    objDate[fromFormat[i]] = arrDate[i];

    const objNewDate = {};

    for (const key of toFormat) {
      objNewDate[key] = objDate[key];

      if (key === 'YY') {
        objNewDate[key] = (objDate.YYYY / 100).toString().split('.')[1];
      }

      if (key === 'YYYY' && objNewDate.YYYY === undefined) {
        if (objDate.YY < 30) {
          objNewDate[key] = 2000 + +(objDate.YY);
        }

        if (objDate.YY >= 30) {
          objNewDate[key] = 1900 + +(objDate.YY);
        }
      }
    }
    res = Object.values(objNewDate).join(newSeparator);
  }

  return res;
}

module.exports = formatDate;
