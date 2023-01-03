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
    for (const oldElement of fromFormat) {
      const indexOfOld = fromFormat.indexOf(oldElement);
      let newElement = oldDate[indexOfOld];

      if (oldElement === toFormat[index]) {
        newDate.push(newElement);
        break;
      }

      const isBothYears = oldElement.includes('Y')
      && toFormat[index].includes('Y');
      const isNewLengthBigger = oldElement.length < toFormat[index].length;

      if (isBothYears && !isNewLengthBigger) {
        newElement = oldDate[indexOfOld].slice(2);
        newDate.push(newElement);
      }

      if (isBothYears && isNewLengthBigger && (+oldDate[indexOfOld] < 30)) {
        newElement = 20 + oldDate[indexOfOld];
        newDate.push(newElement);
      } else if (isBothYears && isNewLengthBigger) {
        newElement = 19 + oldDate[indexOfOld];
        newDate.push(newElement);
      }
    }
  }

  findSameElement(0);
  findSameElement(1);
  findSameElement(2);

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
