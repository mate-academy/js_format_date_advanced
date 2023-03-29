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
  const newDate = date.split(/\W/);

  let day = '';
  let month = '';
  let year = '';
  let newYearLength = '';
  let divider;
  const reFormatedDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (true) {
      case fromFormat[i][0] === 'Y':
        year = newDate[i];
        break;
      case fromFormat[i][0] === 'D':
        day = newDate[i];
        break;
      case fromFormat[i][0] === 'M':
        month = newDate[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    divider = toFormat[i];

    switch (true) {
      case toFormat[i][0] === 'Y':
        newYearLength = toFormat[i].length;

        if (newYearLength < year.length) {
          year = year.slice(newYearLength);
        }

        if (newYearLength > year.length) {
          if (year < 30) {
            year = '20' + year;
          } else {
            year = '19' + year;
          }
        }
        reFormatedDate[i] = year;
        break;
      case toFormat[i][0] === 'D':
        reFormatedDate[i] = day;
        break;
      case toFormat[i][0] === 'M':
        reFormatedDate[i] = month;
        break;
    }
  }

  return reFormatedDate.join(divider);
}
module.exports = formatDate;
