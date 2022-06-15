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
  // write code here
  const dateValues = date.split(fromFormat[fromFormat.length - 1]);
  const dateObject = {};
  const newFormat = [];

  let i = 0;

  for (const name of fromFormat) {
    switch (name) {
      case 'YYYY':
        dateObject['YYYY'] = dateValues[i];
        break;
      case 'YY':
        if (dateValues[i] >= 30) {
          dateObject['YYYY'] = 19 + dateValues[i];
        } else {
          dateObject['YYYY'] = 20 + dateValues[i];
        }
        break;
      case 'MM':
        dateObject['MM'] = dateValues[i];
        break;
      case 'DD':
        dateObject['DD'] = dateValues[i];
        break;
    }
    i++;
  }

  for (const name of toFormat) {
    switch (name) {
      case 'YYYY':
        newFormat.push(dateObject['YYYY']);
        break;
      case 'YY':
        newFormat.push(dateObject['YYYY'].slice(2));
        break;
      case 'MM':
        newFormat.push(dateObject['MM']);
        break;
      case 'DD':
        newFormat.push(dateObject['DD']);
        break;
    }
  }

  return newFormat.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
