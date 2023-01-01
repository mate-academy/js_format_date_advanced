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
  const oldSepar = fromFormat[3];
  const newSepar = toFormat[3];
  const currDate = date.split(oldSepar);
  let day;
  let month;
  let year;
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'DD') {
      day = currDate[i];
    } else if (fromFormat[i] === 'MM') {
      month = currDate[i];
    } else if (fromFormat[i] === 'YYYY') {
      year = currDate[i];
    } else if (fromFormat[i] === 'YY' && currDate[i] < 30) {
      year = '20' + currDate[i];
    } else if (fromFormat[i] === 'YY' && currDate[i] >= 30) {
      year = '19' + currDate[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      newDate[i] = day;
    } else if (toFormat[i] === 'MM') {
      newDate[i] = month;
    } else if (toFormat[i] === 'YYYY') {
      newDate[i] = year;
    } else if (toFormat[i] === 'YY') {
      newDate[i] = year[2] + year[3];
    }
  }

  return newDate.join(newSepar);
}

module.exports = formatDate;
