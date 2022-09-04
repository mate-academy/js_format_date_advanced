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
  let result = '';
  const dateSplit = date.split(fromFormat[fromFormat.length - 1]);

  const separatorTo = toFormat[toFormat.length - 1];

  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const expression = fromFormat[i];

    switch (expression) {
      case 'YYYY':
        year = dateSplit[i];
        break;

      case 'YY':
        if (dateSplit[i] < 30) {
          year = 2000 + +(dateSplit[i]);
        } else {
          year = 1900 + +(dateSplit[i]);
        }
        break;

      case 'MM':
        month = dateSplit[i];
        break;

      case 'DD':
        day = dateSplit[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const expression = toFormat[i];

    switch (expression) {
      case 'YYYY':
        result += year;
        result += separatorTo;
        break;

      case 'YY':
        result += year.slice(2);
        result += separatorTo;
        break;

      case 'MM':
        result += month;
        result += separatorTo;
        break;

      case 'DD':
        result += day;
        result += separatorTo;
        break;
    }
  }

  return result.slice(0, -1);
}

module.exports = formatDate;
