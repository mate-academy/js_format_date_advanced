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
  let str = date;
  const century19 = '19';
  const century20 = '20';
  const border = 29;

  if (fromFormat[3] !== toFormat[3]) {
    switch (fromFormat[3]) {
      case '-':
        str = date.replace(/-/g, toFormat[3]);
        break;
      case '/':
        str = date.replace(/\//g, toFormat[3]);
        break;
    }
  }

  for (let i = 0; i <= 2; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        if ((toFormat[i] === 'DD') && (toFormat[i + 2] === 'YYYY')) {
          str = date.slice(8) + date.slice(4, 8) + date.slice(0, 4);
        }

        break;

      case 'YY':
        if ((Number(str.slice(0, 2)) < border)
            && (Number(str.slice(0, 2)) >= 0)) {
          str = century20 + str;
        } else {
          str = century19 + str;
        }

        break;

      case 'MM':
        if (fromFormat[i + 2] === 'YYYY') {
          str = date.slice(0, 6) + date.slice(8);
        }

        if (fromFormat[i + 2] === 'DD') {
          str = date.slice(8) + toFormat[3] + date.slice(0, 7);
        }

        break;
    }

    return str;
  }
}

module.exports = formatDate;
