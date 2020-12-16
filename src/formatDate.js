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
  const currentDate = date.split(fromFormat[3]);
  const newFormat = ['', '', ''];
  const yearFormat = (fromFormat.includes('YY'))
    ? currentDate[fromFormat.indexOf('YY')]
    : currentDate[fromFormat.indexOf('YYYY')];

  newFormat[toFormat.indexOf('DD')] = currentDate[fromFormat.indexOf('DD')];
  newFormat[toFormat.indexOf('MM')] = currentDate[fromFormat.indexOf('MM')];

  for (let i = 0; i < currentDate.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (yearFormat.length === 2 && yearFormat <= 21) {
          newFormat[toFormat.indexOf('YYYY')] = '20' + yearFormat;
        } else if (yearFormat.length === 2) {
          newFormat[toFormat.indexOf('YYYY')]
            = '19' + yearFormat;
        } else {
          newFormat[toFormat.indexOf('YYYY')]
            = yearFormat;
        }
        break;

      case 'YY':
        newFormat[toFormat.indexOf('YY')]
          = yearFormat.slice(-2);
        break;
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
