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
  const dateObject = {};
  const finalArray = [];
  const initialDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        dateObject.year = initialDate[i];
        break;
      case 'YYYY':
        dateObject.year = initialDate[i];
        break;
      case 'MM':
        dateObject.month = initialDate[i];
        break;
      case 'DD':
        dateObject.day = initialDate[i];
        break;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject.year = dateObject.year.slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateObject.year < 30) {
      dateObject.year = '20' + dateObject.year;
    } else {
      dateObject.year = '19' + dateObject.year;
    }
  }

  for (const char of toFormat) {
    switch (char) {
      case 'YY':
        finalArray.push(dateObject.year);
        break;
      case 'YYYY':
        finalArray.push(dateObject.year);
        break;
      case 'MM':
        finalArray.push(dateObject.month);
        break;
      case 'DD':
        finalArray.push(dateObject.day);
        break;
    }
  }

  const result = finalArray.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
