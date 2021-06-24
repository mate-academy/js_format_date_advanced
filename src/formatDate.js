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
  const splitedData = date.replace(/([^0-9])/g, ' ').split(' ');
  const separator = toFormat[3];

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const x = splitedData[fromFormat.indexOf('YY')];

    if (+x < 30) {
      splitedData[fromFormat.indexOf('YY')] = '20' + x;
    } else {
      splitedData[fromFormat.indexOf('YY')] = '19' + x;
    }

    toFormat[toFormat.indexOf('YYYY')] = 'YY';
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    splitedData[fromFormat.indexOf('YYYY')]
    = splitedData[fromFormat.indexOf('YYYY')].slice(-2);
    toFormat[toFormat.indexOf('YY')] = 'YYYY';
  }

  const result = [];

  toFormat.splice(0, 3)
    .map(a => result.push(splitedData[fromFormat.indexOf(a)]));

  return result.join(separator);
}

module.exports = formatDate;
