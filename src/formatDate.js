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
  const dateToArray = date.split(fromFormat[3]);
  const separator = toFormat[3];
  const formatedDate = [];

  fromFormat.pop();
  toFormat.pop();

  const fromFormatWithDate = Object.assign(...fromFormat.map((n, i) =>
    ({ [n] : dateToArray[i] })));

  const s = fromFormat.map((n, i) =>
    ({ [n] : dateToArray[i] }));

  const toFormatWithDate = Object.assign(...toFormat.map((n, i) =>
    ({ [n] : formatDate[i] })));

  for (const key in toFormatWithDate) {
    toFormatWithDate[key] = fromFormatWithDate[key];
  }

  if ('YY' in toFormatWithDate) {
    if (toFormatWithDate['YY'] === undefined) {
      toFormatWithDate['YY'] = fromFormatWithDate['YYYY'].slice(2);
    }
  }

  if ('YYYY' in toFormatWithDate) {
    if (toFormatWithDate['YYYY'] === undefined) {
      if (fromFormatWithDate['YY'] < 30) {
        toFormatWithDate['YYYY'] = '20' + fromFormatWithDate['YY'];
      } else {
        toFormatWithDate['YYYY'] = '19' + fromFormatWithDate['YY'];
      }
    }
  }

  const finalArray = Object.values(toFormatWithDate).join(separator);

  return finalArray;
}

module.exports = formatDate;
