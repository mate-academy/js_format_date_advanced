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

  const splitedDate = date.split(fromFormat[3]);
  // console.log(splitedDate);

  const indexYYFormat = fromFormat.indexOf('YY');
  const indexYYYYFormat = fromFormat.indexOf('YYYY');

  const indexYYtoFormat = toFormat.indexOf('YY');
  const indexYYYYtoFormat = toFormat.indexOf('YYYY');

  const indexMMFormat = fromFormat.indexOf('MM');
  const indexMMtoFormat = toFormat.indexOf('MM');

  const indexDDFormat = fromFormat.indexOf('DD');
  const indexDDtoFormat = toFormat.indexOf('DD');

  const formattedArr = Array(3);

  formattedArr[indexMMtoFormat] = splitedDate[indexMMFormat];
  formattedArr[indexDDtoFormat] = splitedDate[indexDDFormat];

  if ((indexYYFormat !== -1) && (indexYYtoFormat !== -1)) {
    formattedArr[indexYYtoFormat] = formattedArr[indexYYFormat];
  }

  if ((indexYYFormat !== -1) && (indexYYYYtoFormat !== -1)) {
    if (splitedDate[indexYYFormat] < 30) {
      formattedArr[indexYYYYtoFormat] = 20 + splitedDate[indexYYFormat];
    } else {
      formattedArr[indexYYYYtoFormat] = '19' + splitedDate[indexYYFormat];
    }
  }

  if ((indexYYYYFormat !== -1) && (indexYYYYtoFormat !== -1)) {
    formattedArr[indexYYYYtoFormat] = splitedDate[indexYYYYFormat];
  }

  if ((indexYYYYFormat !== -1) && (indexYYtoFormat !== -1)) {
    formattedArr[indexYYtoFormat] = splitedDate[indexYYYYFormat].slice(2);
  }

  return formattedArr.join(toFormat[3]);
}

module.exports = formatDate;
