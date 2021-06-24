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
  const strData = date.split(fromFormat[3]);
  const infoFromFormat = {};
  const infoToFormat = {};
  let toFormatResault = '';

  for (let i = 0; i < strData.length; i++) {
    infoFromFormat[fromFormat[i]] = strData[i];
    infoToFormat[toFormat[i]] = '';
  }

  for (const keyOld in infoFromFormat) {
    for (const keyNew in infoToFormat) {
      if (keyOld === keyNew) {
        infoToFormat[keyOld] = infoFromFormat[keyNew];
      } else if (keyNew === 'YYYY' && keyOld !== 'YYYY') {
        if (infoFromFormat['YY'] < 21 && infoFromFormat['YY'] >= 0) {
          infoToFormat[keyNew] = '20' + infoFromFormat['YY'];
        } else if (infoFromFormat['YY'] > 21 && infoFromFormat['YY'] < 100) {
          infoToFormat[keyNew] = '19' + infoFromFormat['YY'];
        }
      } else if (keyNew === 'YY' && keyOld === 'YYYY') {
        infoToFormat[keyNew] = infoFromFormat[keyOld].slice(2, 4);
      }
    }
  }

  for (const i in infoToFormat) {
    toFormatResault += infoToFormat[i];
    toFormatResault += toFormat[3];
  }

  return toFormatResault.slice(0, toFormatResault.length - 1);
}

module.exports = formatDate;
