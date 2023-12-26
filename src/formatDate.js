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
  const ZERO_YEAR = '00';
  const NINGHTEENTH_YEAR = '19';
  const THIRTIETH_YEAR = '30';
  const TWENTIETH_YEAR = '20';

  const newDate = [];

  const separateFrom = fromFormat.pop();
  const separateTo = toFormat.pop();

  const oldDate = date.split(separateFrom);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] !== 'YY' && toFormat[i] !== 'YY') {
      if (fromFormat[i] === toFormat[0]) {
        newDate[0] = oldDate[i];
      } else if (fromFormat[i] === toFormat[1]) {
        newDate[1] = oldDate[i];
      } else if (fromFormat[i] === toFormat[2]) {
        newDate[2] = oldDate[i];
      }
    } else {
      for (let j = 0; j < fromFormat.length; j++) {
        if (fromFormat[i] === 'YYYY') {
          newDate[i] = oldDate[j].slice(-2);
        } else if (fromFormat[j] === 'YY') {
          if (oldDate[j] === ZERO_YEAR) {
            newDate[i] = TWENTIETH_YEAR + oldDate[j];
          } else if (+oldDate[j] < THIRTIETH_YEAR) {
            newDate[i] = oldDate[j] + oldDate[j];
          } else if (+oldDate[j] >= THIRTIETH_YEAR) {
            newDate[i] = NINGHTEENTH_YEAR + oldDate[j];
          }
        }
      }
    }
  }

  return newDate.join(separateTo);
}

module.exports = formatDate;
