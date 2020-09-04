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
  // write code here
  const oldDate = {};
  const newDateArr = [];
  const dateArr = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        oldDate.year = dateArr[i];
        break;
      case 'MM':
        oldDate.month = dateArr[i];
        break;
      case 'DD':
        oldDate.day = dateArr[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (oldDate.year.length < 4) {
          oldDate.year = +oldDate.year
          >= 30 ? '19' + oldDate.year : '20' + oldDate.year;
        }
        newDateArr[i] = oldDate.year;
        break;
      case 'YY':
        if (oldDate.year.length > 2) {
          oldDate.year = oldDate.year.slice(2);
        }
        newDateArr[i] = oldDate.year;
        break;
      case 'MM':
        newDateArr[i] = oldDate.month;
        break;
      case 'DD':
        newDateArr[i] = oldDate.day;
        break;
    }
  }

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
