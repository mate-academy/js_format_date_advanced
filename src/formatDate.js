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
  const FULL_YEAR = 'YYYY';
  const SHORT_YEAR = 'YY';
  const MONTH = 'MM';
  const DAY = 'DD';

  let year;
  let month;
  let day;

  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const toParts = [];
  const fromParts = date.split(fromSeparator);

  for (let i = 0; i < fromParts.length; i++) {
    if (fromFormat[i] === FULL_YEAR) {
      year = fromParts[i];
    }

    if (fromFormat[i] === SHORT_YEAR) {
      if (fromParts[i] < 30) {
        year = `${20}` + fromParts[i];
      }

      if (fromParts[i] >= 30) {
        year = `${19}` + fromParts[i];
      }
    }

    if (fromFormat[i] === MONTH) {
      month = fromParts[i];
    }

    if (fromFormat[i] === DAY) {
      day = fromParts[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j] === FULL_YEAR) {
      toParts.push(year);
    }

    if (toFormat[j] === SHORT_YEAR) {
      toParts.push(year[2] + year[3]);
    }

    if (toFormat[j] === MONTH) {
      toParts.push(month);
    }

    if (toFormat[j] === DAY) {
      toParts.push(day);
    }
  }

  return toParts.join(toSeparator);
}

module.exports = formatDate;
