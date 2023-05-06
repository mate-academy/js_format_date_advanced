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
  const result = [];
  const sign = fromFormat[fromFormat.length - 1];
  const newSign = toFormat[toFormat.length - 1];
  const dateFormatObj = {};
  const countOfY = toFormat.reduce((count, format) => {
    return count + (format.match(/Y/g) || []).length;
  }, 0);

  fromFormat.splice(0, 3).forEach((format, i) => {
    dateFormatObj[format] = date.split(sign)[i];
  });

  const { YYYY, YY } = dateFormatObj;
  let year = YY || YYYY;

  if (year.toString().length > countOfY) {
    year = year.slice(-2);
    dateFormatObj['YY'] = year;
  }

  if (year.toString().length < countOfY) {
    if (year >= 30) {
      year = `19${year}`;
      dateFormatObj['YYYY'] = year;
    } else {
      year = `20${year}`;
      dateFormatObj['YYYY'] = year;
    }
  }

  toFormat.splice(0, 3).forEach(format => {
    if (format === 'YY' || format === 'YYYY') {
      result.push(dateFormatObj[format]);
    } else if (format === 'MM') {
      result.push(dateFormatObj[format]);
    } else if (format === 'DD') {
      result.push(dateFormatObj[format]);
    }
  });

  return result.join(newSign);
}

module.exports = formatDate;
