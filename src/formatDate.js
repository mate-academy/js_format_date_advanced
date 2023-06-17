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
  const keyAndValues = new Map();
  const dataArr = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    keyAndValues.set(fromFormat[i], dataArr[i]);
  }

  const resultArr = [];
  const tempToFormat = `${toFormat[0]} ${toFormat[1]} ${toFormat[2]}`;
  const tempFromFormat = `${fromFormat[0]} ${fromFormat[1]} ${fromFormat[2]}`;

  if (tempFromFormat.length > tempToFormat.length) {
    const tempEl = keyAndValues.get('YYYY').slice(2);

    keyAndValues.set('YY', tempEl);
  }

  if (tempFromFormat.length < tempToFormat.length) {
    let tempEl = keyAndValues.get('YY');

    if (tempEl < 30) {
      tempEl = '20' + tempEl;
    } else {
      tempEl = '19' + tempEl;
    }
    keyAndValues.set('YYYY', tempEl);
  }

  for (let i = 0; i < 3; i++) {
    resultArr[i] = keyAndValues.get(toFormat[i]);
  }

  return `${resultArr[0]}${toFormat[3]}${resultArr[1]}${toFormat[3]}${resultArr[2]}`;
}

module.exports = formatDate;
