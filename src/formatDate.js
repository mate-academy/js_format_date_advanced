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
  const dateCopy = date.split(fromFormat[3]);

  const result = [];

  for (let i = 0; i < dateCopy.length; i++) {
    for (let j = 0; j < dateCopy.length; j++) {
      if (fromFormat[j] === toFormat[i]) {
        result[i] = dateCopy[j];
        continue;
      }

      if (fromFormat[j][0] === toFormat[i][0] && fromFormat[j].length === 4) {
        result[i] = dateCopy[j].split('').splice(-2).join('');
        continue;
      }

      if (fromFormat[j][0] === toFormat[i][0] && toFormat[i].length === 4) {
        if (+dateCopy[j] < 30) {
          dateCopy[j] = dateCopy[j].split('');
          dateCopy[j].unshift('20');
          dateCopy[j] = dateCopy[j].join('');
        } else {
          dateCopy[j] = dateCopy[j].split('');
          dateCopy[j].unshift('19');
          dateCopy[j] = dateCopy[j].join('');
        }
        result[i] = dateCopy[j];
        continue;
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
