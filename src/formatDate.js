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
  const dateArr = date.split(fromFormat[3]);
  const newDataArr = [];
  const oldMM = fromFormat.indexOf('MM');
  const oldDD = fromFormat.indexOf('DD');
  const oldYY = fromFormat.indexOf(fromFormat.find(el => el.includes('YY')));
  const newMM = toFormat.indexOf('MM');
  const newDD = toFormat.indexOf('DD');
  const newYY = toFormat.indexOf(toFormat.find(el => el.includes('YY')));

  newDataArr[newDD] = dateArr[oldDD];
  newDataArr[newMM] = dateArr[oldMM];

  if (toFormat[newYY].length === 4 && fromFormat[oldYY].length === 2) {
    switch (true) {
      case dateArr[oldYY] < 30:
        newDataArr[newYY] = '20' + dateArr[oldYY];
        break;

      case dateArr[oldYY] >= 30:
      default:
        newDataArr[newYY] = '19' + dateArr[oldYY];
        break;
    }
  } else if (toFormat[newYY].length === 2 && fromFormat[oldYY].length === 4) {
    newDataArr[newYY] = dateArr[oldYY].slice(2, 4);
  } else {
    newDataArr[newYY] = dateArr[oldYY];
  }

  return newDataArr.join(toFormat[3]);
}

module.exports = formatDate;
