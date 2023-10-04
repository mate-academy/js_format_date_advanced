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
  const newArr = date.split(`${fromFormat[fromFormat.length - 1]}`);
  const tempArr = [];

  for (let i = 0; i < newArr.length; i++) {
    if (i !== newArr.length) {
      for (let j = 0; j < newArr.length; j++) {
        if (fromFormat[i] === toFormat[j]) {
          tempArr[j] = newArr[i];
        } else if ((fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY')
        && (fromFormat[i] !== toFormat[j])) {
          if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
            if (newArr[i] < 30) {
              tempArr[i] = '20' + newArr[i];
            } else {
              tempArr[i] = '19' + newArr[i];
            }
          } else if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
            tempArr[i] = newArr[i].slice(2);
          }
        }
      }
    }
  }

  return tempArr.join(`${toFormat[toFormat.length - 1]}`);
}

module.exports = formatDate;
