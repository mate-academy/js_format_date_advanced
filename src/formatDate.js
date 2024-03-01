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
  const fromArr = date.split(fromFormat[3]);
  let fromMonth = 0;
  let fromDay = 0;
  let fromYear = 0;
  const resultArr = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'MM') {
      fromMonth = i;
    }

    if (fromFormat[i] === 'DD') {
      fromDay = i;
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      fromYear = i;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'MM') {
      resultArr.push(fromArr[fromMonth]);
    }

    if (toFormat[i] === 'DD') {
      resultArr.push(fromArr[fromDay]);
    }

    if (toFormat[i] === 'YY') {
      if (fromArr[fromYear].length === 2) {
        resultArr.push(fromArr[fromYear]);
      } else {
        resultArr.push(fromArr[fromYear].slice(-2));
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (fromArr[fromYear].length === 2) {
        if (parseInt(fromArr[fromYear]) < 30) {
          resultArr.push(`20` + fromArr[fromYear]);
        } else {
          resultArr.push(`19` + fromArr[fromYear]);
        }
      } else {
        resultArr.push(fromArr[fromYear]);
      }
    }
  }

  return resultArr.join(`${toFormat[3]}`);
}

module.exports = formatDate;
