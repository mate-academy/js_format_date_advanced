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
  const inputArray = date.split(fromFormat[fromFormat.length - 1]);

  let d, m, y, separator, inputYearLength;

  const outputArray = [];

  for (let i = 0; i < inputArray.length; i++) {
    switch (fromFormat[i][0]) {
      case 'D':
        d = inputArray[i];
        break;

      case 'M':
        m = inputArray[i];
        break;

      case 'Y':
        y = inputArray[i];
        inputYearLength = fromFormat[i].length;
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i][0]) {
      case 'D':
        outputArray.push(d);
        break;

      case 'M':
        outputArray.push(m);
        break;

      case 'Y':
        if (toFormat[i].length < inputYearLength) {
          outputArray.push(y[y.length - 2] + y[y.length - 1]);
        } else if (toFormat[i].length > inputYearLength) {
          if (y >= 30) {
            outputArray.push('19' + y);
          } else {
            outputArray.push('20' + y);
          }
        } else {
          outputArray.push(y);
        }
        break;

      default:
        separator = toFormat[i];
        break;
    }
  }

  return outputArray.join(separator);
}

module.exports = formatDate;
