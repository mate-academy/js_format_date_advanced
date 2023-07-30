/* eslint-disable max-len */
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
  const oldDate = date.split(fromFormat[3]);
  let newDate = [''];

  if (fromFormat.indexOf('YYYY') !== -1) { // if we shorten YYYY to YY
    if (toFormat.indexOf('YY') !== -1) {
      toFormat[toFormat.indexOf('YY')] = 'YYYY';
      oldDate[fromFormat.indexOf('YYYY')] = oldDate[fromFormat.indexOf('YYYY')].toString().slice(2);
    }
  }

  if (fromFormat.indexOf('YY') !== -1) { // if we extend YY to YYYY
    if (toFormat.indexOf('YYYY') !== -1) {
      toFormat[toFormat.indexOf('YYYY')] = 'YY';

      switch (true) {
        case oldDate[fromFormat.indexOf('YY')] < '30': // if we extend YY < 30 to YYYY
        case oldDate[fromFormat.indexOf('YY')] === '00': // if we extend YY = 00 to YYYY
          oldDate[fromFormat.indexOf('YY')] = 20 + '' + oldDate[fromFormat.indexOf('YY')];
          break;

        case oldDate[fromFormat.indexOf('YY')] === '30': // if we extend YY = 30 to YYYY
        case oldDate[fromFormat.indexOf('YY')] > '30': // if we extend YY > 30 to YYYY
          oldDate[fromFormat.indexOf('YY')] = 19 + '' + oldDate[fromFormat.indexOf('YY')];
          break;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (toFormat[i] === fromFormat[j]) {
        newDate[i] = oldDate[j];
      }
    }
  }
  newDate = newDate.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
