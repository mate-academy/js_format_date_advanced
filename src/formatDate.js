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
  const dateSeparate = date.split(`${fromFormat[fromFormat.length - 1]}`);

  if (fromFormat[0] === 'YY' && toFormat.includes('YYYY')) {
    if (dateSeparate[0] < 30) {
      dateSeparate[0] = '20' + dateSeparate[0];
    } else {
      dateSeparate[0] = '19' + dateSeparate[0];
    }
  }

  if (fromFormat[0] === 'YYYY' && toFormat.includes('YY')) {
    dateSeparate[0] = dateSeparate[0].slice(2);
  }

  if (fromFormat[0] === 'DD' && toFormat.includes('YYYY')) {
    if (dateSeparate[2] < 30) {
      dateSeparate[2] = '19' + fromFormat[2];
    } else {
      dateSeparate[2] = '20' + fromFormat[2];
    }
  }

  if (fromFormat[2] === 'YYYY' && toFormat.includes('YY')) {
    dateSeparate[2] = dateSeparate[2].slice(2);
  }

  switch (true) {
    case fromFormat[0].includes('Y') && !toFormat[0].includes('Y'):
    case fromFormat[0].includes('D') && toFormat[0].includes('Y'):
      dateSeparate.reverse();
  }

  return dateSeparate.join(`${toFormat[toFormat.length - 1]}`);
}

module.exports = formatDate;
