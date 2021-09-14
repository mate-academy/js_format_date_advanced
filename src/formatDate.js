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
  const result = [];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  let oldYearPosition;
  let newYearPosition;
  let newYear;
  let oldYear;
  const oldMonthPosition = fromFormat.indexOf('MM');
  const month = date.split(oldSeparator)[oldMonthPosition];
  const newMonthPosition = toFormat.indexOf('MM');
  const oldDayPosition = fromFormat.indexOf('DD');
  const day = date.split(oldSeparator)[oldDayPosition];

  if (fromFormat.includes('YYYY')) {
    oldYearPosition = fromFormat.indexOf('YYYY');
    oldYear = date.split(oldSeparator)[oldYearPosition].slice(2);
  } else {
    oldYearPosition = fromFormat.indexOf('YY');
    oldYear = date.split(oldSeparator)[oldYearPosition];
  }

  if (toFormat.includes('YYYY')) {
    newYearPosition = toFormat.indexOf('YYYY');

    if (oldYear < 30) {
      newYear = '20' + oldYear;
    } else {
      newYear = '19' + oldYear;
    }
  } else {
    newYearPosition = toFormat.indexOf('YY');
    newYear = oldYear;
  }

  for (let i = 0; i <= 2; i++) {
    if (i === newYearPosition) {
      result.push(newYear);
    } else if (i === newMonthPosition) {
      result.push(month);
    } else {
      result.push(day);
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
