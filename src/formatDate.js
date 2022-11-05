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
  const lastDateArr = date.split(fromFormat[3]);

  const lastDayIndex = fromFormat.indexOf('DD');
  const lastMonthIndex = fromFormat.indexOf('MM');
  const lastYearLongIndex = fromFormat.indexOf('YYYY');
  const lastYearShortIndex = fromFormat.indexOf('YY');

  const newDayIndex = toFormat.indexOf('DD');
  const newMonthIndex = toFormat.indexOf('MM');
  const newYearLongIndex = toFormat.indexOf('YYYY');
  const newYearShortIndex = toFormat.indexOf('YY');
  let newYearIndex = null;

  const day = lastDateArr[lastDayIndex];
  const month = lastDateArr[lastMonthIndex];

  let lastYear = null;
  let newYear = null;

  if (lastYearLongIndex === -1) {
    lastYear = lastDateArr[lastYearShortIndex];

    if (newYearLongIndex === -1) {
      newYear = lastYear;
      newYearIndex = newYearShortIndex;
    } else {
      newYearIndex = newYearLongIndex;

      if (lastYear < 30) {
        newYear = '20' + lastYear;
      } else {
        newYear = '19' + lastYear;
      }
    }
  } else {
    lastYear = lastDateArr[lastYearLongIndex];

    if (newYearShortIndex === -1) {
      newYear = lastYear;
      newYearIndex = newYearLongIndex;
    } else {
      newYear = lastYear.slice(-2);
      newYearIndex = newYearShortIndex;
    }
  }

  const newDateArr = [];

  newDateArr[newDayIndex] = day;
  newDateArr[newMonthIndex] = month;
  newDateArr[newYearIndex] = newYear;

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
