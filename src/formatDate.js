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
  const holder = {};
  const formating = date.split(`${fromFormat[3]}`);
  const toJoin = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    holder[fromFormat[i].slice(-2)] = formating[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const holderValue = holder[toFormat[i].slice(-2)];

    if (toFormat[i][0] !== 'Y') {
      toJoin.push(holderValue);
    } else {
      switch (holderValue.length) {
        case 4:
          if (toFormat[i].length === 4) {
            toJoin.push(holderValue);
          } else {
            toJoin.push(holderValue.slice(-2));
          }
          break;

        case 2:
          if (toFormat[i].length === 4) {
            if (+holderValue.slice(-2) < 30) {
              toJoin.push('20' + holderValue);
            } else {
              toJoin.push('19' + holderValue);
            }
          } else {
            toJoin.push(holderValue);
          }
      }
    }
  }

  return toJoin.join(`${toFormat[3]}`);
}

module.exports = formatDate;
