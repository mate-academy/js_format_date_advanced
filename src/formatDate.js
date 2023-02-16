"use strict";

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a sepOlld, reorder the date parts of convert a
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
  const sepOlld = fromFormat[fromFormat.length - 1];
  const sepNew = toFormat[toFormat.length - 1];
  const splitDate = date.split(sepOlld);

  const objOlldFormat = {};
  const objNewFormat = {};

  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objOlldFormat[fromFormat[i]] = splitDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    objNewFormat[toFormat[i]] = objOlldFormat[toFormat[i]];
  }

  if (
    objOlldFormat.hasOwnProperty('YYYY')
    && objNewFormat.hasOwnProperty('YY')
  ) {
    objNewFormat.YY = objOlldFormat.YYYY.slice(-2);
  }

  if (
    objNewFormat.hasOwnProperty('YYYY')
    && objOlldFormat.hasOwnProperty('YY')
  ) {
    if (objOlldFormat.YY < 30) {
      objNewFormat.YYYY = `20${objOlldFormat.YY}`;
    } else {
      objNewFormat.YYYY = `19${objOlldFormat.YY}`;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(objNewFormat[toFormat[i]]);
  }

  return result.join(sepNew);
}

module.exports = formatDate;
