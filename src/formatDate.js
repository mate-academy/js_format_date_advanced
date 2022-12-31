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
  const yearLengthFormat = toFormat.find(el => el[0] === 'Y').length;
  const dateArray = date.split(fromFormat[3]);
  const day = dateArray[getDateIndex('D', fromFormat)];
  const month = dateArray[getDateIndex('M', fromFormat)];
  let year = dateArray[getDateIndex('Y', fromFormat)];

  if (yearLengthFormat === 2 && year.length === 4) {
    year = year[2] + year[3];
  }

  if (yearLengthFormat === 4 && year.length === 2) {
    year = (+year < 30) ? '20' + year : '19' + year;
  }

  dateArray[toFormat.indexOf('DD')] = day;
  dateArray[toFormat.indexOf('MM')] = month;
  dateArray[toFormat.indexOf('Y'.repeat(yearLengthFormat))] = year;

  return dateArray.join(toFormat[3]);
}

const getDateIndex = function(dateType, array) {
  return array.findIndex(el => el[0] === dateType);
};

module.exports = formatDate;
