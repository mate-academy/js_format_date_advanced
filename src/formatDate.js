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
  const parts = date.split(fromFormat[fromFormat.length - 1]);
  let year, month, day, separator;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const format = fromFormat[i];
    const part = parts[i];

    if (format === 'YYYY') {
      year = parseInt(part);
    } else if (format === 'YY') {
      year = parseInt(part) + (parseInt(part) < 30 ? 2000 : 1900);
    } else if (format === 'MM') {
      month = part;
    } else if (format === 'DD') {
      day = part;
    }
  }

  let formattedYear;

  if (toFormat.includes('YYYY')) {
    formattedYear = year.toString().padStart(4, '0');
  } else {
    formattedYear = year.toString().slice(-2);
  }

  const formattedMonth = month.padStart(2, '0');
  const formattedDay = day.padStart(2, '0');

  const formattedDateParts = [];

  for (let i = 0; i < toFormat.length; i++) {
    const format = toFormat[i];

    if (format === 'YYYY') {
      formattedDateParts.push(formattedYear);
    } else if (format === 'YY') {
      formattedDateParts.push(formattedYear.slice(-2));
    } else if (format === 'MM') {
      formattedDateParts.push(formattedMonth);
    } else if (format === 'DD') {
      formattedDateParts.push(formattedDay);
    } else {
      separator = format;
    }
  }

  return formattedDateParts.join(separator.toString());
}

module.exports = formatDate;
