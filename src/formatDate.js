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
  const parts = date.split(fromFormat[3]);
  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const part = fromFormat[i];

    if (part === 'YYYY') {
      year = parts[i];
    } else if (part === 'YY') {
      year = parts[i].slice(-2);
    } else if (part === 'MM') {
      month = parts[i];
    } else if (part === 'DD') {
      day = parts[i];
    }
  }

  const formattedDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];
    const getBigYear = +year < 30 ? '20' + year : '19' + year;
    const getSmallYear = year.slice(-2);

    if (part === 'YYYY') {
      formattedDate.push(year.length === 4 ? year : getBigYear);
    } else if (part === 'YY') {
      formattedDate.push(year.length === 2 ? year : getSmallYear);
    } else if (part === 'MM') {
      formattedDate.push(month);
    } else if (part === 'DD') {
      formattedDate.push(day);
    }
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
