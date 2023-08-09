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
  const splittedOldDate = date.split(fromFormat[3]);
  const toSeparator = toFormat[3];
  const formattedDate = [];

  const MONTH_FORMAT = 'MM';
  const DAY_FORMAT = 'DD';
  const CENTURY_19 = '19';
  const CENTURY_20 = '20';

  const oldDayIndex = fromFormat.indexOf(DAY_FORMAT);
  const oldMonthIndex = fromFormat.indexOf(MONTH_FORMAT);
  const oldYearIndex = fromFormat.length - 1 - (oldDayIndex + oldMonthIndex);

  const toDayIndex = toFormat.indexOf(DAY_FORMAT);
  const toMonthIndex = toFormat.indexOf(MONTH_FORMAT);
  const toYearIndex = toFormat.length - 1 - (toDayIndex + toMonthIndex);

  let normalizedYear = splittedOldDate[oldYearIndex];

  if (normalizedYear.length !== toFormat[toYearIndex].length) {
    if (normalizedYear.length > toFormat[toYearIndex].length) {
      normalizedYear = normalizedYear.slice(2);
    } else {
      if (+normalizedYear >= 30) {
        normalizedYear = CENTURY_19 + normalizedYear;
      } else {
        normalizedYear = CENTURY_20 + normalizedYear;
      }
    }
  }

  formattedDate[toDayIndex] = splittedOldDate[oldDayIndex];
  formattedDate[toYearIndex] = normalizedYear;
  formattedDate[toMonthIndex] = splittedOldDate[oldMonthIndex];

  return formattedDate.join(toSeparator);
}

module.exports = formatDate;
