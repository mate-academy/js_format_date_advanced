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
  const newDate = [];
  const oldDate = date.split(fromFormat[fromFormat.length - 1]);

  function findSameElement(index) {
    for (const oldEl of fromFormat) {
      const indexOfOld = fromFormat.indexOf(oldEl);
      let newEl = oldDate[indexOfOld];

      if (oldEl === toFormat[index]) {
        newDate.push(newEl);
        break;
      }

      const isBothYears = oldEl.includes('Y') && toFormat[index].includes('Y');
      const isNewLengthBigger = oldEl.length < toFormat[index].length;

      if (isBothYears && !isNewLengthBigger) {
        newEl = oldDate[indexOfOld].slice(2);
        newDate.push(newEl);
      }

      if (isBothYears && isNewLengthBigger && (+oldDate[indexOfOld] < 30)) {
        newEl = 20 + oldDate[indexOfOld];
        newDate.push(newEl);
      } else if (isBothYears && isNewLengthBigger) {
        newEl = 19 + oldDate[indexOfOld];
        newDate.push(newEl);
      }
    }
  }

  findSameElement(0);
  findSameElement(1);
  findSameElement(2);

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
