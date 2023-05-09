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
  const result = [];
  const oldFormat = fromFormat[3];
  const newFormat = toFormat[3];

  let year; let month; let day = '';

  for (let i = 0; i < 3; i++) {
    const phase = date.split(oldFormat)[i];

    switch (fromFormat[i]) {
      case 'YYYY':
        year = phase;
        break;

      case 'YY':
        if (phase < 30) {
          year = (20 + phase);
        } else {
          year = (19 + phase);
        }
        break;

      case 'MM':
        month = phase;
        break;

      case 'DD':
        day = phase;
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        result.push(year);
        break;

      case 'YY':
        result.push(year.slice(2));
        break;

      case 'MM':
        result.push(month);
        break;

      case 'DD':
        result.push(day);
        break;

      default:
        break;
    }
  }

  return result.join(newFormat);
}

module.exports = formatDate;
