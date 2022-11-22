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
  let year;
  const newFormat = [];
  const oldDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = oldDate[i];
    }

    if (fromFormat[i] === 'YY') {
      if (+oldDate[i] < 30) {
        year = '20' + oldDate[i];
      } else {
        year = '19' + oldDate[i];
      }
    }
  }

  for (let u = 0; u < toFormat.length; u++) {
    if (toFormat[u] === 'YY') {
      year = year[2] + year[3];
    }
  }

  for (let y = 0; y <= 2; y++) {
    for (let t = 0; t <= 2; t++) {
      if (toFormat[y] === fromFormat[t]) {
        newFormat[y] = oldDate[t];
      }

      if (toFormat[y] === 'YY' || toFormat[y] === 'YYYY') {
        newFormat[y] = year;
      }
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
