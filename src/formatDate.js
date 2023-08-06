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
  const CENTURY_21 = '20';
  const CENTURY_20 = '19';
  const dateArr = date.split(`${fromFormat[3]}`);
  const expectedDate = [];
  let month, day, shortYear, longYear;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'MM':
        month = dateArr[i];
        break;
      case 'DD':
        day = dateArr[i];
        break;
      case 'YY':
        shortYear = dateArr[i];
        break;
      case 'YYYY':
        longYear = dateArr[i];
        break;
    }
  }

  if (shortYear === undefined) {
    shortYear = longYear.slice(2, 4);
  } else if (longYear === undefined) {
    if (shortYear < 30) {
      longYear = CENTURY_21 + shortYear;
    } else {
      longYear = CENTURY_20 + shortYear;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'MM':
        expectedDate.push(month);
        break;
      case 'DD':
        expectedDate.push(day);
        break;
      case 'YY':
        expectedDate.push(shortYear);
        break;
      case 'YYYY':
        expectedDate.push(longYear);
        break;
    }
  }

  return expectedDate.join(`${toFormat[3]}`);
}

module.exports = formatDate;
