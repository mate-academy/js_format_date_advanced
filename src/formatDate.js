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
  const separatorOld = fromFormat[3];
  const separatorNew = toFormat[3];
  const oldDateArr = date.split(separatorOld);
  const newDateArr = [];
  let DD;
  let MM;
  let YY;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      DD = oldDateArr[i];
    } else if (fromFormat[i] === 'MM') {
      MM = oldDateArr[i];
    } else if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      YY = oldDateArr[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDateArr.push(DD);
    } else if (toFormat[i] === 'MM') {
      newDateArr.push(MM);
    } else if (toFormat[i] === 'YY') {
      if (YY.length === 2) {
        newDateArr.push(YY);
      } else if (YY.length === 4) {
        newDateArr.push(YY[2] + YY[3]);
      }
    } else if (toFormat[i] === 'YYYY') {
      if (YY.length === 4) {
        newDateArr.push(YY);
      } else if (YY.length === 2 && +YY < 30) {
        newDateArr.push(`20${YY}`);
      } else if (YY.length === 2 && +YY >= 30) {
        newDateArr.push(`19${YY}`);
      }
    }
  }

  return newDateArr.join(`${separatorNew}`);
};

module.exports = formatDate;
