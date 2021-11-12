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
  const oldFormatDelimeter = fromFormat[3];
  const newFormatDelimeter = toFormat[3];
  const newDate = date.split(oldFormatDelimeter);
  const newDateArray = [];
  
  let oldYearLength;
  let oldYearPosition;
  let oldMonthPostion;
  let oldDayPosition;

  let newYearLength;
  let newYearPosition;
  let newMonthPosition;
  let newDayPosition;

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i][0] === 'Y') {
      newYearPosition = i;

      if (toFormat[i].length > 2) {
        newYearLength = 4;
      } else {
        newYearLength = 2;
      }
    }

    if (toFormat[i][0] === 'M') {
      newMonthPosition = i;
    }

    if (toFormat[i][0] === 'D') {
      newDayPosition = i;
    }
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i][0] === 'Y') {
      oldYearPosition = i;

      if (fromFormat[i].length > 2) {
        oldYearLength = 4;
      } else {
        oldYearLength = 2;
      }
    }

    if (fromFormat[i][0] === 'M') {
      oldMonthPostion = i;
    }

    if (fromFormat[i][0] === 'D') {
      oldDayPosition = i;
    }
  }

  newDateArray[newYearPosition] = newDate[oldYearPosition];
  newDateArray[newMonthPosition] = newDate[oldMonthPostion];
  newDateArray[newDayPosition] = newDate[oldDayPosition];

  if (newYearLength > oldYearLength) {
    if (newDateArray[newYearPosition] < 30) {
      newDateArray[newYearPosition] = '20' + newDateArray[newYearPosition];
    } else {
      newDateArray[newYearPosition] = '19' + newDateArray[newYearPosition];
    }
  }

  if (newYearLength < oldYearLength) {
    newDateArray[newYearPosition] = newDateArray[newYearPosition].slice(-2);
  }

  return newDateArray.join(newFormatDelimeter);
}

module.exports = formatDate;
