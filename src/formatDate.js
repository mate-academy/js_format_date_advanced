'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  let oldYearPosition = fromFormat.indexOf('YYYY');
  let newYearPosition = toFormat.indexOf('YYYY');
  const oldMonthPosition = fromFormat.indexOf('MM');
  const newMonthPosition = toFormat.indexOf('MM');
  const oldDayPosition = fromFormat.indexOf('DD');
  const newDayPosition = toFormat.indexOf('DD');
  const dateParts = date.split(oldSeparator);
  let year = dateParts[oldYearPosition];
  const month = dateParts[oldMonthPosition];
  const day = dateParts[oldDayPosition];
  const newDateArray = [];

  if (oldYearPosition === -1) {
    oldYearPosition = fromFormat.indexOf('YY');
    year = dateParts[oldYearPosition];

    if (newYearPosition !== -1) {
      if (year < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
    }
  }

  if (newYearPosition === -1) {
    newYearPosition = toFormat.indexOf('YY');

    if (year.length === 4) {
      year = year.slice(2);
    }
  }

  newDateArray[newYearPosition] = year;
  newDateArray[newMonthPosition] = month;
  newDateArray[newDayPosition] = day;

  const newDate = newDateArray.join(newSeparator);

  return newDate;
}

module.exports = formatDate;

// Create a `formatDate` function that accepts the `date` string,
// the old `fromFormat` array and the new `toFormat` array.
//  Function returns given date in new format.

// The function can change a separator, reorder the date parts
//  of convert a year from `4` digits to `2` digits and back.

// - When converting from `YYYY` to `YY` just
//  use `2` last digit (`1997` -> `97`).
// - When converting from `YY` to `YYYY` use `20YY`
// if `YY < 30` and `19YY` otherwise.

// formatDate(
//   '20/02/18',
//   ['YY', 'MM', 'DD', '/'],
//   ['YYYY', 'MM', 'DD', '.'],
// ); // '2020.02.18'
