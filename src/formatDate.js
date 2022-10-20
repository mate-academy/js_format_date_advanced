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
  const arrayDate = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const inequality = fromFormat[i].length !== toFormat[i].length;
    const available = fromFormat[i].includes('Y') && toFormat[i].includes('Y');

    if (inequality && available) {
      if (fromFormat[i].length > toFormat[i].length) {
        newDate.push(arrayDate[i].slice(2));
      } else {
        if (arrayDate[i] < 30) {
          arrayDate[i] = 20 + arrayDate[i];
        } else {
          arrayDate[i] = 19 + arrayDate[i];
        }
        newDate.push(arrayDate[i]);
      }
    } else {
      newDate.push(arrayDate[fromFormat.indexOf(toFormat[i])]);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
