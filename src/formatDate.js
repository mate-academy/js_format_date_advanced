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
  let day = '';
  let month = '';
  let year = '';
  let result = '';
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const splits = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i][0] === 'Y') {
      year = splits[i];
    } else if (fromFormat[i][0] === 'M') {
      month = splits[i];
    } else {
      day = splits[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i][0] === 'Y') {
      if (toFormat[i].length === 4 && year.length === 2) {
        if (+year < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }
      } else if (toFormat[i].length === 2 && year.length === 4) {
        year = year.slice(2);
      }

      result += year + toSeparator;
    } else if (toFormat[i][0] === 'M') {
      result += month + toSeparator;
    } else {
      result += day + toSeparator;
    }
  }

  return result.substring(0, result.length - 1);
}

module.exports = formatDate;
