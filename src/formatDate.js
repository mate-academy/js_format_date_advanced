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
  const temp = date.split(fromFormat[3]);
  const transform = [];

  for (let i = 0; i < 3; i++) {
    for (let y = 0; y < 3; y++) {
      if (toFormat[i][0] === fromFormat[y][0]) {
        if (toFormat[i][0] === 'Y') {
          if (toFormat[i].length === 4) {
            if (fromFormat[y].length === 2) {
              if (+temp[y] - 30 < 0) {
                transform.push('20' + temp[y]);
              } else {
                transform.push('19' + temp[y]);
              }
            } else {
              transform.push(temp[y]);
            }
          } else {
            if (fromFormat[y].length === 2) {
              transform.push(temp[y]);
            } else {
              transform.push(temp[y][2] + temp[y][3]);
            }
          }
        } else {
          transform.push(temp[y]);
        }
      }
    }
  };

  return transform.join(toFormat[3]);
}

module.exports = formatDate;
