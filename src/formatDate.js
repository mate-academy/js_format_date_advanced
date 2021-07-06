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
  const sep = fromFormat[3];
  const newSep = toFormat[3];
  const data = date.split(sep);
  let y = '';
  let m = '';
  let d = '';
  const result = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      y = data[i];
    }

    if (fromFormat[i] === 'MM') {
      m = data[i];
    }

    if (fromFormat[i] === 'DD') {
      d = data[i];
    }
  }

  for (let j = 0; j < 3; j++) {
    if (toFormat[j] === 'YYYY' || toFormat[j] === 'YY') {
      if (toFormat[j] === 'YYYY') {
        if (y.length === 4) {
          result[j] = y;
        } else {
          const x = +y;

          if (x < 30) {
            result[j] = '20' + y;
          } else {
            result[j] = '19' + y;
          }
        }
      } else {
        if (y.length === 2) {
          result[j] = y;
        } else {
          result[j] = y.slice(2);
        }
      }
    }

    if (toFormat[j] === 'DD') {
      result[j] = d;
    }

    if (toFormat[j] === 'MM') {
      result[j] = m;
    }
  }

  const newData = result.join(newSep);

  return newData;
}

module.exports = formatDate;
