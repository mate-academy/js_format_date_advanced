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
  const dateFrom = date.split(fromFormat[3]);
  const result = [];

  const longYear = 'YYYY';
  const shortYear = 'YY';
  const fromLongYearIndex = fromFormat.indexOf(longYear);
  const fromShortYearIndex = fromFormat.indexOf(shortYear);
  const toLongYearIndex = toFormat.indexOf(longYear);
  const toShortYearIndex = toFormat.indexOf(shortYear);

  if (fromLongYearIndex >= 0 && toLongYearIndex < 0) {
    fromFormat[fromLongYearIndex] = shortYear;
    dateFrom[fromLongYearIndex] = dateFrom[fromLongYearIndex].slice(2);
  }

  if (fromShortYearIndex >= 0 && toShortYearIndex < 0) {
    fromFormat[fromShortYearIndex] = longYear;

    if (dateFrom[fromShortYearIndex] < 30) {
      dateFrom[fromShortYearIndex] = 20 + dateFrom[fromShortYearIndex];
    } else {
      dateFrom[fromShortYearIndex] = 19 + dateFrom[fromShortYearIndex];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === toFormat[i]) {
      result.push(dateFrom[i]);
    } else {
      const index = fromFormat.indexOf(toFormat[i]);

      result.push(dateFrom[index]);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
