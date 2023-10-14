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
  const SHORT_YEAR_FORMAT_LENGTH = 2;
  const LONG_YEAR_FORMAT_LENGTH = 4;
  const CENTURY_CHANGE_VALUE = 30;
  const NINETEENTH_CENTURY = 19;
  const TWENTIETH_CENTURY = 20;

  const oldSeparator = fromFormat[3];
  const oldDate = date.split(oldSeparator);
  const oldDayIndex = fromFormat.findIndex(el => el.includes('D'));
  const oldMonthIndex = fromFormat.findIndex(el => el.includes('M'));
  const oldYearIndex = fromFormat.findIndex(el => el.includes('Y'));

  const newSeparator = toFormat[3];
  const newDate = [null, null, null];
  const newDayIndex = toFormat.findIndex(el => el.includes('D'));
  const newMonthIndex = toFormat.findIndex(el => el.includes('M'));
  const newYearIndex = toFormat.findIndex(el => el.includes('Y'));

  const day = oldDate[oldDayIndex];
  const month = oldDate[oldMonthIndex];
  let year = oldDate[oldYearIndex];

  if (fromFormat[oldYearIndex].length === LONG_YEAR_FORMAT_LENGTH
    && toFormat[newYearIndex].length === SHORT_YEAR_FORMAT_LENGTH) {
    year = year.slice(SHORT_YEAR_FORMAT_LENGTH);
  }

  if (fromFormat[oldYearIndex].length === SHORT_YEAR_FORMAT_LENGTH
    && toFormat[newYearIndex].length === LONG_YEAR_FORMAT_LENGTH) {
    year = year < CENTURY_CHANGE_VALUE
      ? `${TWENTIETH_CENTURY}${year}`
      : `${NINETEENTH_CENTURY}${year}`;
  }

  newDate[newYearIndex] = year;
  newDate[newMonthIndex] = month;
  newDate[newDayIndex] = day;

  return newDate.join(newSeparator);
}

module.exports = formatDate;
