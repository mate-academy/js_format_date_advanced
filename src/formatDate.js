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
  const oldFormat = fromFormat.slice(0, 3);
  const oldSeparator = fromFormat.slice(-1);

  const newFormat = toFormat.slice(0, 3);
  const newSeparator = toFormat.slice(-1);

  const oldDateParts = date.split(oldSeparator);
  const newDateParts = [];
  let newIndex = 0;

  for (let i = 0; i < oldDateParts.length; i++) {
    switch (oldFormat[i]) {
      case 'YYYY':
        newIndex = newFormat.indexOf(oldFormat[i]);

        if (newIndex >= 0) {
          newDateParts[newIndex] = oldDateParts[i];
        }

        if (newIndex < 0) {
          newIndex = newFormat.indexOf('YY');
          newDateParts[newIndex] = oldDateParts[i].slice(-2);
        }

        break;

      case 'YY':
        newIndex = newFormat.indexOf(oldFormat[i]);

        if (newIndex >= 0) {
          newDateParts[newIndex] = oldDateParts[i];
        }

        if (newIndex < 0) {
          newIndex = newFormat.indexOf('YYYY');

          if (oldDateParts[i] < 30) {
            newDateParts[newIndex] = '20' + oldDateParts[i];
          } else {
            newDateParts[newIndex] = '19' + oldDateParts[i];
          }
        }

        break;

      case 'MM':
        newIndex = newFormat.indexOf(oldFormat[i]);
        newDateParts[newIndex] = oldDateParts[i];
        break;

      case 'DD':
        newIndex = newFormat.indexOf(oldFormat[i]);
        newDateParts[newIndex] = oldDateParts[i];
        break;

      default:
        throw new Error('Unknown format');
    }
  }

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
