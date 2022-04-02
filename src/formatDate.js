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
  let datePart = date.split(fromFormat[3])[0];

  if (fromFormat.join('').length === 7) {
    if (datePart < 30) {
      datePart = 20 + datePart;
    } else {
      datePart = 19 + datePart;
    }
  }

  const correctDate = [datePart, date.split(fromFormat[3])[1],
    date.split(fromFormat[3])[2]];

  if (fromFormat[0] === 'YYYY' && toFormat[0] === 'DD') {
    return correctDate.reverse().join(toFormat[3]);
  } else if (fromFormat[1].length === 4) {
    return [correctDate[2], correctDate[0], correctDate[1]].join(toFormat[3]);
  } else if (fromFormat[2].length - 2 === toFormat[2].length) {
    correctDate[2] = correctDate[2].slice(2);
  }

  return correctDate.join(toFormat[3]);
}

module.exports = formatDate;
