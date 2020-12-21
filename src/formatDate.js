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
  const from = fromFormat[3];
  const to = toFormat[3];

  const obj = {};
  const result = [];
  const value = date.split(from);

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i][0]) {
      case 'D':
        obj.D = value[i];
        break;

      case 'M':
        obj.M = value[i];
        break;

      case 'Y':
        obj.Y = value[i];

        if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
          obj.Y = value[i].slice(2, 4);
        }

        if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
          switch (true) {
            case (+value[i] >= 30):
              obj.Y = '19' + value[i];
              break;
            default:
              obj.Y = '20' + value[i];
          }
        }
    }
  }

  for (const key in obj) {
    for (let i = 0; i < 3; i++) {
      if (toFormat[i].includes(key)) {
        result[i] = obj[key];
      }
    }
  }

  return result.join(to);
}

module.exports = formatDate;
