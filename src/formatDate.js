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
  const FormatObj = {};

  FormatObj[fromFormat[0]] = date.split(fromFormat[3])[0];
  FormatObj[fromFormat[1]] = date.split(fromFormat[3])[1];
  FormatObj[fromFormat[2]] = date.split(fromFormat[3])[2];
  FormatObj.delim = fromFormat[3];

  for (let i = 0; i < 3; i++) {
    if (!(toFormat[i] in FormatObj)) {
      if (toFormat[i] === 'YY') {
        FormatObj[toFormat[i]] = FormatObj['YYYY'][2] + FormatObj['YYYY'][3];
      }

      if (toFormat[i] === 'YYYY') {
        if (FormatObj['YY'] < 30) {
          FormatObj[toFormat[i]] = '20' + FormatObj['YY'];
        } else {
          FormatObj[toFormat[i]] = '19' + FormatObj['YY'];
        }
      }
    }
  }

  return (FormatObj[toFormat[0]] + toFormat[3]
     + FormatObj[toFormat[1]] + toFormat[3]
     + FormatObj[toFormat[2]]);
}

module.exports = formatDate;
