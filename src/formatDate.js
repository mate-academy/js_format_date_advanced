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
  const fromDateArray = date.split(fromFormat[fromFormat.length - 1]);

  const yearIndex = fromFormat.findIndex(str => str.startsWith('Y'));

  let year = fromDateArray[yearIndex];

  const neededYearIndex = toFormat.findIndex(str => str.startsWith('Y'));

  if (fromFormat[yearIndex].length < toFormat[neededYearIndex].length) {
    year = year < 30 ? year.padStart(4, '20') : year.padStart(4, '19');
  }

  if (fromFormat[yearIndex].length > toFormat[neededYearIndex].length) {
    year = year.slice(2);
  }

  const month = fromDateArray[fromFormat.indexOf('MM')];
  const day = fromDateArray[fromFormat.indexOf('DD')];

  const neededMonthIndex = toFormat.indexOf('MM');
  const neededDayIndex = toFormat.indexOf('DD');

  const toDateArray = [];

  toDateArray[neededYearIndex] = year;
  toDateArray[neededMonthIndex] = month;
  toDateArray[neededDayIndex] = day;

  return toDateArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
