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
  const DATE_PARTS = date.split(fromFormat[fromFormat.length - 1]);
  let newDate = '';

  if (toFormat[0] === 'DD') {
    for (let i = 0; i < toFormat.length - 1; i++) {
      const INDEX = fromFormat.indexOf(toFormat[i]);

      if (INDEX !== -1) {
        if (fromFormat[INDEX] === 'YYYY' && toFormat[i] === 'YY') {
          newDate += DATE_PARTS[INDEX].slice(-2);
        } else {
          newDate += DATE_PARTS[INDEX];
        }
      } else if (toFormat[i] === 'YYYY') {
        const YEAR_INDEX = toFormat.indexOf('YYYY');
        const YEAR = DATE_PARTS[YEAR_INDEX];

        newDate += YEAR;
      } else if (toFormat[i] === 'YY') {
        const YEAR_INDEX = toFormat.indexOf('YY');
        const YEAR = DATE_PARTS[YEAR_INDEX].slice(-2);

        newDate += YEAR;
      } else {
        newDate += toFormat[i];
      }

      if (i !== toFormat.length - 2) {
        newDate += toFormat[toFormat.length - 1];
      }
    }
  } else {
    for (let i = 0; i < toFormat.length - 1; i++) {
      const INDEX = toFormat.indexOf(toFormat[i]);

      if (INDEX !== -1) {
        if (fromFormat[INDEX] === 'YY' && toFormat[i] === 'YYYY') {
          newDate += DATE_PARTS[INDEX] < 30 ? '20' : '19';
        }

        if (fromFormat[INDEX] === 'YYYY' && toFormat[i] === 'YY') {
          newDate += DATE_PARTS[INDEX].slice(-2);
        } else {
          newDate += DATE_PARTS[INDEX];
        }
      }

      if (i !== toFormat.length - 2) {
        newDate += toFormat[toFormat.length - 1];
      }
    }
  }

  return newDate;
}

module.exports = formatDate;
