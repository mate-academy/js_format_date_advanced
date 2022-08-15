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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldFormat = fromFormat.splice(0, 3);
  const newFormat = toFormat.splice(0, 3);
  const rawDate = date.split(oldSeparator);

  let newDate = '';

  for (let j = 0; j < newFormat.length; j++) {
    for (let i = 0; i < oldFormat.length; i++) {
      if (newFormat[j] === oldFormat[i]) {
        newDate += rawDate[i];
        break;
      }

      if (i === oldFormat.length - 1
        && newFormat[j] !== oldFormat[i]
        && newFormat[j] === 'YY') {
        newDate += rawDate[i].toString().slice(-2);
      }

      if (i === oldFormat.length - 1
        && newFormat[j] !== oldFormat[i]
        && newFormat[j] === 'YYYY') {
        if (+rawDate[0] < 30) {
          newDate += '20' + rawDate[0];
        } else {
          newDate += '19' + rawDate[0];
        }
      }
    }

    if (j !== newFormat.length - 1) {
      newDate += newSeparator;
    }
  }

  return newDate;
}

module.exports = formatDate;
