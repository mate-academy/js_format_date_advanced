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
  const separator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(separator);
  const changeDataParts = [];
  const dateYear = {};

  for (let i = 0; i < 3; i++) {
    dateYear[fromFormat[i]] = dateParts[i];
  }

  if (fromFormat.includes('YYYY')) {
    dateYear['YY'] = dateYear['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY')) {
    const dateYearShort = parseInt(dateYear['YY']);

    dateYear['YYYY'] = dateYearShort < 30
      ? `20${dateYear['YY']}`
      : `19${dateYear['YY']}`;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    changeDataParts.push(dateYear[toFormat[i]]);
  }

  const formattedDate = changeDataParts.join(toFormat[toFormat.length - 1]);

  return formattedDate;
}

module.exports = formatDate;
