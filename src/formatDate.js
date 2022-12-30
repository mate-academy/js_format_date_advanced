'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old ` oldFormat` corectDateay and the new `newFormat` corectDateay.
 * Function returns
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
 * @param {string[]}  oldFormat
 * @param {string[]} newFormat
 *
 * @returns {string}
 */

function formatDate(date, oldFormat, newFormat) {
  const corectDate = [];
  let separator = oldFormat[3];
  let year, month, day;

  const dateArr = date.split(separator);

  // fill variables: year, month, day with data
  for (let i = 0; i < oldFormat.length; i++) {
    if (oldFormat[i].includes('Y')) {
      year = dateArr[i];
    }

    if (oldFormat[i].includes('D')) {
      day = dateArr[i];
    }

    if (oldFormat[i].includes('M')) {
      month = dateArr[i];
    }
  }

  // add variables to the final array in the correct order
  for (const format of newFormat) {
    if (format.includes('Y')) {
      if (format.length < year.length) {
        corectDate.push(year.slice(2));
      } else {
        corectDate.push(year.padStart(format.length, year >= 30 ? '19' : '20'));
      }
    }

    if (format.includes('M')) {
      corectDate.push(month);
    }

    if (format.includes('D')) {
      corectDate.push(day);
    }
  }

  separator = newFormat[3];

  return corectDate.join(separator);
}

module.exports = formatDate;
