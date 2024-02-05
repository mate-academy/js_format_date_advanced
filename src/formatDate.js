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
  // write code here
  const firstSeparator = fromFormat[fromFormat.length - 1];
  const dateItems = date.split(firstSeparator);
  const obj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    obj[fromFormat[i]] = dateItems[i];
  }

  const obj2 = {};
  const secondSeparator = toFormat[fromFormat.length - 1];
  const fromFormatTemp = Array.from(fromFormat).sort();
  const toFormatTemp = Array.from(toFormat).sort();

  for (let i = 0; i < fromFormatTemp.length; i++) {
    let year = 0;

    if (fromFormatTemp[i].length > toFormatTemp[i].length) {
      year = obj[fromFormatTemp[i]].slice(2);
    } else if (fromFormatTemp[i].length < toFormatTemp[i].length) {
      if (obj[fromFormatTemp[i]] < 30) {
        year = 2000 + parseInt(obj[fromFormatTemp[i]]);
      } else {
        year = 1900 + parseInt(obj[fromFormatTemp[i]]);
      }
    } else {
      year = obj[fromFormatTemp[i]];
    }

    obj2[toFormatTemp[i]] = year;
  }

  const finalResult = [];

  for (let i = 0; i < fromFormatTemp.length - 1; i++) {
    finalResult.push(obj2[toFormat[i]]);
  }

  return finalResult.join(secondSeparator);
}

module.exports = formatDate;
