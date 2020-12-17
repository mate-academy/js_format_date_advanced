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
  const separator1 = fromFormat[3];
  const separator2 = toFormat[3];
  const dateArray = date.split(separator1);
  let result;

  if (fromFormat[0] === toFormat[0] && fromFormat[2] === toFormat[2]) {
    result = dateArray;
  }

  if (fromFormat[0][1] === toFormat[2][1]) {
    result = dateArray.reverse();
  }

  if (fromFormat[0] !== toFormat[2]
    && (fromFormat[0].length > toFormat[0].length
    || fromFormat[2].length > toFormat[2].length)) {
    const year = dateArray[2].slice(2);

    dateArray.splice(2, 1, year);
    result = dateArray;
  }

  if (fromFormat[0] !== toFormat[2]
  && (fromFormat[0].length < toFormat[0].length
  || fromFormat[2].length < toFormat[2].length)) {
    if (fromFormat[0][0] === 'Y') {
      if (dateArray[0] < 30) {
        const year = '20' + dateArray[0];

        dateArray.splice(0, 1, year);
        result = dateArray;
      } else {
        const year = '19' + dateArray[0];

        dateArray.splice(0, 1, year);
        result = dateArray;
      }
    }
  }

  return result.join(separator2);
}

module.exports = formatDate;
