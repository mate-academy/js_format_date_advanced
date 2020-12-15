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
 * @param {string} date date to be converted into specified format.
 * @param {string[]} fromFormat current format of the date.
 * @param {string[]} toFormat format into which the date will be converted.
 *
 * @returns {string} date in the new format.
 */

function formatDate(date, fromFormat, toFormat) {
  const dateInfo = date.split(fromFormat[3]);
  const separator = toFormat[toFormat.length - 1];
  let result = '';
  let day, month, year;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('D')) {
      day = dateInfo[i];
    }

    if (fromFormat[i].includes('M')) {
      month = dateInfo[i];
    }

    if (fromFormat[i].includes('Y')) {
      year = dateInfo[i];

      if (year.length === 2) {
        year = Number(year) < 30 ? '20' + year : '19' + year;
      }
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].includes('D')) {
      result += separator + day;
    }

    if (toFormat[i].includes('M')) {
      result += separator + month;
    }

    if (toFormat[i].includes('Y')) {
      if (toFormat[i].length === 4) {
        result += separator + year;
      } else {
        result += separator + year.substring(2);
      }
    }
  }

  return result.substring(1);
}

module.exports = formatDate;
