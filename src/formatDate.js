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
  const value = date.split(fromFormat[fromFormat.length - 1]);
  let revers;

  if (toFormat[0][0] !== fromFormat[0][0]) {
    revers = value.reverse();
  }

  if (toFormat[0][0] === 'D' || toFormat[0][0] === 'M') {
    if (revers !== undefined) {
      if (fromFormat[0].length < toFormat[2].length) {
        revers[2] < 30
          ? revers[2] = '20' + revers[2]
          : revers[2] = '19' + revers[2];
      } else if (fromFormat[0].length > toFormat[2].length) {
        revers[2] = revers[2].slice(2);
      }
    } else {
      if (fromFormat[2].length < toFormat[2].length) {
        value[2] < 30
          ? value[2] = '20' + value[2]
          : value[2] = '19' + value[2];
      } else if (fromFormat[2].length > toFormat[2].length) {
        value[2] = value[2].slice(2);
      }
    }
  } else {
    if (revers !== undefined) {
      if (fromFormat[2].length < toFormat[0].length) {
        revers[0] < 30
          ? revers[0] = '20' + revers[0]
          : revers[0] = '19' + revers[0];
      } else if (fromFormat[0].length > toFormat[0].length) {
        revers[0] = revers[0].slice(2);
      }
    } else {
      if (fromFormat[0].length < toFormat[0].length) {
        value[0] < 30
          ? value[0] = '20' + value[0]
          : value[0] = '19' + value[0];
      } else if (fromFormat[0].length > toFormat[0].length) {
        value[0] = value[0].slice(2);
      }
    }
  }

  if (revers !== undefined) {
    return revers.join(toFormat[fromFormat.length - 1]);
  } else {
    return value.join(toFormat[fromFormat.length - 1]);
  }
}

module.exports = formatDate;
