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
  const oldSeparetor = fromFormat[3];

  const newSeparetor = toFormat[3];

  const oldDate = date.split(oldSeparetor);

  const newDate = [];

  const newDayIndex = toFormat.indexOf('DD');

  const newMonthIndex = toFormat.indexOf('MM');

  let newYearIndex = 0;

  let oldYearIndex = 0;

  if (fromFormat.includes('YY')) {
    oldYearIndex = fromFormat.indexOf('YY');
  }

  if (fromFormat.includes('YYYY')) {
    oldYearIndex = fromFormat.indexOf('YYYY');
  }

  if (toFormat.includes('YY')) {
    newYearIndex = toFormat.indexOf('YY');
  }

  if (toFormat.includes('YYYY')) {
    newYearIndex = toFormat.indexOf('YYYY');
  }

  newDate[newDayIndex] = oldDate[fromFormat.indexOf('DD')];

  newDate[newMonthIndex] = oldDate[fromFormat.indexOf('MM')];

  newDate[newYearIndex] = oldDate[oldYearIndex];

  if (fromFormat[oldYearIndex].length > toFormat[newYearIndex].length) {
    newDate[newYearIndex] = newDate[newYearIndex].slice(2);
  }

  if (fromFormat[oldYearIndex].length < toFormat[newYearIndex].length) {
    if (newDate[newYearIndex] >= 30) {
      newDate[newYearIndex] = '19' + newDate[newYearIndex];
    }

    if (newDate[newYearIndex] < 30) {
      newDate[newYearIndex] = '20' + newDate[newYearIndex];
    }
  }

  return newDate.join(newSeparetor);
}

module.exports = formatDate;
