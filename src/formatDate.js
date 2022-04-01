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
  const myDate = Array(3);
  let needDate = Array(3);

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        myDate[0] = fromDate[i];
        break;
      case 'MM':
        myDate[1] = fromDate[i];
        break;
      default:
        myDate[2] = fromDate[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'DD':
        needDate[i] = myDate[0];
        break;
      case 'MM':
        needDate[i] = myDate[1];
        break;

      case 'YY':
        if (myDate[2].length === 2) {
          needDate[i] = myDate[2];
        } else {
          needDate[i] = myDate[2].slice(2);
        }
        break;

      case 'YYYY':
        if (myDate[2].length === 4) {
          needDate[i] = myDate[2];
        } else {
          if (myDate[2] < 30) {
            needDate[i] = '20' + myDate[2];
          } else {
            needDate[i] = '19' + myDate[2];
          }
        }
    }
  }
  needDate = needDate.join(toFormat[3]);

  return needDate;
}

module.exports = formatDate;
