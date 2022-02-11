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
  const obj = {}; // type as key & number as value
  const arrForJoin = [];
  const dateSplit = date.split(`${fromFormat[3]}`);

  for (let i = 0; i < dateSplit.length; i++) {
    obj[fromFormat[i].slice(-2)] = dateSplit[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const number = obj[toFormat[i].slice(-2)];

    if (toFormat[i].slice(-2) !== 'YY') {
      arrForJoin.push(number);
    } else {
      switch (number.length) {
        case 2:
          if (toFormat[i].length === 4) {
            if (+number.slice(-2) < 30) {
              arrForJoin.push(`20${number}`);
            } else {
              arrForJoin.push(`19${number}`);
            }
          } else {
            arrForJoin.push(number);
          }
          break;

        case 4:
          if (toFormat[i].length === 2) {
            arrForJoin.push(number.slice(-2));
          } else {
            arrForJoin.push(number);
          }
      }
    }
  }

  return arrForJoin.join(`${toFormat[3]}`);
}

module.exports = formatDate;
