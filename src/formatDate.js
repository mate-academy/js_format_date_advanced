'use strict';

/**
 * Time flies, standards change.
 * Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array variable,
 * and the new `toFormat` array variable.
 * Function returns given date in `toFormat` format.
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'],['DD', 'MM', 'YY', '/'])
 *  // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/'])
 *  // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.'])
 *  // '18.02.1997'
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
    if (fromFormat[index][0] === 'Y') {
      oldYearIndex = +index;
    }

    if (fromFormat[index][0] === 'M') {
      oldMonthIndex = +index;
    }

    if (fromFormat[index][0] === 'D') {
      oldDayIndex = +index;
    }
  }

  for (const oldDatePart in fromFormat) {
    for (const newDatePart in toFormat) {
      if (fromFormat[oldDatePart][0] === toFormat[newDatePart][0]
        && fromFormat[oldDatePart][0] === 'Y') {
        if (fromFormat[oldDatePart].length === 2
          && toFormat[newDatePart].length === 2) {
          newDateArray[newDatePart] = oldDateArray[oldYearIndex];
        } else

        if (fromFormat[oldDatePart].length === 4
          && toFormat[newDatePart].length === 4) {
          newDateArray[newDatePart] = oldDateArray[oldYearIndex];
        } else

        if (fromFormat[oldDatePart].length === 4
          && toFormat[newDatePart].length === 2) {
          newDateArray[newDatePart] = oldDateArray[oldYearIndex][2]
            + oldDateArray[oldYearIndex][3];
        } else {
          const firstYearDigits = oldDateArray[oldYearIndex][0]
            + oldDateArray[oldYearIndex][1];

          if (firstYearDigits >= 22) {
            newDateArray[newDatePart] = '19' + firstYearDigits;
          } else

          if (firstYearDigits < 22) {
            newDateArray[newDatePart] = '20' + firstYearDigits;
          }
        }
      }

      if (fromFormat[oldDatePart][0] === toFormat[newDatePart][0]
        && fromFormat[oldDatePart][0] === 'M') {
        newDateArray[newDatePart] = oldDateArray[oldMonthIndex];
      }

      if (fromFormat[oldDatePart][0] === toFormat[newDatePart][0]
        && fromFormat[oldDatePart][0] === 'D') {
        newDateArray[newDatePart] = oldDateArray[oldDayIndex];
      }
    }
  }

  return newDateArray.join(newSeparator);
}

module.exports = formatDate;
