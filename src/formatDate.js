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
  const splittedDate = date.split(fromFormat[3]);
  const shortYear = 'YY';
  const longYear = 'YYYY';
  const dateMap = {};
  const toFormatShort = [];

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i].slice(0, 1)] = splittedDate[i];
    toFormatShort.push(toFormat[i].slice(0, 1));
  }

  if (fromFormat.includes(longYear) && toFormat.includes(shortYear)) {
    dateMap['Y'] = dateMap['Y'].slice(2, 4);
  }

  if (fromFormat.includes(shortYear) && toFormat.includes(longYear)) {
    switch (dateMap['Y'] < 30) {
      case (true):
        dateMap['Y'] = '20' + dateMap['Y'];
        break;

      case (false):
        dateMap['Y'] = '19' + dateMap['Y'];
        break;
    }
  }

  const newDate = [];

  for (const item of toFormatShort) {
    newDate.push(dateMap[item]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
