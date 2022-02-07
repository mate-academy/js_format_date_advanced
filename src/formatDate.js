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
  const dateValue = date.split(fromFormat[3]);
  const isLongYearFromFormat = fromFormat.includes('YYYY');
  const isLongYearToFormat = toFormat.includes('YYYY');
  const fromYearIndex = getYearIndex(fromFormat);
  const toYearIndex = getYearIndex(toFormat);
  const fromMonthIndex = fromFormat.indexOf('MM');
  const toMonthIndex = toFormat.indexOf('MM');
  const toDayIndex = 3 - toYearIndex - toMonthIndex;
  const fromDayIndex = 3 - fromYearIndex - fromMonthIndex;

  switch (true) {
    case (isLongYearFromFormat && !isLongYearToFormat):
      dateValue[fromYearIndex] = dateValue[fromYearIndex].slice(-2);
      break;
    case (!isLongYearFromFormat && isLongYearToFormat):
      const century = (+dateValue[fromYearIndex] < 30) ? '20' : '19';

      dateValue[fromYearIndex] = century + dateValue[fromYearIndex];
      break;
    default:
      break;
  }

  const result = Array(3);

  result[toYearIndex] = dateValue[fromYearIndex];
  result[toMonthIndex] = dateValue[fromMonthIndex];
  result[toDayIndex] = dateValue[fromDayIndex];

  return result.join(toFormat[3]);
}

function getYearIndex(format) {
  if (format.includes('YYYY')) {
    return format.indexOf('YYYY');
  } else {
    return format.indexOf('YY');
  }
}

module.exports = formatDate;
