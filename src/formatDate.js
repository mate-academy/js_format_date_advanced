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
  const arrayFromDate = date.split(fromFormat[3]);
  const operations = [];
  const from = [...fromFormat];
  const to = [...toFormat];

  if (fromFormat[0][0] !== toFormat[0][0]) {
    operations[0] = 'reverse';
    to.pop();
    from.pop();
    from.reverse();
  }

  for (let i = 0; i < from.length; i++) {
    if (from[i].length > to[i].length) {
      operations.push('cut' + [i]);
    } else if (from[i].length < to[i].length) {
      operations.push('add' + [i]);
    }
  }

  if (operations.includes('reverse')) {
    arrayFromDate.reverse();
  }

  if (operations.includes('cut0')) {
    arrayFromDate[0] = arrayFromDate[0].slice(2, 4);
  }

  if (operations.includes('cut2')) {
    arrayFromDate[2] = arrayFromDate[2].slice(2, 4);
  }

  if (operations.includes('add0')) {
    if (arrayFromDate[0] >= 30) {
      arrayFromDate[0] = '19' + arrayFromDate[0];
    } else if (arrayFromDate[0] < 30) {
      arrayFromDate[0] = '20' + arrayFromDate[0];
    }
  }

  if (operations.includes('add2')) {
    if (arrayFromDate[2] >= 30) {
      arrayFromDate[2] = '19' + arrayFromDate[2];
    } else if (arrayFromDate[2] < 30) {
      arrayFromDate[2] = '20' + arrayFromDate[2];
    }
  }

  return arrayFromDate.join(toFormat[3]);
}

module.exports = formatDate;
