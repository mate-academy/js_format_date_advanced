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
  let day;
  let month;
  let year;

  const dateArray = date.split(fromFormat[3]);
  const dateResultArray = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateArray[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArray[i];
    }

    if (fromFormat[i] === 'YYYY') {
      year = dateArray[i];
    }

    if (fromFormat[i] === 'YY') {
      if (+dateArray[i] > 22) {
        year = 19 + dateArray[i];
      } else {
        year = 20 + dateArray[i];
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      dateResultArray[i] = day;
    }

    if (toFormat[i] === 'MM') {
      dateResultArray[i] = month;
    }

    if (toFormat[i] === 'YYYY') {
      dateResultArray[i] = year;
    }

    if (toFormat[i] === 'YY') {
      dateResultArray[i] = year.slice(2);
    }
  }

  return dateResultArray.join(toFormat[3]);
}

module.exports = formatDate;
