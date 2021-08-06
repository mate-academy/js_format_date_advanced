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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  let year, month, day;
  const oldDateSplit = date.split(oldSeparator);
  const newDate = [];

  for (let oldOrder = 0; oldOrder < fromFormat.length - 1; oldOrder++) {
    switch (fromFormat[oldOrder]) {
      case 'YY':
      case 'YYYY':
        year = oldDateSplit[oldOrder].slice(-2);
        break;

      case 'MM':
        month = oldDateSplit[oldOrder];
        break;

      case 'DD':
        day = oldDateSplit[oldOrder];
        break;
    }
  }

  for (let newOrder = 0; newOrder < toFormat.length - 1; newOrder++) {
    switch (toFormat[newOrder]) {
      case 'YY':
        newDate[newOrder] = year;
        break;

      case 'YYYY':
        newDate[newOrder] = +year < 30 ? '20' + year : '19' + year;
        break;

      case 'MM':
        newDate[newOrder] = month;
        break;

      case 'DD':
        newDate[newOrder] = day;
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
