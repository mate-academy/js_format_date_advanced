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
  let newDate = '';
  const newArray = [];

  const oldDate = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD' || toFormat[i] === 'MM') {
      for (let j = 0; j < fromFormat.length - 1; j++) {
        if (fromFormat[j] === toFormat[i]) {
          newArray[i] = oldDate[j];
        }
      }
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      for (let j = 0; j < fromFormat.length - 1; j++) {
        if (fromFormat[j] === 'YY' && toFormat[i] === 'YYYY') {
          const year = parseInt(oldDate[j], 10);

          newArray[i] = (year < 30 ? '20' : '19')
          + (year < 10 ? '0' : '') + year;
        } else if (fromFormat[j] === 'YYYY' && toFormat[i] === 'YY') {
          newArray[i] = oldDate[j].substring(2);
        } else if (fromFormat[j] === toFormat[i]) {
          newArray[i] = oldDate[j];
        }
      }
    }
  }

  newDate = newArray.join(toFormat[toFormat.length - 1]);

  return newDate;
}

module.exports = formatDate;
