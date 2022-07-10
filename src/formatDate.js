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
  let newDate = '';
  const splittedDate = date.split(fromFormat[3]);
  let year;
  let month;
  let day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = splittedDate[fromFormat.indexOf(fromFormat[i])];
    } else if (fromFormat[i] === 'MM') {
      month = splittedDate[fromFormat.indexOf(fromFormat[i])];
    } else {
      day = splittedDate[fromFormat.indexOf(fromFormat[i])];
    }
  }

  for (const format of toFormat) {
    if (toFormat.indexOf(format) === 3) {
      break;
    }

    if (format === 'YYYY' && year.length === 2) {
      if (year < 30) {
        newDate += '20' + year + toFormat[3];
      } else {
        newDate += '19' + year + toFormat[3];
      }
    } else if (format === 'YY' && year.length === 4) {
      newDate += year.slice(2) + toFormat[3];
    } else if (format === 'MM') {
      newDate += month + toFormat[3];
    } else if (format === 'DD') {
      newDate += day + toFormat[3];
    } else {
      newDate += year + toFormat[3];
    }
  }

  return newDate.slice(0, -1);
}

module.exports = formatDate;
