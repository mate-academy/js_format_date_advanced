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
  const beforeStep = fromFormat[fromFormat.length - 1];
  const toStep = toFormat[toFormat.length - 1];
  const arr = date.split(beforeStep);
  const obj = {};
  const result = {};

  for (let i = 0; i < arr.length; i++) {
    obj[fromFormat[i]] = arr[i];
  }

  for (const key of toFormat) {
    for (const value in obj) {
      if (value === key) {
        result[value] = obj[key];
      }

      if (value === 'YYYY' && key === 'YY') {
        const year = +obj[value].slice(-2);

        result[value] = year;
      }

      if (value === 'YY' && key === 'YYYY') {
        let year = obj[value].slice(-2);

        if (year === 0) {
          year = '2000';
        }

        if (year >= 30) {
          year = '19' + year;
        } else {
          year = '20' + year;
        }

        result[value] = year;
      }
    }
  }

  return Object.values(result).join(toStep);
}

module.exports = formatDate;
