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
  const arr = date.split(fromFormat[fromFormat.length - 1]);
  const [ a, b, c ] = fromFormat;
  const fromArr = [a, b, c].sort();
  const [ d, e, f ] = toFormat;
  const toArr = [d, e, f].sort();

  const dateObj = {};

  for (let i = 0; i < arr.length; i++) {
    dateObj[fromFormat[i]] = arr[i];
  }

  if (toArr[2].length > fromArr[2].length) {
    if (dateObj[fromArr[2]] < 30) {
      const val = '20' + dateObj[fromArr[2]];

      dateObj[fromArr[2]] = val;
    } else {
      const val = '19' + dateObj[fromArr[2]];

      dateObj[fromArr[2]] = val;
    }
  }

  if (toArr[2].length < fromArr[2].length) {
    dateObj[fromArr[2]] = dateObj[fromArr[2]].slice(-2);
  }

  dateObj[toArr[2]] = dateObj[fromArr[2]];

  const res = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    res.push(dateObj[toFormat[i]]);
  }

  return res.join(toFormat[3]);
}

module.exports = formatDate;
