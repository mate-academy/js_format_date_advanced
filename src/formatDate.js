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

// const date = '20/02/18';
// const fromFormat = ['YY', 'MM', 'DD', '/'];
// const toFormat = ['YYYY', 'MM', 'DD', '-'];

function formatDate(date, fromFormat, toFormat) {
  const temp = {};
  let newDate = '';
  const splittedDate = date.split(fromFormat[3]);
  const [,,, newSymbol] = toFormat;

  // adding to temp object fromFormat values as a keys and values from date
  for (let i = 0; i < fromFormat.length - 1; i++) {
    temp[fromFormat[i]] = splittedDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    // comparing our temp data with toFormat data
    // and adding result to newDate string
    if (temp.YYYY
    && toFormat[i] === 'YY') {
      newDate += temp.YYYY.slice(2) + newSymbol;
    } else if (temp.YY
    && toFormat[i] === 'YYYY') {
      if (temp.YY >= 30) {
        newDate += `19${temp.YY}` + newSymbol;
      } else {
        newDate += `20${temp.YY}` + newSymbol;
      }
    } else {
      newDate += temp[toFormat[i]] + newSymbol;
    }
  }
  // getting rid of last element in the newDate
  newDate = newDate.split('');
  newDate.pop();

  return newDate.join('');
}
// console.log(formatDate(date, fromFormat, toFormat));

module.exports = formatDate;
