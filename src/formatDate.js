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
  // Get the separator used in the current date format
  const dateSeparator = fromFormat[3];

  // Split the date string into its components
  const dateParts = date.split(dateSeparator);

  // Create an object to map the date parts to their format
  const dateObj = {};

  // Fill the date object with the date parts
  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateParts[i];
  }

  if (dateObj['YY'] && !dateObj['YYYY']) {
    dateObj['YYYY'] = dateObj['YY'] < 30 ? '20'
    + dateObj['YY'] : '19' + dateObj['YY'];
  }

  if (dateObj['YYYY'] && !dateObj['YY']) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  }

  // Map the date parts to the new format
  const newDateParts = toFormat.slice(0, 3).map(format => dateObj[format]);

  // Get the separator used in the new date format
  const newDateSeparator = toFormat[3];

  // Join the date parts into a string using the new separator
  return newDateParts.join(newDateSeparator);
}

module.exports = formatDate;
