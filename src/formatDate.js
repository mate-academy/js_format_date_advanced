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
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];

  // checking if data should be inverted
  for (let index = 0; index < oldDate.length; index++) {
    // first char of each element in array fromFormat
    const firstChar = fromFormat[index].charAt(0);

    const target = toFormat.findIndex(format => {
      return (firstChar === format.charAt(0));
    });

    switch (firstChar) {
      case 'Y':
        const oldYearL = calcYearLength(fromFormat);
        const newYearL = calcYearLength(toFormat);

        newDate[target] = convertYear(oldDate[index], oldYearL, newYearL);
        break;
      case 'D':
        newDate[target] = oldDate[index];
        break;
      case 'M':
        newDate[target] = oldDate[index];
        break;
      default:
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

function calcYearLength(array) {
  for (const item of array) {
    if (item === 'YYYY') {
      return 4;
    }
  }

  // if item === 'YY'
  return 2;
}

function convertYear(year, oldFormat, newFormat) {
  let newYear = year;

  let thousands = '';

  // YYYY
  if (year.length === 4) {
    thousands = year.charAt(0) + year.charAt(1);
  }

  // YY
  if (year.length === 2) {
    thousands = year >= 30 ? 19 : 20;
  }

  // YY => YYYY
  if (oldFormat < newFormat) {
    newYear = thousands + newYear;
  }

  // YYYY => YY
  if (oldFormat > newFormat) {
    newYear = newYear.charAt(2) + newYear.charAt(3);
  }

  // if oldFormat === newFormat
  return newYear;
}

module.exports = formatDate;

// use this
// array.values
