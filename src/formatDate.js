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
  const oldDateArr = date.split(fromFormat[3]);
  const newDateArr = [];
  const objDate = {};

  fromFormat.forEach((el, ind) => {
    if (el.includes('YY')) {
      objDate.year = oldDateArr[ind];
    } else if (el.includes('MM')) {
      objDate.month = oldDateArr[ind];
    } else if (el.includes('DD')) {
      objDate.day = oldDateArr[ind];
    } else {
      objDate.delimiter = oldDateArr[ind];
    }
  });

  let { year, delimiter } = objDate;
  const { month, day } = objDate;

  toFormat.forEach(el => {
    if (el.includes('YY')) {
      if (el.length < year.length) {
        year = year.slice(2);
      }

      if (el.length > year.length) {
        year = (+year < 30)
          ? '20' + year
          : '19' + year;
      }
      newDateArr.push(year);
    } else if (el.includes('MM')) {
      newDateArr.push(month);
    } else if (el.includes('DD')) {
      newDateArr.push(day);
    } else {
      delimiter = el;
      newDateArr.push(delimiter);
    }
  });

  return newDateArr.slice(0, 3).join(delimiter);
}

module.exports = formatDate;
