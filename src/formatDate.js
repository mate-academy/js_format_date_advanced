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
  const arr = date.split(`${fromFormat[3]}`);
  const oldFormat = {};
  const newFormat = {};
  let oldYear = '';
  let newYear = '';
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    oldFormat[fromFormat[i]] = arr[i];
    newFormat[toFormat[i]] = 0;

    if (fromFormat[i].includes('Y')) {
      oldYear = fromFormat[i];
    }

    if (toFormat[i].includes('Y')) {
      newYear = toFormat[i];
    }
  }

  if (newYear.length > oldYear.length) {
    if (oldFormat[oldYear] < 21) {
      newFormat[newYear] = '20' + oldFormat[oldYear];
    } else {
      newFormat[newYear] = '19' + oldFormat[oldYear];
    }
  } else if (newYear.length < oldYear.length) {
    newFormat[newYear] = oldFormat[oldYear].slice(-2);
  } else {
    newFormat[newYear] = oldFormat[oldYear];
  }

  for (const key in newFormat) {
    if (key !== newYear) {
      newFormat[key] = oldFormat[key];
    }
  }

  for (const key in newFormat) {
    result.push(newFormat[key]);
  }

  return result.join(`${toFormat[3]}`);
}

module.exports = formatDate;
