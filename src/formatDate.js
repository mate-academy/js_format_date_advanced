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
  const arrDate = date.split(`${fromFormat[3]}`);
  const toIndexYYYY = toFormat.indexOf('YYYY');
  const toIndexYY = toFormat.indexOf('YY');
  const toIndexMM = toFormat.indexOf('MM');
  const toIndexDD = toFormat.indexOf('DD');
  const newDate = ['', '', ''];

  for (let i = 0; i < arrDate.length; i++) {
    if (toIndexYY >= 0) {
      if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
        newDate[toIndexYY] = arrDate[i].slice(-2);
      }
    } else {
      if (fromFormat[i] === 'YY') {
        if (+arrDate[i] < 30) {
          newDate[toIndexYYYY] = `20${arrDate[i]}`;
        } else {
          newDate[toIndexYYYY] = `19${arrDate[i]}`;
        }
      }

      if (fromFormat[i] === 'YYYY') {
        newDate[toIndexYYYY] = arrDate[i];
      }
    }

    if (fromFormat[i] === 'MM') {
      newDate[toIndexMM] = arrDate[i];
    }

    if (fromFormat[i] === 'DD') {
      newDate[toIndexDD] = arrDate[i];
    }
  }

  return newDate.join(`${toFormat[3]}`);
}

module.exports = formatDate;
