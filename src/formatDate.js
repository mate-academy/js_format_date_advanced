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
  let day = 0;
  let month = 0;
  let year = 0;
  const dateArr = date.split(`${fromFormat[3]}`);
  const separator = toFormat[3];
  let result = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateArr[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArr[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = dateArr[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      result += day;
    }

    if (toFormat[i] === 'MM') {
      result += month;
    }

    if (toFormat[i] === 'YY') {
      if (year.toString().length === 4) {
        result += `${year.toString()[2]}${year.toString()[3]}`;
      } else {
        result += year;
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (year.toString().length === 2) {
        if (year < 30) {
          result += `20${year}`;
        } else {
          result += `19${year}`;
        }
      } else {
        result += year;
      }
    }

    if (i < toFormat.length - 2) {
      result += separator;
    }
  }

  return result;
}

module.exports = formatDate;
