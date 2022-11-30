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
  const arrDate = date.split(fromFormat[3]);

  const oldFormat = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldFormat[fromFormat[i]] = arrDate[i];
  }

  const newFormat = {};

  for (let i = 0; i < toFormat.length - 1; i++) {
    newFormat[toFormat[i]] = 0;
  }

  for (const key in oldFormat) {
    for (const newKey in newFormat) {
      if (key.slice(0, 1) === newKey.slice(0, 1)) {
        newFormat[newKey] = oldFormat[key];
      }
    }
  }

  if (newFormat['YY']) {
    newFormat['YY'] = newFormat['YY'].slice(2);
  }

  if (oldFormat['YY'] && newFormat['YYYY']) {
    if (Number(oldFormat['YY']) < 30) {
      newFormat['YYYY'] = `20` + `${newFormat['YYYY']}`;
    } else {
      newFormat['YYYY'] = `19` + `${newFormat['YYYY']}`;
    }
  }

  const arrNew = Object.values(newFormat);

  return arrNew.join(toFormat[3]);
}

module.exports = formatDate;
