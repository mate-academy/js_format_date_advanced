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
  const splitedDate = date.split(fromFormat[3]);
  const toSeparator = toFormat[3];
  const fromDate = {};

  fromDate[fromFormat[0]] = splitedDate[0];
  fromDate[fromFormat[1]] = splitedDate[1];
  fromDate[fromFormat[2]] = splitedDate[2];

  if (!fromDate.hasOwnProperty('YY') && toFormat.includes('YY')) {
    fromDate.YY = fromDate.YYYY.slice(2);
  }

  if (!fromDate.hasOwnProperty('YYYY') && toFormat.includes('YYYY')) {
    fromDate.YYYY = fromDate.YY < 30 ? `20${fromDate.YY}` : `19${fromDate.YY}`;
  }

  const formatedDate = [
    fromDate[toFormat[0]],
    fromDate[toFormat[1]],
    fromDate[toFormat[2]],
  ].join(toSeparator);

  return formatedDate;
}

module.exports = formatDate;
