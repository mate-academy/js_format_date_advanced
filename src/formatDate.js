'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the fromFormat `fromFormat` array and the new `toFormat` array. Function
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
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const oldDate = date.split(oldSeparator);
  const newDate = new Array(3);

  const newYearIndex = toFormat.includes('YY')
    ? toFormat.indexOf('YY')
    : toFormat.indexOf('YYYY');

  const oldYearIndex = fromFormat.includes('YY')
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');

  newDate[toFormat.indexOf('DD')] = oldDate[fromFormat.indexOf('DD')];
  newDate[toFormat.indexOf('MM')] = oldDate[fromFormat.indexOf('MM')];

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    oldDate[oldYearIndex] %= 100;
    newDate[newYearIndex] = oldDate[oldYearIndex];
  } else if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    if (oldDate[oldYearIndex] < 30) {
      oldDate[oldYearIndex] = 20 + oldDate[oldYearIndex];
      newDate[newYearIndex] = oldDate[oldYearIndex];
    } else {
      oldDate[oldYearIndex] = 19 + oldDate[oldYearIndex];
      newDate[newYearIndex] = oldDate[oldYearIndex];
    }
    newDate[newYearIndex] = oldDate[oldYearIndex];
  } else {
    newDate[newYearIndex] = oldDate[oldYearIndex];
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
