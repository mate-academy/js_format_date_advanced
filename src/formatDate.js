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
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const separator = toFormat[toFormat.length - 1];
  const obj = {};
  let str = '';

  for (let i = 0; i < fromFormat.length; i++) {
    const element = fromFormat[i];

    obj[element] = dateArr[i];
  }

  for (const item of toFormat) {
    if (item === 'YY') {
      if (fromFormat.includes(item)) {
        str += obj.YY + separator;
      } else {
        const lastDate = obj.YYYY.slice(-2);

        str += lastDate + separator;
      }
    }

    if (item === 'YYYY') {
      if (fromFormat.includes(item)) {
        str += obj.YYYY + separator;
      } else {
        if (obj.YY < 30) {
          str += '20' + obj.YY + separator;
        } else {
          str += '19' + obj.YY + separator;
        }
      }
    }

    if (item === 'MM') {
      str += obj.MM + separator;
    }

    if (item === 'DD') {
      str += obj.DD + separator;
    }
  }

  const strDate = str.slice(0, -1);

  return strDate;
}
module.exports = formatDate;
