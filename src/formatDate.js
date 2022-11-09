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
  const fromDelimiter = fromFormat[3];
  const toDelimiter = toFormat[3];
  const dateParts = date.split(fromDelimiter);
  const finalResult = [];
  let day, month, year;

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateParts[i];
        break;

      case 'MM':
        month = dateParts[i];
        break;

      case 'YYYY':
        year = dateParts[i];
        break;

      case 'YY':
        if (+dateParts[i] < 30) {
          year = 20 + dateParts[i];
        } else {
          year = 19 + dateParts[i];
        }
        break;

      default:
        throw new Error('unspecified format to conver from');
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'DD':
        finalResult[i] = day;
        break;

      case 'MM':
        finalResult[i] = month;
        break;

      case 'YYYY':
        finalResult[i] = year;
        break;

      case 'YY':
        finalResult[i] = year.slice(2);
        break;

      default:
        throw new Error('unspecified format to convert into');
    }
  }

  return finalResult.join(toDelimiter);
}

module.exports = formatDate;
