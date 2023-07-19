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
  const partsOfDate = date.split(fromFormat[3]);
  const result = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        year = partsOfDate[i];
        break;

      case 'YYYY':
        year = partsOfDate[i];
        break;

      case 'MM':
        month = partsOfDate[i];
        break;

      case 'DD':
        day = partsOfDate[i];
        break;

      default:
        return 'Unexpected type';
    }
  }

  for (const data of toFormat.slice(0, -1)) {
    switch (data) {
      case 'YY':
        if (year.length !== 2) {
          year %= 100;
        }

        result.push(year);
        break;

      case 'YYYY':
        if (year.length !== 4 && year % 100 >= 30) {
          year = +year + 1900;
        }

        if (year.length !== 4 && year % 100 < 30) {
          year = +year + 2000;
        }

        result.push(year);
        break;

      case 'MM':
        result.push(month);
        break;

      case 'DD':
        result.push(day);
        break;

      default:
        return 'Unexpected type';
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
