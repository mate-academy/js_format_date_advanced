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
  const SHORT_YEAR = 'YY';
  const LONG_YEAR = 'YYYY';
  const DAY = 'DD';
  const MONTH = 'MM';
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];

  const dateArray = date.split(OLD_SEPARATOR);
  const dateObject = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  for (const element of toFormat) {
    if (element === DAY) {
      result.push(dateObject[DAY]);
    }

    if (element === MONTH) {
      result.push(dateObject[MONTH]);
    }

    if (element === SHORT_YEAR && dateObject.hasOwnProperty(LONG_YEAR)) {
      result.push(dateObject[LONG_YEAR].slice(2));
    }

    if (element === LONG_YEAR && dateObject.hasOwnProperty(SHORT_YEAR)) {
      if (+dateObject[SHORT_YEAR] < 30) {
        result.push(`20${dateObject[SHORT_YEAR]}`);
      } else {
        result.push(`19${dateObject[SHORT_YEAR]}`);
      }
    }

    if (element === LONG_YEAR && dateObject.hasOwnProperty(LONG_YEAR)) {
      result.push(dateObject[LONG_YEAR]);
    }
  }

  return result.join(NEW_SEPARATOR);
}

module.exports = formatDate;
