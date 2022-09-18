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
 * 2020-02-18 [YYYY]
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
  const newDate = [];
  const splitDate = date.split(fromFormat[3]);
  let newDay = '';
  let newMonth = '';
  let newYear = '';

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'DD') {
      newDay = splitDate[i];
    }

    if (fromFormat[i] === 'MM') {
      newMonth = splitDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      newYear = splitDate[i];
    }

    if (fromFormat[i] === 'YY' && +splitDate[i] < 30) {
      newYear = '20' + splitDate[i];
    }

    if (fromFormat[i] === 'YY' && +splitDate[i] >= 30) {
      newYear = '19' + splitDate[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      newDate[i] = newDay;
    }

    if (toFormat[i] === 'MM') {
      newDate[i] = newMonth;
    }

    if (toFormat[i] === 'YYYY') {
      newDate[i] = newYear;
    }

    if (toFormat[i] === 'YY') {
      newDate[i] = newYear.slice(-2);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
