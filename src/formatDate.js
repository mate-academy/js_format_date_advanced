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
  const oldSeparator = fromFormat[3];
  const oldDayPosition = fromFormat.indexOf('DD');
  const oldMonthPosition = fromFormat.indexOf('MM');
  const oldYearPosition = 3 - oldDayPosition - oldMonthPosition;
  const oldYearQuantity = fromFormat[oldYearPosition].length;

  const newSeparetor = toFormat[3];
  const newDayPosition = toFormat.indexOf('DD');
  const newMonthPosition = toFormat.indexOf('MM');
  const newYearPosition = 3 - newDayPosition - newMonthPosition;
  const newYearQuantity = toFormat[newYearPosition].length;

  const bufferForDate = date.split(oldSeparator);

  if (oldYearQuantity > newYearQuantity) {
    bufferForDate[oldYearPosition] = bufferForDate[oldYearPosition].slice(2);
  }

  if (oldYearQuantity < newYearQuantity) {
    if (+bufferForDate[oldYearPosition] < 30) {
      bufferForDate[oldYearPosition] = 20 + bufferForDate[oldYearPosition];
    } else {
      bufferForDate[oldYearPosition] = 19 + bufferForDate[oldYearPosition];
    }
  };

  const newDateArr = new Array(3);

  newDateArr[newDayPosition] = bufferForDate[oldDayPosition];
  newDateArr[newYearPosition] = bufferForDate[oldYearPosition];
  newDateArr[newMonthPosition] = bufferForDate[oldMonthPosition];

  return newDateArr.join(newSeparetor);
}

module.exports = formatDate;
