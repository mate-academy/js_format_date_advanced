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
  const elementsArr = date.split(`${fromFormat[fromFormat.length - 1]}`);

  const elementsObj = {};

  for (let i = 0; i < elementsArr.length; i++) {
    elementsObj[fromFormat[i]] = elementsArr[i];
  }

  for (const key in elementsObj) {
    switch (key) {
      case 'YYYY':
        elementsObj['YY'] = elementsObj[key].slice(2);
        break;

      case 'YY':
        if (elementsObj[key] < 30) {
          elementsObj['YYYY'] = `20${elementsObj[key]}`;
        } else {
          elementsObj['YYYY'] = `19${elementsObj[key]}`;
        }
        break;
    }
  }

  const resultArr = [];

  for (const v of toFormat) {
    for (const key in elementsObj) {
      if (key === v) {
        resultArr.push(elementsObj[key]);
      }
    }
  }

  return resultArr.join(`${toFormat[toFormat.length - 1]}`);
}

module.exports = formatDate;
