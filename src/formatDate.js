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
  // creating new variables;
  const newDate = date.split(fromFormat[3]);
  let year;
  let month;
  let day;

  // creating result string;
  let result = '';

  // fill in variables by fromFormat;
  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = newDate[i];
        break;

      case 'MM':
        month = newDate[i];
        break;

      case 'YYYY':
      case 'YY':
        year = newDate[i];
    }
  }

  // changing formats by fill in result;
  for (let j = 0; j < toFormat.length - 1; j++) {
    switch (toFormat[j]) {
      case 'DD':
        result += day + toFormat[3];
        break;

      case 'MM':
        result += month + toFormat[3];
        break;

      case 'YY':
        result += year.slice(-2) + toFormat[3];
        break;

      // take into account that the year can be in two-digit format
      case 'YYYY':
        if (year.length < 4) {
          if (year < 30) {
            result += 20 + year + toFormat[3];
          } else {
            result += 19 + year + toFormat[3];
          }
        } else {
          result += year + toFormat[3];
        }
    }
  }

  // returning our result with the help of method slice
  return result.slice(0, result.length - 1);
}

module.exports = formatDate;
