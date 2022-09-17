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
  // format length
  const formatLength = fromFormat.length;
  // push date in array
  const arrDate = date.split(fromFormat[formatLength - 1]);
  // dividing sign
  const separateSign = toFormat[formatLength - 1];
  // arrays with results
  const oldDate = [];
  const newDate = [];

  // loop were we add format and date in one value
  for (let i = 0; i < formatLength - 1; i++) {
    oldDate.push(`${fromFormat[i]}-${arrDate[i]}`);
  }

  // loop were we sort format+date values
  for (const itemOfDate of oldDate) {
    // loop were we can find same formats
    for (const partOfFormat in toFormat) {
      if (itemOfDate[0] === toFormat[partOfFormat][0]) {
        // here we check year format length
        if (toFormat[partOfFormat].length === 4) {
          // here we build result
          if (itemOfDate.slice(-2) < 30) {
            newDate[partOfFormat] = `20${itemOfDate.slice(-2)}${separateSign}`;
          } else {
            newDate[partOfFormat] = `19${itemOfDate.slice(-2)}${separateSign}`;
          }
        } else {
          newDate[partOfFormat] = `${itemOfDate.slice(-2)}${separateSign}`;
        }
      }
    }
  }

  return newDate.join('').slice(0, -1);
}

module.exports = formatDate;
