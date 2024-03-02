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
  const from = {
    Month: 0,
    Day: 0,
    Year: 0,
  };
  const resultArr = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'MM') {
      from.Month = i;
    }

    if (fromFormat[i] === 'DD') {
      from.Day = i;
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      from.Year = i;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'MM') {
      resultArr.push(fromArr[from.Month]);
    }

    if (toFormat[i] === 'DD') {
      resultArr.push(fromArr[from.Day]);
    }

    if (toFormat[i] === 'YY') {
      if (fromArr[from.Year].length === 2) {
        resultArr.push(fromArr[from.Year]);
      } else {
        resultArr.push(fromArr[from.Year].slice(-2));
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (fromArr[from.Year].length === 2) {
        if (parseInt(fromArr[from.Year]) < 30) {
          resultArr.push(`20` + fromArr[from.Year]);
        } else {
          resultArr.push(`19` + fromArr[from.Year]);
        }
      } else {
        resultArr.push(fromArr[from.Year]);
      }
    }
  }

  return resultArr.join(`${toFormat[3]}`);
}

module.exports = formatDate;
