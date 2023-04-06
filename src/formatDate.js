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

function yearFormating(year) {
  return year >= 30 ? `19${year}` : `20${year}`;
}

function formatDate(date, fromFormat, toFormat) {
  // write code here

  let day;
  let month;
  let year;
  const separator = toFormat[toFormat.length - 1];

  const oldSeparator = fromFormat[fromFormat.length - 1];
  const currentDate = date.split(oldSeparator);
  const returnedValue = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = currentDate[i];
        break;
      case 'MM':
        month = currentDate[i];
        break;
      case 'YY':
      case 'YYYY':
        year = currentDate[i];
        break;
      default:
        return 'Wrong format!';
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD':
        returnedValue[i] = day;
        break;
      case 'MM':
        returnedValue[i] = month;
        break;
      case 'YY':
        returnedValue[i] = year.length === 4 ? year.slice(-2) : year;
        break;
      case 'YYYY':
        returnedValue[i] = year.length === 4 ? year : yearFormating(year);
        break;
      default:
        return 'Wrong format!';
    }
  }

  return returnedValue.join(separator);
}

module.exports = formatDate;
