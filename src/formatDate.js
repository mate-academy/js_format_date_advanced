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

const year4Digits = 'YYYY';
const year2Digits = 'YY';

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateSplitted = date.split(oldSeparator);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === year2Digits && toFormat.includes(year4Digits)) {
      fromFormat[i] = year4Digits;

      if (+dateSplitted[i] < 30) {
        dateSplitted[i] = `20${dateSplitted[i]}`;
      } else {
        dateSplitted[i] = `19${dateSplitted[i]}`;
      }
    } else if
    (fromFormat[i] === year4Digits && toFormat.includes(year2Digits)) {
      fromFormat[i] = year2Digits;
      dateSplitted[i] = dateSplitted[i].split('').slice(2).join('');
    }

    result[i] = dateSplitted[fromFormat.indexOf(toFormat[i])];
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
