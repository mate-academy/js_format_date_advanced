/* eslint-disable no-console */
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
  const oldDateSeparator = fromFormat[3];
  const newDateSeparator = toFormat[3];

  const newFormatParts = toFormat.slice(0, 3);

  const dateParts = date.split(oldDateSeparator);

  let year = '';
  let month = '';
  let day = '';

  fromFormat.forEach((part, index) => {
    if (part === 'YYYY' || part === 'YY') {
      year = dateParts[index];
    } else if (part === 'MM') {
      month = dateParts[index];
    } else if (part === 'DD') {
      day = dateParts[index];
    }
  });

  if (newFormatParts.includes('YYYY')) {
    if (year.length === 2) {
      year = (Number(year) < 30) ? '20' + year : '19' + year;
    }
  } else if (newFormatParts.includes('YY')) {
    year = (year.length === 4) ? year.slice(2) : year;
  }

  const formattedDateParts = newFormatParts.map(part => {
    if (part === 'YYYY') {
      return year;
    }

    if (part === 'YY') {
      return year;
    }

    if (part === 'MM') {
      return month;
    }

    if (part === 'DD') {
      return day;
    }
  });

  return formattedDateParts.join(newDateSeparator);
}

module.exports = formatDate;
