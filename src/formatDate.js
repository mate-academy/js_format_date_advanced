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
  const result = [];
  const fromSelector = fromFormat[3];
  const toSelector = toFormat[3];
  const arrDate = date.split(fromSelector);
  let year = '';
  let YY = '';
  let YYYY = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = arrDate[i];
    } else if (fromFormat[i].includes('M')) {
      month = arrDate[i];
    } else if (fromFormat[i].includes('D')) {
      day = arrDate[i];
    }
  }

  if (year.length === 4) {
    YYYY = year;
    YY = YYYY.slice(-2);
  } else {
    YY = year;

    if (YY < 30) {
      YYYY = '20' + YY;
    } else {
      YYYY = '19' + YY;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].includes('Y') && toFormat[i].length === 4) {
      result.push(YYYY);
    } else if (toFormat[i].includes('Y') && toFormat[i].length === 2) {
      result.push(YY);
    } else if (toFormat[i].includes('M')) {
      result.push(month);
    } else if (toFormat[i].includes('D')) {
      result.push(day);
    }
  }

  return result.join(toSelector);
}

module.exports = formatDate;
