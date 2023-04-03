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
  let century = 20;
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const numbers = date.split(oldSeparator);
  let oldYearFull = false;
  let newYearFull = false;
  const oldDayIndex = fromFormat.indexOf('DD');
  const newDayIndex = toFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');
  const newMonthIndex = toFormat.indexOf('MM');
  let oldYearIndex, newYearIndex;

  if (fromFormat.includes('YYYY')) {
    oldYearFull = true;
    oldYearIndex = fromFormat.indexOf('YYYY');
  }

  if (toFormat.includes('YYYY')) {
    newYearFull = true;
    newYearIndex = toFormat.indexOf('YYYY');
  }

  if (oldYearFull === false) {
    oldYearIndex = fromFormat.indexOf('YY');

    if (Number(numbers[oldYearIndex]) >= 30) {
      century = 19;
    }
  }

  if (newYearFull === false) {
    newYearIndex = toFormat.indexOf('YY');
  }

  const reformatted = [0, 0, 0];

  reformatted[newDayIndex] = numbers[oldDayIndex];
  reformatted[newMonthIndex] = numbers[oldMonthIndex];

  if (oldYearFull === true && newYearFull === false) {
    reformatted[newYearIndex]
    = (numbers[oldYearIndex][2] + numbers[oldYearIndex][3]);
  } else if (oldYearFull === false && newYearFull === true) {
    reformatted[newYearIndex] = (century + numbers[oldYearIndex]);
  } else {
    reformatted[newYearIndex] = numbers[oldYearIndex];
  }

  return reformatted.join(newSeparator);
}

module.exports = formatDate;
