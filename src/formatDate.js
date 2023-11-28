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
  // write code here
  const oldSeparator = fromFormat[3];
  const dateArray = date.split(oldSeparator);

  const newSeparator = toFormat[3];
  const dateResultArray = [null, null, null];

  const oldDayIndex = fromFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');
  let oldYearIndex = null;
  let oldYearFormat = null;
  const oldYearInTwoIndex = fromFormat.indexOf('YY');
  const oldYearInFourIndex = fromFormat.indexOf('YYYY');

  if (oldYearInTwoIndex === -1) {
    oldYearIndex = oldYearInFourIndex;
    oldYearFormat = 'YYYY';
  } else {
    oldYearIndex = oldYearInTwoIndex;
    oldYearFormat = 'YY';
  }

  const day = dateArray[oldDayIndex];
  const month = dateArray[oldMonthIndex];
  const year = dateArray[oldYearIndex];

  const newDayIndex = toFormat.indexOf('DD');
  const newMonthIndex = toFormat.indexOf('MM');
  let newYearIndex = null;
  let newYearFormat = null;
  const newYearInTwoIndex = toFormat.indexOf('YY');
  const newYearInFourIndex = toFormat.indexOf('YYYY');

  if (newYearInTwoIndex === -1) {
    newYearIndex = newYearInFourIndex;
    newYearFormat = 'YYYY';
  } else {
    newYearIndex = newYearInTwoIndex;
    newYearFormat = 'YY';
  }

  let yearAfterFormat = null;

  if (oldYearFormat === 'YYYY' && newYearFormat === 'YY') {
    yearAfterFormat = year.slice(-2);
  } else if (oldYearFormat === 'YY' && newYearFormat === 'YYYY') {
    if (year < 30) {
      yearAfterFormat = '20' + year;
    } else {
      yearAfterFormat = '19' + year;
    }
  } else {
    yearAfterFormat = year;
  }

  dateResultArray[newDayIndex] = day;
  dateResultArray[newMonthIndex] = month;
  dateResultArray[newYearIndex] = yearAfterFormat;

  return dateResultArray.join(newSeparator);
}

module.exports = formatDate;
