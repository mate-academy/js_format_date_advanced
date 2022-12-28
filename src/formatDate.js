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
  const previousSeparator = fromFormat.pop();
  const currentSeparator = toFormat.pop();
  const currentDate = date.split(previousSeparator);

  const fromDayIndex = fromFormat.indexOf('DD');
  const fromMonthIndex = fromFormat.indexOf('MM');
  const toDayIndex = toFormat.indexOf('DD');
  const toMonthIndex = toFormat.indexOf('MM');
  const fromYearIndex = fromFormat.includes('YY')
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');
  const toYearIndex = toFormat.includes('YY')
    ? toFormat.indexOf('YY')
    : toFormat.indexOf('YYYY');

  const result = [];

  result[toDayIndex] = currentDate[fromDayIndex];
  result[toMonthIndex] = currentDate[fromMonthIndex];
  result[toYearIndex] = currentDate[fromYearIndex];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    result[toYearIndex] = currentDate[fromYearIndex].slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    result[toYearIndex] = (result[toYearIndex] < 30)
      ? `20${result[toYearIndex]}`
      : `19${result[toYearIndex]}`;
  }

  return result.join(currentSeparator);
}

module.exports = formatDate;
