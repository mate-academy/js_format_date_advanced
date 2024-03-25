/* eslint-disable no-console */
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
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];

  const dateParts = date.split(OLD_SEPARATOR);
  const fromFormatParts = fromFormat.slice(0, 3);
  const toFormatParts = toFormat.slice(0, 3);

  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormatParts.length; i++) {
    switch (fromFormatParts[i]) {
      case 'YYYY':
      case 'YY':
        year = dateParts[i];
        break;
      case 'MM':
        month = dateParts[i];
        break;
      case 'DD':
        day = dateParts[i];
        break;
    }
  }

  const newDateFormatArr = [];

  for (let i = 0; i < toFormatParts.length; i++) {
    switch (toFormatParts[i]) {
      case 'YYYY':
        if (year.length === 2) {
          const FORMATED_YEAR = Number(year) < 30 ? `20${year}` : `19${year}`;

          newDateFormatArr.push(FORMATED_YEAR);
        } else {
          newDateFormatArr.push(year);
        }
        break;
      case 'YY':
        if (year.length === 4) {
          const FORMATED_YEAR = year.slice(2);

          newDateFormatArr.push(FORMATED_YEAR);
        } else {
          newDateFormatArr.push(year);
        }
        break;
      case 'MM':
        newDateFormatArr.push(month);
        break;
      case 'DD':
        newDateFormatArr.push(day);
        break;
    }
  }

  const newDateFormat = newDateFormatArr.join(NEW_SEPARATOR);

  return newDateFormat;
}

console.log(formatDate(
  '2020-02-18',
  ['YYYY', 'MM', 'DD', '-'],
  ['YYYY', 'MM', 'DD', '.'],
)); // '2020.02.18'

module.exports = formatDate;
