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
  const dateOld = date.split(fromFormat[fromFormat.length - 1]);
  const dateFormats = {};
  const dateNew = [];

  for (let i = 0; i < dateOld.length; i++) {
    dateFormats[fromFormat[i]] = dateOld[i];
  }

  if (fromFormat.includes('YYYY')) {
    dateFormats.YY = dateFormats.YYYY.slice(2);
  } else if (+dateFormats.YY < 30) {
    dateFormats.YYYY = 20 + dateFormats.YY;
  } else {
    dateFormats.YYYY = 19 + dateFormats.YY;
  }

  for (let i = 0; i < toFormat.length; i++) {
    for (const key in dateFormats) {
      if (toFormat[i] === key) {
        dateNew[i] = dateFormats[key];
      }
    }
  }

  return dateNew.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
