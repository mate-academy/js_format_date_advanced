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
 *
 *
 *
 *   ['YY', 'MM', 'DD', '/'],
 *
 *
 *
 *
 *
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
  const dateArray = date.split(fromFormat[3]);
  const dateStorage = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i][0]) {
      case 'Y':
        dateStorage.year = dateArray[i];
        break;

      case 'M':
        dateStorage.month = dateArray[i];
        break;

      case 'D':
        dateStorage.day = dateArray[i];
        break;

      default:
        throw new Error('invalid date');
    }
  }

  for (let j = 0; j < toFormat.length - 1; j++) {
    switch (toFormat[j][0]) {
      case 'D':
        result.push(dateStorage.day);
        break;
      case 'M':
        result.push(dateStorage.month);
        break;
      case 'Y':
        if (toFormat[j].length === 2) {
          if (dateStorage.year.toString().length === 2) {
            result.push(dateStorage.year);
          } else {
            result.push(dateStorage.year.toString().slice(2));
          }
        } else {
          if (dateStorage.year.toString().length === 2) {
            if (dateStorage.year < 30) {
              result.push(`20${dateStorage.year}`);
            } else {
              result.push(`19${dateStorage.year}`);
            }
          } else {
            result.push(dateStorage.year);
          }
        }
        break;
      default:
        throw new Error('invalid date');
    };
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
