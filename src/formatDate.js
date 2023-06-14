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
  const dateParts = date.split(fromFormat[3]);
  const newDate = [];
  const dateInfo = {};
  const changeYear = fromFormat.slice(0, 4).join('').length
    !== toFormat.slice(0, 4).join('').length;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateInfo[fromFormat[i][0]] = dateParts[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    let nextPart = dateInfo[toFormat[i][0]];

    if (toFormat[i][0] === 'Y' && changeYear) {
      nextPart = changeYearFormat(dateInfo[toFormat[i][0]]);
    }

    newDate.push(nextPart);
  }

  return newDate.join(toFormat[3]);
}

function changeYearFormat(number) {
  const numberString = number.toString();

  if (numberString.length === 4) {
    return numberString
      .slice(numberString.length - 2, numberString.length);
  }

  if (number >= 30) {
    return '19' + numberString;
  }

  return '20' + numberString;
}

module.exports = formatDate;
