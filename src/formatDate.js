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
  // write code here
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const OLD_DATE = date.split(OLD_SEPARATOR);
  const OLD_YEAR_FORMAT = fromFormat.includes('YYYY') ? 'YYYY' : 'YY';
  const NEW_YEAR_FORMAT = toFormat.includes('YYYY') ? 'YYYY' : 'YY';
  const OLD_YEAR_POSITION = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY') : fromFormat.indexOf('YY');
  const NEW_YEAR_POSITION = toFormat.includes('YYYY')
    ? toFormat.indexOf('YYYY') : toFormat.indexOf('YY');

  const NEW_DATE = [];

  // find a day and a month
  NEW_DATE[toFormat.indexOf('DD')] = OLD_DATE[fromFormat.indexOf('DD')];
  NEW_DATE[toFormat.indexOf('MM')] = OLD_DATE[fromFormat.indexOf('MM')];

  // find a year
  fromFormat.indexOf('YYYY', 'YY');

  if (OLD_YEAR_FORMAT === NEW_YEAR_FORMAT) {
    NEW_DATE[NEW_YEAR_POSITION]
      = OLD_DATE[OLD_YEAR_POSITION];
  } else {
    if (OLD_YEAR_FORMAT === 'YYYY') {
      NEW_DATE[NEW_YEAR_POSITION]
      = OLD_DATE[OLD_YEAR_POSITION].slice(2, 4);
    } else {
      if (+OLD_DATE[OLD_YEAR_POSITION] >= 30) {
        NEW_DATE[NEW_YEAR_POSITION]
      = '19' + OLD_DATE[OLD_YEAR_POSITION];
      } else {
        NEW_DATE[NEW_YEAR_POSITION]
      = '20' + OLD_DATE[OLD_YEAR_POSITION];
      }
    }
  }

  return NEW_DATE.join(NEW_SEPARATOR);
}

module.exports = formatDate;
