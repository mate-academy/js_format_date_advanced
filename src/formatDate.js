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
  const before = date.split(`${fromFormat[fromFormat.length - 1]}`);
  const newSeperator = toFormat[toFormat.length - 1];
  let result = '';

  for (let i = 0; i < before.length; i++) {
    switch (toFormat[i]) {
      case 'DD' :
        result += before[fromFormat.indexOf('DD')];

        if (toFormat[i] !== toFormat[toFormat.length - 2]) {
          result += newSeperator;
        }
        break;

      case 'MM' :
        result += before[fromFormat.indexOf('MM')];

        if (toFormat[i] !== toFormat[toFormat.length - 2]) {
          result += newSeperator;
        }
        break;

      case 'YY' :
        if (fromFormat[fromFormat.indexOf('YY')] === 'YY') {
          result += before[fromFormat.indexOf('YY')];
        } else {
          result += before[fromFormat.indexOf('YYYY')].slice(-2);
        }

        if (toFormat[i] !== toFormat[toFormat.length - 2]) {
          result += newSeperator;
        }
        break;

      case 'YYYY' :
        if (fromFormat[fromFormat.indexOf('YYYY')] === 'YYYY') {
          result += before[fromFormat.indexOf('YYYY')];
        } else if (before[fromFormat.indexOf('YY')] < 30) {
          result += 20 + before[fromFormat.indexOf('YY')];
        } else {
          result += 19 + before[fromFormat.indexOf('YY')];
        }

        if (toFormat[i] !== toFormat[toFormat.length - 2]) {
          result += newSeperator;
        }

        break;
    }
  }

  return result;
}

module.exports = formatDate;
