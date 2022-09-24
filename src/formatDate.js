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
  const separator = toFormat[3];
  const dateArr = date.split(fromFormat[3]);
  const indexOfDay = fromFormat.indexOf('DD');
  const indexOfMonth = fromFormat.indexOf('MM');
  const indexOfYear = 3 - indexOfDay - indexOfMonth;
  const DD = dateArr[indexOfDay];
  const MM = dateArr[indexOfMonth];
  const year = dateArr[indexOfYear];
  let YY;
  let YYYY;

  if (year.length === 2) {
    YY = year;

    if (YY < 30) {
      YYYY = 20 + YY;
    } else {
      YYYY = 19 + YY;
    }
  }

  if (year.length === 4) {
    YYYY = year;
    YY = year.substring(2);
  }

  let result = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    // console.log(toFormat[i])
    if (toFormat[i] === 'DD') {
      result = result + DD;
    } else if (toFormat[i] === 'MM') {
      result = result + MM;
    } else if (toFormat[i] === 'YYYY') {
      result = result + YYYY;
    } else if (toFormat[i] === 'YY') {
      result = result + YY;
    }

    if ((i < toFormat.length - 2)) {
      result += separator;
    }
  }

  return result;
}

// write code here

module.exports = formatDate;
