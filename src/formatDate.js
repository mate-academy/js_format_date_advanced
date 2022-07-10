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
  const splittedDate = date.split(fromFormat[fromFormat.length - 1]);
  const obj = {
    year: null,
    month: null,
    day: null,
  };

  const newDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        if (splittedDate[i] < 30) {
          obj.year = '20' + splittedDate[i];
        } else {
          obj.year = '19' + splittedDate[i];
        }
        break;

      case 'MM':
        obj.month = splittedDate[i];
        break;

      case 'DD':
        obj.day = splittedDate[i];
        break;

      default:
        obj.year = splittedDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        newDate.push(obj.year);
        break;

      case 'YY':
        newDate.push(obj.year.slice(2));
        break;

      case 'MM':
        newDate.push(obj.month);
        break;

      case 'DD':
        newDate.push(obj.day);
        break;
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
