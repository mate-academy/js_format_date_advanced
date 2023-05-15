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

// function formatDate(date, fromFormat, toFormat) {
//   // write code here
// let parts = date.split(fromFormat[fromFormat.length - 1]);
// let partOrder = fromFormat.slice(0, -1);

function formatDate(date, fromFormat, toFormat) {
  let result = '';
  const parts = date.split(`${fromFormat[3]}`);

  function getFormatPart(part) {
    return parts[fromFormat.indexOf(part)];
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'DD':
      case 'MM':
        result += getFormatPart(toFormat[i]);
        break;
      case 'YY':
        if (fromFormat.includes('YY')) {
          result += getFormatPart(toFormat[i]);
        } else if (fromFormat.includes('YYYY')) {
          result += parts[fromFormat.indexOf('YYYY')].slice(2);
        }
        break;
      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          result += getFormatPart(toFormat[i]);
        } else if (fromFormat.includes('YY')) {
          result += `${parts[fromFormat.indexOf('YY')] >= 30 ? 19 : 20}${parts[fromFormat.indexOf('YY')]}`;
        }
        break;
    }

    if (i < 2) {
      result += toFormat[3];
    }
  }

  return result;
}

module.exports = formatDate;
