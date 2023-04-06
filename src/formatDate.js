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
  const day = toFormat.indexOf('DD');
  const month = toFormat.indexOf('MM');
  const yearShort = toFormat.indexOf('YY');
  const yearLong = toFormat.indexOf('YYYY');

  const arrFromFormat = date.split(fromFormat[3]);
  const newSeparator = toFormat[3];

  const formatedDate = [];

  for (let i = 0; i < arrFromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        formatedDate[day] = arrFromFormat[i];
        break;

      case 'MM':
        formatedDate[month] = arrFromFormat[i];
        break;

      case 'YYYY':
        if (toFormat.includes('YY')) {
          formatedDate[yearShort] = arrFromFormat[i].slice(2);
        }

        formatedDate[yearLong] = arrFromFormat[i];
        break;

      case 'YY':
        if (arrFromFormat[i].slice(0, 2) >= 30) {
          formatedDate[yearLong] = '19' + arrFromFormat[i];
          break;
        }

        formatedDate[yearLong] = '20' + arrFromFormat[i];
        break;
    }
  }

  return formatedDate.join(newSeparator);
}

module.exports = formatDate;
