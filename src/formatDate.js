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
  const oldDate = date.split(fromFormat[3]);

  const oldYearIndex = fromFormat.findIndex(item => item === 'YY'
    || item === 'YYYY');

  const oldYearLength = fromFormat[oldYearIndex].length;

  let fullYear = oldDate[oldYearIndex];

  if (oldYearLength === 2) {
    fullYear = +fullYear < 30 ? 20 + fullYear : 19 + fullYear;
  }

  const day = oldDate[fromFormat.findIndex(item => item === 'DD')];
  const month = oldDate[fromFormat.findIndex(item => item === 'MM')];

  const newYearIndex = toFormat.findIndex(item => item === 'YY'
    || item === 'YYYY');

  const newYearLength = toFormat[newYearIndex].length;
  let newYear = fullYear;

  if (newYearLength === 2) {
    newYear = fullYear.slice(2);
  }

  const newMonthIndex = toFormat.findIndex(item => item === 'MM');
  const newDayIndex = toFormat.findIndex(item => item === 'DD');
  const newDate = new Array(3);

  newDate[newDayIndex] = day;
  newDate[newMonthIndex] = month;
  newDate[newYearIndex] = newYear;

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
