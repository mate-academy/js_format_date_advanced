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
  const tempDate = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('YYYY')) {
      for (let j = 0; j < toFormat.length - 1; j++) {
        if (toFormat[j].includes('YYYY')) {
          newDate[j] = +tempDate[i];
        // eslint-disable-next-line max-len
        } else if (toFormat[j].includes('YY') && tempDate[i] > 1900 && tempDate[i] < 2000) {
          newDate[j] = +tempDate[i] - 1900;
        } else if (toFormat[j].includes('YY') && tempDate[i] >= 2000) {
          newDate[j] = +tempDate[i] - 2000;
        }
      }
    }

    if (fromFormat[i].includes('YY') && fromFormat[i].length === 2) {
      for (let j = 0; j < toFormat.length - 1; j++) {
        if (toFormat[j].includes('YY') && toFormat[j].length === 2) {
          newDate[j] = +tempDate[i];
        } else if (toFormat[j].includes('YYYY') && tempDate[i] < 30) {
          newDate[j] = +tempDate[i] + 2000;
        } else if (toFormat[j].includes('YYYY') && tempDate[i] >= 30) {
          newDate[j] = +tempDate[i] + 1900;
        }
      }
    }

    if (fromFormat[i].includes('MM')) {
      for (let j = 0; j < toFormat.length - 1; j++) {
        if (toFormat[j].includes('MM')) {
          newDate[j] = tempDate[i];
        }
      }
    }

    if (fromFormat[i].includes('DD')) {
      for (let j = 0; j < toFormat.length - 1; j++) {
        if (toFormat[j].includes('DD')) {
          newDate[j] = tempDate[i];
        }
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
