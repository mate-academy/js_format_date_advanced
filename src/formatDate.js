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
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dateArray = date.split(separatorFrom);
  let day;
  let month;
  let year;
  const result = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i][0] === 'Y') {
      year = dateArray[i];
    } else if (fromFormat[i][0] === 'M') {
      month = dateArray[i];
    } else if (fromFormat[i][0] === 'D') {
      day = dateArray[i];
    }
  }

  for (let k = 0; k < toFormat.length; k++) {
    if (toFormat[k][0] === 'D') {
      result.push(day);
    } else if (toFormat[k][0] === 'Y') {
      if (toFormat[k] === 'YYYY' && year.length <= 2 && +year < 30) {
        result.push('20' + year);
      } else if (toFormat[k] === 'YYYY' && year.length <= 2) {
        result.push('19' + year);
      } else if (toFormat[k] === 'YY' && year.length > 2) {
        result.push(year.slice(2));
      } else {
        result.push(year);
      }
    } else if (toFormat[k][0] === 'M') {
      result.push(month);
    }
  }

  return result.join(separatorTo);
}

module.exports = formatDate;
