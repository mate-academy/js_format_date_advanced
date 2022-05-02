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
  const arr = [];
  const arrSplit = date.split(fromFormat.pop());
  const arrToFormat = toFormat.pop();
  let year = '',
    month = '',
    day = '';

  for (let idx = 0; idx < fromFormat.length; idx++) {
    if (fromFormat[idx] === 'YY') {
      if (+arrSplit[idx] < 30) {
        year = `20${arrSplit[idx]}`
      } else {
        year = `19${arrSplit[idx]}`
      }
    }

    if (fromFormat[idx] === 'YYYY') {
      year = arrSplit[idx];
    }

    if (fromFormat[idx] === 'MM') {
      month = arrSplit[idx];
    }

    if (fromFormat[idx] === 'DD') {
      day = arrSplit[idx];
    }
  }

  for (let idx = 0; idx < toFormat.length; idx++) {
    if (toFormat[idx] === 'YY') {
        arr[idx] = year.slice(2)
    } else {
      arr[idx] = year;
    }

    if (toFormat[idx] === 'MM') {
      arr[idx] = month;
    }

    if (toFormat[idx] === 'DD') {
      arr[idx] = day;
    }
  }

  return arr.join(arrToFormat);
}

module.exports = formatDate;
