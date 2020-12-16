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
  let newYearVal = '';
  let resultDate = [];

  const oldYearIndex = fromFormat.findIndex(dateEl => dateEl[0][0] === 'Y');
  const oldMonthIndex = fromFormat.findIndex(dateEl => dateEl[0][0] === 'M');
  const oldDayIndex = fromFormat.findIndex(dateEl => dateEl[0][0] === 'D');
  const newYearIndex = toFormat.findIndex(dateEl => dateEl[0][0] === 'Y');

  const oldYearMask = fromFormat[oldYearIndex];
  const newYearMask = toFormat[newYearIndex];

  const dateArr = date.replace(/\D/g, ' ').split(' ');
  const year = dateArr[oldYearIndex];
  const month = dateArr[oldMonthIndex];
  const day = dateArr[oldDayIndex];
  const newSeparator = toFormat[3];

  if (oldYearMask.length === 2 && newYearMask.length === 4) {
    if (year.slice(-2) < 30) {
      newYearVal += 20 + year;
    } else {
      newYearVal += 19 + year;
    }
  } else if (oldYearMask.length === 4 && newYearMask.length === 2) {
    newYearVal = year.slice(-2);
  } else {
    newYearVal = year;
  }

  if (toFormat[0][0] === 'Y') {
    resultDate
      = resultDate.concat(newYearVal, newSeparator, month, newSeparator, day);
  } else if (toFormat[0][0] === 'M') {
    resultDate
      = resultDate.concat(month, newSeparator, day, newSeparator, newYearVal);
  } else {
    resultDate
      = resultDate.concat(day, newSeparator, month, newSeparator, newYearVal);
  }

  return resultDate.join('');
}

module.exports = formatDate;
