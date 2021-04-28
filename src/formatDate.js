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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const startFormat = fromFormat.slice(0, 3);
  const endFormat = toFormat.slice(0, 3);
  const oldDate = date.split(oldSeparator);
  const dayMonthYear = {};
  const dateParts = [];

  for (let i = oldDate.length; i > 0; i--) {
    dayMonthYear[startFormat[startFormat.length - i]] = oldDate[startFormat.length - i];
  }

  if (dayMonthYear.YY >= 30) {
    dayMonthYear.YYYY = `${(+dayMonthYear.YY + 1900)}`;
  }

  if (dayMonthYear.YY < 30) {
    dayMonthYear.YYYY = `${(+dayMonthYear.YY + 2000)}`;
  }

  if (dayMonthYear.YYYY) {
    dayMonthYear.YY = dayMonthYear.YYYY.slice(2);
  }

  for (let j = 0; j < endFormat.length; j++) {
    dateParts.push(dayMonthYear[endFormat[j]]);
  }

  return dateParts.join(newSeparator);
}

module.exports = formatDate;
