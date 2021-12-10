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
  let anwser = '';
  const dateArray = date.split(fromFormat[3]);

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let e = 0; e < fromFormat.length - 1; e++) {
      if (toFormat[i][0] === fromFormat[e][0]) {
        if (fromFormat[e][0] === 'Y') {
          if (fromFormat[e].length > toFormat[i].length) {
            dateArray[e] = dateArray[e].substring(2);
          } else if (fromFormat[e].length < toFormat[e].length) {
            if (dateArray[e] >= 30) {
              dateArray[e] = '19' + dateArray[e];
            } else if (dateArray[e] < 30) {
              dateArray[e] = '20' + dateArray[e];
            }
          }
        }

        if (anwser.length > 0) {
          anwser += toFormat[3];
        }
        anwser += dateArray[e];
      }
    }
  }

  return anwser;
}

module.exports = formatDate;
