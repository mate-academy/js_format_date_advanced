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
  const fromDateArr = date.split(fromFormat[3]);

  const fromDayIndex = fromFormat.indexOf('DD');
  const fromMonthIndex = fromFormat.indexOf('MM');
  const fromYearLongIndex = fromFormat.indexOf('YYYY');
  const fromYearShortIndex = fromFormat.indexOf('YY');

  const toDayIndex = toFormat.indexOf('DD');
  const toMonthIndex = toFormat.indexOf('MM');
  const toYearLongIndex = toFormat.indexOf('YYYY');
  const toYearShortIndex = toFormat.indexOf('YY');
  let toYearIndex = null;

  const day = fromDateArr[fromDayIndex];
  const month = fromDateArr[fromMonthIndex];

  let fromYear = null;
  let toYear = null;

  if (fromYearLongIndex === -1) {
    fromYear = fromDateArr[fromYearShortIndex];

    if (toYearLongIndex === -1) {
      toYear = fromYear;
      toYearIndex = toYearShortIndex;
    } else {
      toYearIndex = toYearLongIndex;

      if (fromYear < 30) {
        toYear = '20' + fromYear;
      } else {
        toYear = '19' + fromYear;
      }
    }
  } else {
    fromYear = fromDateArr[fromYearLongIndex];

    if (toYearShortIndex === -1) {
      toYear = fromYear;
      toYearIndex = toYearLongIndex;
    } else {
      toYear = fromYear.slice(-2);
      toYearIndex = toYearShortIndex;
    }
  }

  const toDateArr = [];

  toDateArr[toDayIndex] = day;
  toDateArr[toMonthIndex] = month;
  toDateArr[toYearIndex] = toYear;

  return toDateArr.join(toFormat[3]);
}

module.exports = formatDate;
