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
  const firstSeparator = fromFormat[3];
  const secondSeparator = toFormat[3];
  const dateArray = date.split(firstSeparator);
  const year = findYear(dateArray, fromFormat);
  let numericYear = parseInt(year);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'MM' || fromFormat[i] === 'DD') {
      const index = toFormat.indexOf(fromFormat[i]);

      result[index] = dateArray[i];
    } else if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      const index = toFormat.indexOf(fromFormat[i]);

      result[index] = dateArray[i];
    }
  }

  if (toFormat.includes('YY') && year.length > 2 && numericYear < 2000) {
    const index = toFormat.indexOf('YY');

    numericYear -= 1900;
    result[index] = numericYear;
  }

  if (toFormat.includes('YY') && year.length > 2 && numericYear >= 2000) {
    const index = toFormat.indexOf('YY');

    numericYear -= 2000;
    result[index] = numericYear;
  }

  if (toFormat.includes('YYYY') && numericYear < 30) {
    const index = toFormat.indexOf('YYYY');

    numericYear += 2000;
    result[index] = numericYear;
  }

  if (toFormat.includes('YYYY') && numericYear >= 30 && numericYear < 1000) {
    const index = toFormat.indexOf('YYYY');

    numericYear += 1900;
    result[index] = numericYear;
  }

  return result.join(secondSeparator);
}

function findYear(date, format) {
  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'YY' || format[i] === 'YYYY') {
      return date[i];
    }
  }
}

module.exports = formatDate;
