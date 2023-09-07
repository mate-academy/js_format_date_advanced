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
  const YEAR = 'YY';
  const FULL_YEAR = 'YYYY';
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];

  const splitDate = date.split(OLD_SEPARATOR);

  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {

    for (let j = 0; j < fromFormat.length - 1; j++) {
      if (toFormat[i] === fromFormat[j]) {
        newDate[i] = splitDate[j];
        break;
      }

      else if (fromFormat[j] === FULL_YEAR && toFormat[i] === YEAR) {
        newDate[i] = splitDate[j] % 100;
      }

      else if (fromFormat[j] === YEAR && toFormat[i] === FULL_YEAR) {
        newDate[i] = convertToYYYY(splitDate[j]);
      }
    }
  }

  return  newDate.join(NEW_SEPARATOR);
}

function convertToYYYY(yy) {
  if (yy >= 0 && yy <= 99) {
    if (yy < 30) {
      return 20 + yy;
    } else {
      return 19 + yy;
    }
  }
}

formatDate(
  '2012-12-21',
  ['YYYY', 'MM', 'DD', '-'],
  ['DD', 'MM', 'YYYY', '-'],
);

module.exports = formatDate;
