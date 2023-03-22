'use strict';

/**
 * Time flies, standards change. Let's get rid of the routine of changing the
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
  const result = [];
  const splittedDate = date.split(fromFormat[fromFormat.length - 1]);
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = splittedDate[i];
    }

    if (fromFormat[i].includes('M')) {
      month = splittedDate[i];
    }

    if (fromFormat[i].includes('D')) {
      day = splittedDate[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].includes('Y')) {
      if (toFormat[i].length > year.length) {
        result[i] = (+year < 30)
          ? `20${year}`
          : `19${year}`;
      } else if (toFormat[i].length < year.length) {
        result[i] = year.slice(2);
      } else {
        result[i] = year;
      }
    }

    if (toFormat[i].includes('M')) {
      result[i] = month;
    }

    if (toFormat[i].includes('D')) {
      result[i] = day;
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
