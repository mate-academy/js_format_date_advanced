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
  const newSeparator = toFormat[3];
  const maxYear = 30;

  const shortYear = 'YY';
  const longYear = 'YYYY';
  const twentiethCentury = '20';
  const ninetiethCentury = '19';
  const century = 100;

  const oldObjectDate = {};
  const oldArrayDate = date.split(oldSeparator);
  const newArrayDate = [];
  const lengthOfNewDate = 3;

  for (let i = 0; i < oldArrayDate.length; i++) {
    if (fromFormat[i] === shortYear) {
      if (+oldArrayDate[i] < maxYear) {
        oldArrayDate[i] = twentiethCentury + oldArrayDate[i];
      } else {
        oldArrayDate[i] = ninetiethCentury + oldArrayDate[i];
      }
      fromFormat[i] = longYear;
    }
    oldObjectDate[fromFormat[i]] = oldArrayDate[i];
  }

  for (let i = 0; i < lengthOfNewDate; i++) {
    if (toFormat[i] === shortYear) {
      newArrayDate.push(oldObjectDate[longYear] % century);
    } else {
      newArrayDate.push(oldObjectDate[toFormat[i]]);
    }
  }

  return newArrayDate.join(newSeparator);

  // const object = {};
  // const arrDate = date.split(fromFormat[3]);

  // for (let i = 0; i < arrDate.length; i++) {
  //   if (fromFormat[i] === 'YY') {
  //     if (+arrDate[i] < 30) {
  //       arrDate[i] = '20' + arrDate[i];
  //     } else {
  //       arrDate[i] = '19' + arrDate[i];
  //     }
  //     fromFormat[i] = 'YYYY';
  //   }
  //   object[fromFormat[i]] = arrDate[i];
  // }

  // const array = [];

  // for (let i = 0; i < 3; i++) {
  //   if (toFormat[i] === 'YY') {
  //     array.push(object['YYYY'] % 100);
  //   } else {
  //     array.push(object[toFormat[i]]);
  //   }
  // }

  // return array.join(toFormat[3]);
}

module.exports = formatDate;
