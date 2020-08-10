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
  let oldYearIndex = 0;
  let oldMonthIndex = 0;
  let oldDayIndex = 0;

  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const oldDateArray = date.split(oldSeparator);
  const newDateArray = Array(3);

  for (const index in fromFormat) {
    switch (fromFormat[index][0]) {
      case 'Y':
        oldYearIndex = +index;
        break;

      case 'M':
        oldMonthIndex = +index;
        break;

      case 'D':
        oldDayIndex = +index;
        break;

      default:
    }
  }

  for (const index in oldDateArray) {
    switch (toFormat[index]) {
      case 'YYYY':
        if (fromFormat[oldYearIndex].length === 2) {
          const firstYearDigits = oldDateArray[oldYearIndex].slice(-2);

          if (firstYearDigits > 29) {
            newDateArray[index] = '19' + firstYearDigits;
          } else {
            newDateArray[index] = '20' + firstYearDigits;
          }
        } else {
          newDateArray[index] = oldDateArray[oldYearIndex];
        }
        break;

      case 'YY':
        if (fromFormat[oldYearIndex].length === 4) {
          newDateArray[index] = oldDateArray[oldYearIndex].slice(2);
        } else {
          newDateArray[index] = oldDateArray[oldYearIndex];
        }
        break;

      case 'MM':
        newDateArray[index] = oldDateArray[oldMonthIndex];
        break;

      case 'DD':
        newDateArray[index] = oldDateArray[oldDayIndex];
        break;

      default:
    }
  }

  return newDateArray.join(newSeparator);
}

module.exports = formatDate;
