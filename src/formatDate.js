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
  const delim = toFormat[3];
  const oldDate = date.split(fromFormat[3]);
  const dateObj = {
    [fromFormat[0]]: oldDate[0],
    [fromFormat[1]]: oldDate[1],
    [fromFormat[2]]: oldDate[2],
  };
  let oldYearIndex = 0;
  let oldYearFormat = 2;
  let newYearIndex = 0;
  let newYearFormat = 2;

  if (fromFormat.indexOf('YY') !== -1) {
    oldYearIndex = fromFormat.indexOf('YY');
  } else {
    oldYearIndex = fromFormat.indexOf('YYYY');
    oldYearFormat = 4;
  }

  if (toFormat.indexOf('YY') !== -1) {
    newYearIndex = toFormat.indexOf('YY');
  } else {
    newYearIndex = toFormat.indexOf('YYYY');
    newYearFormat = 4;
  }

  if (oldYearFormat !== newYearFormat) {
    if (oldYearFormat === 4) {
      dateObj[toFormat[newYearIndex]] = oldDate[oldYearIndex].slice(-2);
    } else {
      if (oldDate[oldYearIndex] < 30) {
        dateObj[toFormat[newYearIndex]] = '20' + oldDate[oldYearIndex];
      } else {
        dateObj[toFormat[newYearIndex]] = '19' + oldDate[oldYearIndex];
      }
    }
  }

  return dateObj[toFormat[0]]
    + delim + dateObj[toFormat[1]] + delim + dateObj[toFormat[2]];
}

module.exports = formatDate;
