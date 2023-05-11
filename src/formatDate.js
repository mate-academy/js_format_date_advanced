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
  const value = date.split(fromFormat[3]);
  const result = [];

  for (let k = 0; k < 3; k++) {
    switch (k) {
      case toFormat.indexOf('MM'):
        result.push(value[fromFormat.indexOf('MM')]);
        break;

      case toFormat.indexOf('DD'):
        result.push(value[fromFormat.indexOf('DD')]);
        break;

      case toFormat.indexOf('YY'):
        switch (value.join('').length) {
          case 6:
            result.push(value[fromFormat.indexOf('YY')]);
            break;

          case 8:
            result.push(value[fromFormat.indexOf('YYYY')]);
            break;
        }
        break;

      case toFormat.indexOf('YYYY'):
        switch (value.join('').length) {
          case 6:
            result.push(value[fromFormat.indexOf('YY')]);
            break;

          case 8:
            result.push(value[fromFormat.indexOf('YYYY')]);
            break;
        }
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' && result[i].length === 2) {
      if (+result[i] >= 30) {
        result[i] = `19${result[i]}`;
      }

      if (+result[i] < 30) {
        result[i] = `20${result[i]}`;
      }
    }

    if (toFormat[i] === 'YY' && result[i].length === 4) {
      result[i] = result[i].split('').slice(2).join('');
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
