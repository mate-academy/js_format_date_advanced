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
  const oldSeparator = fromFormat[3];
  const result = date.split(oldSeparator);
  const newSeparator = toFormat[3];

  if (fromFormat[0] === toFormat[0] && fromFormat[2] === toFormat[2]) {
    return date.split(oldSeparator).join(newSeparator);
  } else if (fromFormat[0] === toFormat[2]) {
    return date.split(oldSeparator).reverse().join(newSeparator);
  } else if (fromFormat[2] !== toFormat[2]) {
    let year = result.pop();

    year = year.split('');
    year = year.slice(2, 4);
    year = year.join('');
    result.splice(2, 1, year);

    return result.join(toFormat[3]);
  } else if (+result[0] < 30 && +result[0] !== 0) {
    let formatedYear = result.shift();

    formatedYear = formatedYear.split(' ');
    formatedYear.push('20');
    formatedYear = formatedYear.join('');
    result.slice(0, 1);
    result.unshift(formatedYear);

    return result.join(toFormat[3]);
  } else if (result[0] === '00') {
    let fullYear = result.shift();

    fullYear = fullYear.split(' ');
    fullYear.unshift('20');
    fullYear = fullYear.join('');
    result.slice(0, 1);
    result.unshift(fullYear);

    return result.join(toFormat[3]);
  } else if (+result[0] === 30) {
    let fullYear = result.shift();

    fullYear = fullYear.split(' ');
    fullYear.unshift('19');
    fullYear = fullYear.join('');
    result.slice(0, 1);
    result.unshift(fullYear);

    return result.join(toFormat[3]);
  } else if (+result[0] > 30) {
    let fullYear = result.shift();

    fullYear = fullYear.split(' ');
    fullYear.unshift('19');
    fullYear = fullYear.join('');
    result.slice(0, 1);
    result.unshift(fullYear);

    return result.join(toFormat[3]);
  }
}

module.exports = formatDate;
