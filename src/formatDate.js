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
const TYPE_OF_MONTH = 'MM';
const TYPE_OF_DAY = 'DD';
const TYPE_OF_YEAR_LONG = 'YYYY';
const TYPE_OF_YEAR_SHORT = 'YY';
const CENTURE_21 = 20;
const CENTURE_20 = 19;
const LIMIT_YEAR = 30;

function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArr = date.split(oldSeparator);
  const newDateArr = [];

  const oldDayIndex = getIndex(TYPE_OF_DAY, fromFormat);
  const oldMonthIndex = getIndex(TYPE_OF_MONTH, fromFormat);
  const oldYearIndex = getYearIndex(
    fromFormat, TYPE_OF_YEAR_SHORT, TYPE_OF_YEAR_LONG
  );

  const newDayIndex = getIndex(TYPE_OF_DAY, toFormat);
  const newMonthIndex = getIndex(TYPE_OF_MONTH, toFormat);
  const newYearIndex = getYearIndex(
    toFormat, TYPE_OF_YEAR_SHORT, TYPE_OF_YEAR_LONG
  );

  newDateArr[newDayIndex] = dateArr[oldDayIndex];
  newDateArr[newMonthIndex] = dateArr[oldMonthIndex];
  newDateArr[newYearIndex] = dateArr[oldYearIndex].slice(-2);

  if (toFormat[newYearIndex] === TYPE_OF_YEAR_LONG) {
    if (newDateArr[newYearIndex] < LIMIT_YEAR) {
      newDateArr[newYearIndex] = CENTURE_21 + newDateArr[newYearIndex];
    } else {
      newDateArr[newYearIndex] = CENTURE_20 + newDateArr[newYearIndex];
    }
  }

  return newDateArr.join(newSeparator);
}

function getYearIndex(arr, shortYear, longYear) {
  if (arr.includes(shortYear)) {
    return arr.indexOf(shortYear);
  }

  return arr.indexOf(longYear);
}

function getIndex(type, arr) {
  return arr.indexOf(type);
}
module.exports = formatDate;
