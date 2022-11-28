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
  // if (fromFormat[0] === 'YYYY' && toFormat[0] === 'YYYY') {
  //   return date.split(fromFormat[3]).join(toFormat[3]);
  // }

  // if (fromFormat[0] === 'YYYY' && toFormat[0] === 'DD') {
  //   return date.split(fromFormat[3]).reverse().join(toFormat[3]);
  // }

  const [data1, data2, data3] = date.split(fromFormat[3]);

  fromFormat[0] = `${fromFormat[0]}` + `${data1}`;
  fromFormat[1] = `${fromFormat[1]}` + `${data2}`;
  fromFormat[2] = `${fromFormat[2]}` + `${data3}`;

  for (let i = 0; i < 3; i++) {
    for (let y = 0; y < 3; y++) {
      if (toFormat[i] === 'YYYY' && fromFormat[y].length === 4) {
        if (Number(fromFormat[y].slice(2)) < 30) {
          toFormat[i] = `${fromFormat[y].slice(0, 2)}` + `20` + `${fromFormat[y].slice(2)}`;
        } else {
          toFormat[i] = `${fromFormat[y].slice(0, 2)}` + `19` + `${fromFormat[y].slice(2)}`;
        }
      } else if (toFormat[i] === 'YY' && fromFormat[y].length === 8) {
        toFormat[i] = `${fromFormat[y].slice(0, 2)}` + `${fromFormat[y].slice(6)}`;
      } else {
        if (toFormat[i].slice(0, 1) === fromFormat[y].slice(0, 1)) {
          toFormat[i] = fromFormat[y];
        }
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i].length > 6) {
      toFormat[i] = toFormat[i].slice(4);
    } else {
      toFormat[i] = toFormat[i].slice(2);
    }
  }

  return `${toFormat[0]}${toFormat[3]}${toFormat[1]}${toFormat[3]}${toFormat[2]}`;
}

module.exports = formatDate;
