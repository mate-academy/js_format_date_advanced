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
  let year = '';
  let month = '';
  let day = '';
  const oldSeparator = fromFormat.pop();
  const newSeperator = toFormat.pop();
  const arrDate = date.split(oldSeparator);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = arrDate[i];
        break;
      case 'MM':
        month = arrDate[i];
        break;
      case 'DD':
        day = arrDate[i];
        break;
      default: throw new Error('Unknown step: ' + toFormat[i]);
    }
  }

  let result = '';

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result += day;
        break;
      case 'MM':
        result += month;
        break;
      case 'YY':
      case 'YYYY':
        if (toFormat[i].length === year.length) {
          result += year;
        } else if (toFormat[i].length < year.length) {
          result += year.substring(2);
        } else {
          if (year < 30) {
            year = '20' + year;
            result += year;
          } else {
            year = '19' + year;
            result += year;
          }
        }
        break;
      default: throw new Error('Unknown step: ' + toFormat[i]);
    }

    if (i < 2) {
      result += newSeperator;
    }
  }

  return result;
}

module.exports = formatDate;
