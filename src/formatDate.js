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
  const pastSeparator = fromFormat[fromFormat.length - 1];
  const futureSeparator = toFormat[toFormat.length - 1];
  const arrDate = date.split(`${pastSeparator}`);
  const yearIndex = fromFormat.indexOf('YYYY') === -1
    ? fromFormat.indexOf('YY') : fromFormat.indexOf('YYYY');

  const day = arrDate[fromFormat.indexOf('DD')];
  const month = arrDate[fromFormat.indexOf('MM')];
  const year = arrDate[yearIndex].slice(-2);
  const fullYear = (+year < 22 && +year >= 0) ? `20${year}` : `19${year}`;

  const newDate = [];

  for (const char of toFormat) {
    switch (char) {
      case 'DD':
        newDate.push(day);

        break;

      case 'MM':
        newDate.push(month);

        break;

      case 'YY':
        newDate.push(year);

        break;

      case 'YYYY':
        newDate.push(fullYear);

        break;
    }
  }

  return newDate.join(`${futureSeparator}`);
}

module.exports = formatDate;
