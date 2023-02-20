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

const YEAR_4_DIGITS = 'YYYY';
const YEAR_2_DIGITS = 'YY';

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const DATE_SPLITTED = date.split(OLD_SEPARATOR);
  const RESULT = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === YEAR_2_DIGITS && toFormat.includes(YEAR_4_DIGITS)) {
      fromFormat[i] = YEAR_4_DIGITS;

      if (+DATE_SPLITTED[i] < 30) {
        DATE_SPLITTED[i] = `20${DATE_SPLITTED[i]}`;
      } else {
        DATE_SPLITTED[i] = `19${DATE_SPLITTED[i]}`;
      }
    } else if
    (fromFormat[i] === YEAR_4_DIGITS && toFormat.includes(YEAR_2_DIGITS)) {
      fromFormat[i] = YEAR_2_DIGITS;
      DATE_SPLITTED[i] = DATE_SPLITTED[i].split('').slice(2).join('');
    }

    RESULT[i] = DATE_SPLITTED[fromFormat.indexOf(toFormat[i])];
  }

  return RESULT.join(NEW_SEPARATOR);
}

module.exports = formatDate;
