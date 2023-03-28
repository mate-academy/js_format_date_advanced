'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * dateObject.year from 4 digits to 2 digits and back.
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
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const dateObject = {};
  const arr = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        dateObject.year = dateArr[i];
        break;

      case 'MM':
        dateObject.month = dateArr[i];
        break;

      case 'DD':
        dateObject.day = dateArr[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'MM':
        arr.push(dateObject.month);
        break;

      case 'DD':
        arr.push(dateObject.day);
        break;

      case 'YY':
        if (dateObject.year.length === 4) {
          arr.push(dateObject.year[2] + dateObject.year[3]);
          continue;
        }
        arr.push(dateObject.year);
        break;

      case 'YYYY':
        if (dateObject.year.length === 2 && dateObject.year < 30) {
          arr.push(`20${dateObject.year}`);
          continue;
        }

        if (dateObject.year.length === 2 && dateObject.year >= 30) {
          arr.push(`19${dateObject.year}`);
          continue;
        }
        arr.push(dateObject.year);
        break;
    }
  }

  const result = arr.join(toFormat[toFormat.length - 1]);

  return result;
}

module.exports = formatDate;
