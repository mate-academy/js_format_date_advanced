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
  const existedDateArr = date.split(fromFormat[fromFormat.length - 1]);
  const sortedArr = [];
  const resultDateArr = [];

  // sort date to day, month, year
  for (let i = 0; i < fromFormat.length - 1; i++) {
    sortedArr.push(fromFormat[i] + existedDateArr[i]);
  }
  sortedArr.sort();

  const [day, month, year] = sortedArr.map(name => name.slice(2));

  // order day, month, year according to new format
  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('D')) {
      resultDateArr.push(day);
    } else if (toFormat[i].includes('M')) {
      resultDateArr.push(month);
    } else {
      if (toFormat[i].length > year.length) {
        if (+year < 30) {
          resultDateArr.push('20' + year);
        } else {
          resultDateArr.push('19' + year);
        }
      } else if (toFormat[i].length < year.length) {
        resultDateArr.push(year.slice(-toFormat[i].length));
      } else {
        resultDateArr.push(year);
      }
    }
  }

  return resultDateArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
