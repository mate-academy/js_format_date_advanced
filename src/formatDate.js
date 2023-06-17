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
  const DATE_ARR = date.split(fromFormat[3]);
  const SEPARATOR = toFormat[3];
  const dateObject = {};

  for (let i = 0; i < DATE_ARR.length; i++) {
    dateObject[fromFormat[i]] = DATE_ARR[i];
  }

  const formatedDate = {};

  for (const key in dateObject) {
    const part = dateObject[key];

    if (toFormat.includes(key)) {
      formatedDate[key] = part; ;
    };

    if (!toFormat.includes(key)) {
      if (key.length === 2 && part < 30) {
        formatedDate['YYYY'] = `20${part}`;
      }

      if (key.length === 2 && part >= 30) {
        formatedDate['YYYY'] = `19${part}`;
      }

      if (key.length === 4) {
        formatedDate['YY'] = `${part.charAt(2)}${part.charAt(3)}`;
      }
    };
  }

  return toFormat
    .map(el => formatedDate[el])
    .filter(el => el !== undefined)
    .join(SEPARATOR);
}

module.exports = formatDate;
