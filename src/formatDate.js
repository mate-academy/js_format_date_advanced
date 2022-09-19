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

  const dateArray = date.split(fromFormat[3]);

  const nowDate = {};

  const separator = toFormat[3];

  let inputYearLength;

  const outputArray = [];

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i][0]) {
      case 'D':
        nowDate.day = dateArray[i];
        break;

      case 'M':
        nowDate.month = dateArray[i];
        break;

      case 'Y':
        nowDate.year = dateArray[i];
        inputYearLength = fromFormat[i].length;
        break;
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i][0]) {
      case 'D':
        outputArray.push(nowDate.day);
        break;

      case 'M':
        outputArray.push(nowDate.month);
        break;

      case 'Y':
        outputArray.push(
          getYear(nowDate.year, inputYearLength, toFormat[i].length)
        );

        break;
    }
  }

  return outputArray.join(separator);

  function getYear(year, inputLength, outputLength) {
    if (inputLength > outputLength) {
      return year.slice(2);
    } else if (inputLength < outputLength) {
      if (year >= 30) {
        return `19${year}`;
      } else {
        return `20${year}`;
      }
    }

    return year;
  }
}

module.exports = formatDate;
