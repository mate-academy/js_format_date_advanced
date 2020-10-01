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
  const splittedDate = date.split(fromFormat[3]);

  const oldDayIndex = fromFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');

  const oldYearIndex = fromFormat.includes('YYYY') 
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');
  const oldYearLength = fromFormat[oldYearIndex].length;

  const newDayIndex = toFormat.indexOf('DD');
  const newMonthIndex = toFormat.indexOf('MM');
  // eslint-disable-next-line max-len
  const newYearIndex = toFormat.includes('YYYY') ? toFormat.indexOf('YYYY') : toFormat.indexOf('YY');
  const newYearLength = toFormat[newYearIndex].length;
  const newSeparator = toFormat[3];

  const newSplittedDate = [];

  newSplittedDate[newDayIndex] = splittedDate[oldDayIndex];
  newSplittedDate[newMonthIndex] = splittedDate[oldMonthIndex];
  newSplittedDate[newYearIndex] = splittedDate[oldYearIndex];

  const century = newSplittedDate[newYearIndex].slice(0, 3) < 30 ? 20 : 19;

  if (newYearLength < oldYearLength) {
    newSplittedDate[newYearIndex] = newSplittedDate[newYearIndex].slice(2);
  }

  if (newYearLength > oldYearLength) {
    newSplittedDate[newYearIndex] = century + newSplittedDate[newYearIndex];
  }

  return newSplittedDate.join(newSeparator);
}

module.exports = formatDate;
