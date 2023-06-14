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
  const objDate = {};
  const oldFormat = fromFormat.slice(0, -1);
  const newFormat = toFormat.slice(0, -1);
  const oldDelimeter = fromFormat[3];
  const newDelimeter = toFormat[3];
  const arrData = date.split(oldDelimeter);
  let resDateStr = '';

  for (let i = 0; i < arrData.length; i++) {
    objDate[oldFormat[i]] = arrData[i];
  }

  if ('YYYY' in objDate) {
    objDate.YY = objDate.YYYY.slice(-2);
  }

  if (newFormat.includes('YYYY')) {
    if (objDate.YY < 30) {
      objDate.YYYY = `20${objDate.YY}`;
    } else if (objDate.YY >= 30) {
      objDate.YYYY = `19${objDate.YY}`;
    }
  }

  for (let i = 0; i < newFormat.length; i++) {
    resDateStr += objDate[newFormat[i]];

    if (i < newFormat.length - 1) {
      resDateStr += `${newDelimeter}`;
    }
  }

  return resDateStr;
}

module.exports = formatDate;
