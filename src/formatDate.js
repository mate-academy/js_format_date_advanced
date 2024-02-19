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
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();
  const oldDateFormat = date.split(separatorFrom);
  const newDateFormat = [];
  const LONG_YEAR_FORMAT = 'YYYY';
  const SHORT_YEAR_FORMAT = 'YY';
  const MONTH_FORMAT = 'MM';
  const DAY_FORMAT = 'DD';
  const CENTURY_20 = '19';
  const CENTURY_21 = '20';

  let oldYearIndex = fromFormat.indexOf(LONG_YEAR_FORMAT);

  if (oldYearIndex === -1) {
    oldYearIndex = fromFormat.indexOf(SHORT_YEAR_FORMAT);
  }

  let newYearIndex = toFormat.indexOf(LONG_YEAR_FORMAT);

  if (newYearIndex === -1) {
    newYearIndex = toFormat.indexOf(SHORT_YEAR_FORMAT);
  }

  let year = oldDateFormat[oldYearIndex];
  const shortenedYear = year.slice(-2);

  if (toFormat.indexOf(SHORT_YEAR_FORMAT) !== -1) {
    year = shortenedYear;
    oldDateFormat[oldYearIndex] = year;
  }

  if (toFormat.indexOf(LONG_YEAR_FORMAT) !== -1) {
    year = shortenedYear > 20
      ? year = CENTURY_20 + shortenedYear
      : year = CENTURY_21 + shortenedYear;
  }

  const oldMonthIndex = fromFormat.indexOf(MONTH_FORMAT);
  const newMonthIndex = toFormat.indexOf(MONTH_FORMAT);
  const oldDayIndex = fromFormat.indexOf(DAY_FORMAT);
  const newDayIndex = toFormat.indexOf(DAY_FORMAT);

  newDateFormat[newYearIndex] = year;
  newDateFormat[newDayIndex] = oldDateFormat[oldDayIndex];
  newDateFormat[newMonthIndex] = oldDateFormat[oldMonthIndex];

  return newDateFormat.join(separatorTo);
}

module.exports = formatDate;
