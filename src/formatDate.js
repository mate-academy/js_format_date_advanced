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
  let separatorFirst;
  let separatorEnd;

  for (const elementArr of date.split('')) {
    if (isNaN(elementArr)) {
      separatorFirst = elementArr;
    }
  }

  for (const element of toFormat.join(',')) {
    if (isNaN(element)) {
      separatorEnd = element;
    }
  }

  const result = [];
  const arrDate = date.split(separatorFirst);

  for (let i = 0; i < toFormat.length; i++) {
    for (let y = 0; y < arrDate.length; y++) {
      if (toFormat[i] === fromFormat[y]) {
        result[i] = arrDate[fromFormat.indexOf(fromFormat[y])];
      }

      if (toFormat[i] !== fromFormat[y] && toFormat[i].includes('YY')
      && fromFormat[y].includes('YY')) {
        if (fromFormat[y] === 'YYYY' && toFormat[i] === 'YY') {
          result[y] = arrDate[fromFormat.indexOf(fromFormat[y])].slice(2);
        } else {
          if (+arrDate[fromFormat.indexOf(fromFormat[y])] < 30) {
            result[y] = `20${arrDate[fromFormat.indexOf(fromFormat[y])]}`;
          } else {
            result[y] = `19${arrDate[fromFormat.indexOf(fromFormat[y])]}`;
          }
        }
      }
    }
  }

  return result.join(separatorEnd);
}

module.exports = formatDate;
