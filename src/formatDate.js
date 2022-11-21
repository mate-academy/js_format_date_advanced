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
  const firstDivider = fromFormat[3];
  const secondDivider = toFormat[3];
  const originalDate = date.split(firstDivider);

  const reverseDate = [];
  const dateObj = {

  };

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = originalDate[i];

    if (fromFormat[i] === 'YY') {
      if (+originalDate[i] < 30) {
        dateObj.YYYY = 20 + originalDate[i];
      } else {
        dateObj.YYYY = 19 + originalDate[i];
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    reverseDate[i] = dateObj[toFormat[i]];

    if (toFormat[i] === 'YY') {
      reverseDate[i] = dateObj.YYYY.slice(2);
    } else if (toFormat[i] === 'YYYY') {
      reverseDate[i] = dateObj.YYYY;
    }
  }

  const finalDate = reverseDate.join(secondDivider);

  return finalDate;
}

module.exports = formatDate;
