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
 * @param {string[]} string
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const string = fromFormat.join('.');
  let year = 0;
  const month = date.slice(string.indexOf('MM'),
    string.indexOf('MM') + 2);
  const day = date.slice(string.indexOf('DD'), string.indexOf('DD') + 2);
  const separator = toFormat[3];
  const newFormat = [];

  if (fromFormat.includes('YYYY')) {
    year = date.slice(string.indexOf('YYYY'), string.indexOf('YYYY') + 4);
  } else {
    year = date.slice(string.indexOf('YY'), string.indexOf('YY') + 2);
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY'
        && fromFormat.includes('YYYY')) {
      newFormat.push(year);
    } else if (fromFormat[i] === 'YYYY'
              && toFormat.includes('YY')) {
      newFormat.push(year[2] + year[3]);
    } else if (fromFormat[i] === 'YY'
              && toFormat.includes('YY')) {
      newFormat.push(year);
    } else if (fromFormat[i] === 'YY'
              && toFormat.includes('YYYY')
              && year < 30) {
      newFormat.push(20 + year);
    } else if (fromFormat[i] === 'YY'
              && toFormat.includes('YYYY')
              && year >= 30) {
      newFormat.push(19 + year);
    } else if (toFormat[i] === 'MM') {
      newFormat.push(month);
    } else if (toFormat[i] === 'DD') {
      newFormat.push(day);
    }
  }

  return newFormat.join(separator);
}

module.exports = formatDate;
