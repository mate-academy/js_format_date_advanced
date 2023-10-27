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
  const dateObj = {};
  const splittedDate = date.split(fromFormat[fromFormat.length - 1]);
  const result = [];
  let year = 0;
  let month = 0;
  let day = 0;
  let newYear = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = splittedDate[i];
  }

  for (const key of Object.keys(dateObj)) {
    switch (key) {
      case 'YY':
        year = dateObj[key];
        break;
      case 'YYYY':
        year = dateObj[key];
        break;
      case 'MM':
        month = dateObj[key];
        break;
      case 'DD':
        day = dateObj[key];
        break;

      default:
        break;
    }
  }
  newYear = year;

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    newYear = year < 30 ? `20${year}` : `19${year}`;
    // if (year < 30) {
    //   newYear = `20${year}`;
    // } else {
    //   newYear = `19${year}`;
    // }
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    newYear = `${year.toString().slice(-2)}`;
  }

  for (let i = 0; i <= toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'MM':
        result.push(month);
        break;
      case 'DD':
        result.push(day);
        break;
      case 'YY':
        result.push(newYear);
        break;
      case 'YYYY':
        result.push(newYear);
        break;
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
