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
  const separFrom = fromFormat[3];
  const separTo = toFormat[3];
  let year = '';
  let month = '';
  let day = '';
  const arr = date.split(separFrom);
  const result = [];
  let newDate = '';

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'MM':
        month = arr[i];
        break;

      case 'DD':
        day = arr[i];
        break;

      default:
        year = arr[i];
    }
  }

  for (let n = 0; n < 3; n++) {
    switch (toFormat[n]) {
      case 'MM':
        result[n] = month;
        break;

      case 'DD':
        result[n] = day;
        break;

      default:
        if (toFormat[n] === 'YYYY' && year.length === 4) {
          result[n] = year;
        } else if (toFormat[n] === 'YY') {
          year = year.slice(2);
        } else if (toFormat[n] === 'YYYY' && year < 30) {
          year = `${20}${year}`;
        } else if (toFormat[n] === 'YYYY' && year >= 30) {
          year = `${19}${year}`;
        }
        result[n] = year;
    }
    newDate = result.join(separTo);
  }

  return newDate;
}

module.exports = formatDate;
