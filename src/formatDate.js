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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldArr = date.split(oldSeparator);
  const oldYear = fromFormat.includes('YY') ? oldArr[fromFormat.indexOf('YY')]
    : oldArr[fromFormat.indexOf('YYYY')];

  for (const value of toFormat) {
    if (value === 'DD') {
      result.push(oldArr[fromFormat.indexOf('DD')]);
    }

    if (value === 'MM') {
      result.push(oldArr[fromFormat.indexOf('MM')]);
    }

    if (value === 'YY' || value === 'YYYY') {
      if (value.length === oldYear.length) {
        result.push(oldYear);
      } else {
        result.push(convertYear(oldYear));
      }
    }
  }

  return result.join(newSeparator);
}

function convertYear(year) {
  if (year.length === 2) {
    return +year >= 30 ? '19' + year : '20' + year;
  } else {
    return year.slice(2);
  }
}
module.exports = formatDate;
