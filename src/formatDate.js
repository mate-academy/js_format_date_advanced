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

  const oldDayIndex = fromFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');
  const oldYearIndex = fromFormat.includes('YY')
    ? fromFormat.indexOf('YY') : fromFormat.indexOf('YYYY');

  const newDayIndex = toFormat.indexOf('DD');
  const newMonthIndex = toFormat.indexOf('MM');
  const newYearIndex = toFormat.includes('YY')
    ? toFormat.indexOf('YY') : toFormat.indexOf('YYYY');

  const day = oldDate[oldDayIndex];
  const month = oldDate[oldMonthIndex];
  const oldYear = oldDate[oldYearIndex];

  const newYear = updateYear(oldYear, fromFormat, toFormat);
  const newDate = [];

  newDate[newDayIndex] = day;
  newDate[newMonthIndex] = month;
  newDate[newYearIndex] = newYear;

  return newDate.join(toFormat[3]);
}

function updateYear(year, oldFormat, newFormat) {
  let updatedYear = year;

  if (oldFormat.includes('YY') && newFormat.includes('YYYY')) {
    updatedYear = +year >= 30 ? `19${year}` : `20${year}`;
  }

  if (oldFormat.includes('YYYY') && newFormat.includes('YY')) {
    updatedYear = year.slice(2);
  }

  return updatedYear;
}

module.exports = formatDate;
