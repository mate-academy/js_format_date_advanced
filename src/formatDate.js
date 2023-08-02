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
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const arrDateFrom = date.split(separatorFrom);
  const objDateFrom = {};

  const arrDateTo = [];

  for (let i = 0; i < arrDateFrom.length; i++) {
    objDateFrom[fromFormat[i]] = arrDateFrom[i];
  }

  for (const datePart in objDateFrom) {
    if (toFormat.includes(datePart)) {
      arrDateTo[toFormat.indexOf(datePart)] = objDateFrom[datePart];
      continue;
    }

    if (datePart.length === 4) {
      arrDateTo[toFormat.indexOf('YY')] = objDateFrom[datePart].slice(2);
      continue;
    }

    if (datePart.length === 2) {
      arrDateTo[toFormat.indexOf('YYYY')] = objDateFrom[datePart] < 30
        ? '20' + objDateFrom[datePart]
        : '19' + objDateFrom[datePart];
    }
  }

  return arrDateTo.join(separatorTo);
}

module.exports = formatDate;
