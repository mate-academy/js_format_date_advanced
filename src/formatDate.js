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
  const separator = String(toFormat[3]);
  const dateSplit = date.split(fromFormat[3]);

  for (let i = 0; i < toFormat.length; i++) {
    for (let j = 0; j < fromFormat.length; j++) {
      if (dateLength(toFormat[i]) === dateLength(fromFormat[j])) {
        if (toFormat[i].length === fromFormat[j].length) {
          toFormat[i] = dateSplit[j];
        } else {
          toFormat[i] = getYear(toFormat[i], dateSplit[j]);
        }
      }
    }
  }

  return toFormat.slice(0, 3).join(separator);
};

function dateLength(value) {
  return value.length > 2 ? value.slice(0, 2) : value;
}

function getFullYear(end) {
  const start = end >= 30 ? 19 : 20;

  return '' + start + end;
}

function getYear(toFormat, date) {
  return toFormat.length > 2 ? getFullYear(date) : date.slice(2);
}

module.exports = formatDate;
