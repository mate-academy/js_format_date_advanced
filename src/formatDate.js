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
  const oldDateArr = date.split(fromFormat[3]);
  let YYYY = 0;
  let MM = 0;
  let DD = 0;
  let YY = 0;
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      YYYY = oldDateArr[i];
    }

    if (fromFormat[i] === 'YY') {
      YY = oldDateArr[i];
    }

    if (fromFormat[i] === 'MM') {
      MM = oldDateArr[i];
    }

    if (fromFormat[i] === 'DD') {
      DD = oldDateArr[i];
    }
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY') && YY < 30) {
    YYYY = '20' + YY;
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY') && YY >= 30) {
    YYYY = '19' + YY;
  }

  for (const i of toFormat) {
    if (i === 'YYYY') {
      newDate.push(YYYY);
    }

    if (i === 'YY' && fromFormat.includes('YY')) {
      newDate.push(YY);
    }

    if (i === 'YY') {
      newDate.push(YYYY.substr(2));
    }

    if (i === 'MM') {
      newDate.push(MM);
    }

    if (i === 'DD') {
      newDate.push(DD);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
