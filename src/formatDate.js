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
  const dateToChange = date.split(fromFormat[3]);
  let fromYearFormat = 0;
  let toYearFormat = 0;
  const separator = toFormat[3];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].startsWith('Y')) {
      fromYearFormat = fromFormat[i].length;
      fromFormat[i] = 'Y';
    }

    if (toFormat[i].startsWith('Y')) {
      toYearFormat = toFormat[i].length;
      toFormat[i] = 'Y';
    }
  }

  for (let i = 0; i < fromFormat.length; i++) {
    const idx = toFormat.indexOf(fromFormat[i]);

    toFormat[idx] = dateToChange[i];

    if (fromFormat[i] === 'Y') {
      if (fromYearFormat === 4 && toYearFormat === 2) {
        toFormat[idx] = dateToChange[i].slice(2);
      } else if (fromYearFormat === 2 && toYearFormat === 4) {
        if (Number(dateToChange[i]) < 30) {
          toFormat[idx] = `20${dateToChange[i]}`;
        } else {
          toFormat[idx] = `19${dateToChange[i]}`;
        }
      }
    }
  }

  const result = toFormat.slice(0, 3).join(separator);

  return result;
}

module.exports = formatDate;
