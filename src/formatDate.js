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
  const beforSeparator = fromFormat[3];
  const dateBefor = date.split(beforSeparator);
  const dateObject = {};

  for (let i = 0; i < dateBefor.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      dateObject.year = dateBefor[i];
    }

    if (fromFormat[i] === 'YY') {
      dateObject.year = +dateBefor[i] < 30
        ? '20' + dateBefor[i]
        : '19' + dateBefor[i];
    }
    dateObject[fromFormat[i]] = dateBefor[i];
  }

  const dateAfter = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        dateAfter[i] = dateObject.year;
        break;
      case 'YY':
        dateAfter[i] = dateObject.year.slice(-2);
        break;
      case 'MM':
        dateAfter[i] = dateObject[toFormat[i]];
        break;
      case 'DD':
        dateAfter[i] = dateObject[toFormat[i]];
        break;
    }
  }

  const afterSeparator = toFormat[3];

  return dateAfter.join(afterSeparator);
}

module.exports = formatDate;
