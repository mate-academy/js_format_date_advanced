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
  const dateArr = date.split(fromFormat[3]);
  const dateLength = fromFormat.length;

  let year;
  let month;
  let day;

  for (let i = 0; i < dateLength - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dateArr[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArr[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateArr[i];
    }
  }

  for (let i = 0; i < dateLength - 1; i++) {
    if (toFormat[i] === 'YYYY' && year.length > 2) {
      dateArr[i] = year;
    }

    if (toFormat[i] === 'YY' && year.length > 2) {
      year = year.slice(2, 4);
      dateArr[i] = year;
    }

    if (toFormat[i] === 'YYYY' && year.length < 4) {
      year >= 30 ? year = '19' + year : year = '20' + year;
      dateArr[i] = year;
    }

    if (toFormat[i] === 'MM') {
      dateArr[i] = month;
    }

    if (toFormat[i] === 'DD') {
      dateArr[i] = day;
    }
  }

  return dateArr.join(toFormat[3]);
}

module.exports = formatDate;
