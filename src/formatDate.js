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
  const arrDate = date.split(fromFormat[3]);
  const toIndexDD = toFormat.lastIndexOf('DD');
  const toIndexMM = toFormat.lastIndexOf('MM');
  const fromIndexDD = fromFormat.lastIndexOf('DD');
  const fromIndexMM = fromFormat.lastIndexOf('MM');
  let fromIndexYY = 0;
  let toIndexYY = 0;
  const newDate = [];

  fromFormat.forEach((el, i) => {
    if (el === 'YY' || el === 'YYYY') {
      fromIndexYY = i;
    }
  });

  toFormat.forEach((el, i) => {
    if (el === 'YY' || el === 'YYYY') {
      toIndexYY = i;
    }
  });

  if (fromFormat[fromIndexYY].length === 4
    && toFormat[toIndexYY].length === 2) {
    arrDate[fromIndexYY] = arrDate[fromIndexYY].slice(2);
  }

  if (fromFormat[fromIndexYY].length === 2
    && toFormat[toIndexYY].length === 4 && arrDate[fromIndexYY] < 30) {
    arrDate[fromIndexYY] = '20' + arrDate[fromIndexYY];
  }

  if (fromFormat[fromIndexYY].length === 2
    && toFormat[toIndexYY].length === 4 && arrDate[fromIndexYY].length !== 4) {
    arrDate[fromIndexYY] = '19' + arrDate[fromIndexYY];
  }

  newDate[toIndexDD] = arrDate[fromIndexDD];
  newDate[toIndexMM] = arrDate[fromIndexMM];
  newDate[toIndexYY] = arrDate[fromIndexYY];

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
