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
 *   ['DD', 'MM', 'YY', '/'],`
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
  const divider = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(divider);
  const yearIndex = fromFormat.indexOf('YYYY') !== -1
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');

  const year = dateParts[yearIndex];
  let shortYear = '';

  if (year.length === 4) {
    shortYear = year.slice(2);
  } else {
    shortYear = year;
  }

  const fullYear = shortYear < 30 ? `20${shortYear}` : `19${shortYear}`;

  const monthIndex = fromFormat.indexOf('MM');
  const month = dateParts[monthIndex];

  const dayIndex = fromFormat.indexOf('DD');
  const day = dateParts[dayIndex];

  const newYearIndex = toFormat.indexOf('YYYY') !== -1
    ? toFormat.indexOf('YYYY')
    : toFormat.indexOf('YY');

  const newYear = toFormat.includes('YY') ? shortYear : fullYear;

  const newMonthIndex = toFormat.indexOf('MM');
  const newMonth = month;

  const newDayIndex = toFormat.indexOf('DD');
  const newDay = day;

  const newDivider = toFormat[toFormat.length - 1];

  const newDate = [];

  newDate[newYearIndex] = newYear;
  newDate[newMonthIndex] = newMonth;
  newDate[newDayIndex] = newDay;

  return newDate.join(newDivider);
}

module.exports = formatDate;
