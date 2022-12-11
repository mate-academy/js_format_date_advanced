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
  let day;
  let month;
  let year;

  const dateWithDots = date.split(fromFormat[3]);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateWithDots[i];
        break;

      case 'MM':
        month = dateWithDots[i];
        break;

      case 'YYYY':
        year = dateWithDots[i];
        break;

      case 'YY':
        year = dateWithDots[i];
        break;

      default:
        throw new Error('invalid type of action');
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY') {
      if (year.length === 2) {
        result.push(year);
      } else {
        result.push(year[2] + year[3]);
      }
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
    }

    if (toFormat[i] === 'DD') {
      result.push(day);
    }

    if (toFormat[i] === 'YYYY') {
      if (year.length === 4) {
        result.push(year);
      }

      if (year.length === 2 && +year < 30) {
        result.push('20' + `${year}`);
      } else if (year.length === 2 && +year >= 30) {
        result.push('19' + `${year}`);
      }
    }
  }

  return result.join(toFormat[3]);
  // write code here
}

module.exports = formatDate;
