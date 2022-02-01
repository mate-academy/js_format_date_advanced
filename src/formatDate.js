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
  const obj = {};
  const result = [];
  const form = date.split(fromFormat[3]);

  for (let i = 0; i < form.length; i++) {
    obj[fromFormat[i]] = form[i];
  }

  for (let x = 0; x < toFormat.length; x++) {
    switch (toFormat[x]) {
      case 'DD':
        result[x] = obj['DD'];
        break;

      case 'MM':
        result[x] = obj['MM'];
        break;

      case 'YY':
        if (obj['YY'] !== undefined) {
          result[x] = obj['YY'];
        } else {
          const y = +obj['YYYY'];

          if (y <= 2000) {
            result[x] = 100 - (2000 - y);
          } else if (y > 2000) {
            result[x] = (2000 - +y);
          };
        };
        break;

      case 'YYYY':
        if (obj['YYYY'] !== undefined) {
          result[x] = obj['YYYY'];
        } else {
          const s = +obj['YY'];

          if (s >= 30 && s < 100) {
            result[x] = (1900 + +s);
          } else if (+s < 30) {
            result[x] = (2000 + +s);
          };
        };
        break;

      default:
        break;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
