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
  let res = '';
  let separatorBefore = '';
  let separatorAfter = '';

  separatorAfter = toFormat[3];
  separatorBefore = fromFormat[3];

  const dateArr = date.split(separatorBefore);

  switch (fromFormat[0]) {
    case 'YYYY':
      switch (toFormat[0]) {
        case 'DD':
          if (toFormat[2].length === 4) {
            res += dateArr[2] + separatorAfter + dateArr[1]
            + separatorAfter + dateArr[0];
          }

          break;

        case 'YYYY':
          res += dateArr[0] + separatorAfter + dateArr[1]
           + separatorAfter + dateArr[2];
      }

      break;

    case 'MM':
      switch (toFormat[0]) {
        case 'DD':
          if (toFormat[2].length === 4) {
            res += dateArr[2] + separatorAfter + dateArr[0]
            + separatorAfter + dateArr[1];
          }

          break;

        case 'MM':
          if (toFormat[2].length === 2) {
            res += dateArr[0] + separatorAfter + dateArr[1]
           + separatorAfter + dateArr[2].slice(-2);
          }

          if (toFormat[2].length === 4) {
            res += dateArr[0] + separatorAfter + dateArr[1]
           + separatorAfter + dateArr[2];
          }
      }

      break;

    case 'YY':

      if (+dateArr[0] < 30) {
        res += '20' + dateArr[0] + separatorAfter + dateArr[1]
        + separatorAfter + dateArr[2];
      } else {
        res += '19' + dateArr[0] + separatorAfter + dateArr[1]
        + separatorAfter + dateArr[2];
      }
  }

  return res;
}

module.exports = formatDate;
