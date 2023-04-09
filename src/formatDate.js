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
  const oldDateParts = date.split(fromFormat[fromFormat.length - 1]);
  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const formatPart = fromFormat[i];
    const value = parseInt(oldDateParts[i], 10);

    if (formatPart === 'YYYY') {
      year = value;
    } else if (formatPart === 'YY') {
      year = value < 30 ? 2000 + value : 1900 + value;
    } else if (formatPart === 'MM') {
      month = value;
    } else if (formatPart === 'DD') {
      day = value;
    }
  }

  let newYear;
  const yearIndex = toFormat.indexOf('YYYY');

  if (yearIndex !== -1) {
    newYear = year.toString();
  } else {
    newYear = year % 100;

    if (newYear < 10) {
      newYear = '0' + newYear.toString();
    }
  }

  const newDateParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const formatPart = toFormat[i];

    if (formatPart === 'YYYY') {
      newDateParts.push(newYear);
    } else if (formatPart === 'YY') {
      newDateParts.push(newYear);
    } else if (formatPart === 'MM') {
      const monthStr = month < 10 ? '0' + month.toString() : month.toString();

      newDateParts.push(monthStr);
    } else if (formatPart === 'DD') {
      const dayStr = day < 10 ? '0' + day.toString() : day.toString();

      newDateParts.push(dayStr);
    }
  }

  const separator = toFormat[toFormat.length - 1];
  const newDate = newDateParts.join(separator);

  return newDate;
}

module.exports = formatDate;
