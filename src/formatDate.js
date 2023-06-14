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
  const reversedFromFormat = [...fromFormat].reverse();
  const [separator, ...oldFormat] = reversedFromFormat;
  const newSeparator = toFormat[toFormat.length - 1];
  const arrayDate = date.split(separator).reverse();
  let year = '';
  const oldFormatDate = {};
  let result = '';

  for (let index = 0; index < oldFormat.length; index++) {
    if (oldFormat[index].includes('Y')) {
      year = arrayDate[index];
    }

    oldFormatDate[oldFormat[index]] = arrayDate[index];
  }

  for (let index = 0; index < toFormat.length - 1; index++) {
    if (toFormat[index].includes('Y')) {
      const newYear = convertYear(toFormat[index], year);

      result += newYear;
    } else {
      const partDate = oldFormatDate[toFormat[index]];

      result += partDate;
    }

    if (index !== toFormat.length - 2) {
      result += newSeparator;
    }
  }

  return result;
}

function convertYear(newFormat, year) {
  if (year.length === newFormat.length) {
    return year;
  }

  if (newFormat.length === 2) {
    return year.slice(2);
  }

  if (year < 30) {
    return `20${year}`;
  }

  return `19${year}`;
}

module.exports = formatDate;
