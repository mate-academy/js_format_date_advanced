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
  let result = [];
  const SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const DATE = date.split(SEPARATOR);

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = DATE[i];
    }

    if (fromFormat[i] === 'MM') {
      month = DATE[i];
    }

    if (fromFormat[i] === 'DD') {
      day = DATE[i];
    }
  }

  for (let k = 0; k < toFormat.length - 1; k++) {
    if (toFormat[k] === 'YYYY') {
      if (year.length <= 2 && year < 30) {
        result[k] = `20${year}`;
      }

      if (year.length <= 2 && year >= 30) {
        result[k] = `19${year}`;
      }

      if (year.length === 4) {
        result[k] = year;
      }
    }

    if (toFormat[k] === 'YY') {
      if (year.length > 2) {
        result[k] = year.slice(2);
      } else {
        result[k] = year;
      }
    }

    if (toFormat[k] === 'MM') {
      result[k] = month;
    }

    if (toFormat[k] === 'DD') {
      result[k] = day;
    }
  }

  result = result.join(NEW_SEPARATOR);

  return result;
}

module.exports = formatDate;
