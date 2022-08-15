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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const result = [];
  const oldDate = date.split(oldSeparator);

  let oldYearFormat;
  let oldYear;
  let month;
  let day;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i].includes('Y')) {
      oldYear = oldDate[i];
      oldYearFormat = fromFormat[i];
    }

    if (fromFormat[i].includes('M')) {
      month = oldDate[i];
    }

    if (fromFormat[i].includes('D')) {
      day = oldDate[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i].includes('Y')) {
      if (toFormat[i] === oldYearFormat) {
        result[i] = oldYear;
        continue;
      }

      if (toFormat[i].length === 2) {
        result[i] = oldYear.slice(2);
      }

      if (toFormat[i].length === 4) {
        if (+oldYear < 30) {
          result[i] = '20' + oldYear;
        } else {
          result[i] = '19' + oldYear;
        }
      }
    }

    if (toFormat[i].includes('M')) {
      result[i] = month;
    }

    if (toFormat[i].includes('D')) {
      result[i] = day;
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
