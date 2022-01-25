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
  const separator1 = fromFormat[3];
  const separator2 = toFormat[3];
  const r1 = date.split([separator1]);
  const r2 = [];
  // const nines = '19';
  // const tws = '20';
  // const c1 = toFormat[0];
  // const c2 = toFormat[1];
  // const c3 = toFormat[2];

  for (const e of toFormat) {
    if (e === 'YYYY') {
      for (let i = 0; i < 3; i++) {
        if (fromFormat[i] === e) {
          r2.push(r1[i]);
        } else if (fromFormat[i] === 'YY') {
          if (r1[i] >= 30) {
            r2.push(19 + r1[i]);
          } else if (r1[i] < 30) {
            r2.push(20 + r1[i]);
          }
        }
      }
    } else if (e === 'YY') {
      for (let i = 0; i < 3; i++) {
        if (fromFormat[i] === e) {
          r2.push(r1[i]);
        } else if (fromFormat[i] === 'YYYY') {
          if (r1[i] < 2000) {
            r2.push(r1[i] - 1900);
          } else if (r1[i] >= 2000) {
            r2.push(r1[i] - 2000);
          }
        }
      }
    } else {
      for (let i = 0; i < 3; i++) {
        if (fromFormat[i] === e) {
          r2.push(r1[i]);
        }
      }
    }
  }

  return r2.join(separator2);
}

module.exports = formatDate;
