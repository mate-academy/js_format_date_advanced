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
  const separator = toFormat[3];
  const dateToArray = date.split(fromFormat[3]);
  const fromDates = {};
  const toDates = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    fromDates[fromFormat[i]] = dateToArray[i];
    toDates[toFormat[i]] = 0;
  }

  let keyYearFrom = '';

  for (const key in fromDates) {
    if (key.includes('YY')) {
      keyYearFrom = key;
    }
  }

  let keyYearTo = '';

  for (const key in toDates) {
    if (key.includes('YY')) {
      keyYearTo = key;
    }
  }

  if (keyYearFrom.length > keyYearTo.length) {
    fromDates[keyYearTo] = fromDates[keyYearFrom].toString().slice(2);
  }

  fromDates[keyYearTo] = keyYearFrom.length < keyYearTo.length && fromDates[keyYearFrom] < 30 ? `20${fromDates[keyYearFrom]}`
    : fromDates[keyYearTo];

  fromDates[keyYearTo] = keyYearFrom.length < keyYearTo.length && fromDates[keyYearFrom] >= 30 ? `19${fromDates[keyYearFrom]}`
    : fromDates[keyYearTo];

  return `${fromDates[toFormat[0]]}${separator}` + `${fromDates[toFormat[1]]}${separator}` + `${fromDates[toFormat[2]]}`;
}

module.exports = formatDate;
