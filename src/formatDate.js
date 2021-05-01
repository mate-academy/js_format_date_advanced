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
  const oldFormat = date.split(fromFormat[3]);
  const dataObj = {};
  const newSeparator = toFormat[3];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        dataObj.day = oldFormat[i];
        break;

      case 'YYYY':
      case 'YY':
        dataObj.year = oldFormat[i];
        break;

      case 'MM':
        dataObj.month = oldFormat[i];
        break;
    }
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result.push(dataObj.day);
        break;

      case 'MM':
        result.push(dataObj.month);
        break;

      case 'YY':
        if (dataObj.year.length === 4) {
          result.push(dataObj.year.slice(-2));
          break;
        } else {
          result.push(dataObj.year);
          break;
        }

      case 'YYYY':
        if (dataObj.year.length === 4) {
          result.push(dataObj.year);
          break;
        }

        if (dataObj.year.length === 2) {
          if (dataObj.year < 30) {
            result.push('20' + dataObj.year);
          } else {
            result.push('19' + dataObj.year);
          }
          break;
        }
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
