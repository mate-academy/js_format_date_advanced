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
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const newDateArr = [];

  newDateArr[toFormat.indexOf('DD')] = dateArr[fromFormat.indexOf('DD')];
  newDateArr[toFormat.indexOf('MM')] = dateArr[fromFormat.indexOf('MM')];

  if (fromFormat.includes('YYYY') && toFormat.includes('YYYY')) {
    newDateArr[toFormat.indexOf('YYYY')] = dateArr[fromFormat.indexOf('YYYY')];
  } else if (fromFormat.includes('YY') && toFormat.includes('YY')) {
    newDateArr[toFormat.indexOf('YY')] = dateArr[fromFormat.indexOf('YY')];
  } else if (fromFormat.includes('YYYY')) {
    const yy = dateArr[fromFormat.indexOf('YYYY')].slice(2);

    newDateArr[toFormat.indexOf('YY')] = yy;
  } else {
    if (dateArr[fromFormat.indexOf('YY')] < 30) {
      newDateArr[toFormat.indexOf('YYYY')] = `20${dateArr[fromFormat.indexOf('YY')]}`;
    } else {
      newDateArr[toFormat.indexOf('YYYY')] = `19${dateArr[fromFormat.indexOf('YY')]}`;
    }
  }

  return newDateArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
