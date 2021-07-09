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
  const arr = [];
  let result;
  const splittedDate = date.split(fromFormat[fromFormat.length - 1]);

  if (splittedDate[0].length !== toFormat[0].length
    && splittedDate[2].length !== toFormat[2].length) {
    splittedDate.reverse();
    result = splittedDate.join(toFormat[toFormat.length - 1]);

    return result;
  }

  if (splittedDate[0].length === toFormat[0].length
    && splittedDate[2].length !== toFormat[2].length
    && toFormat[2].length === 4) {
    splittedDate.reverse();
  }

  for (let i = 0; i < splittedDate.length; i++) {
    for (let j = i; j < fromFormat.length; j++) {
      for (let k = i; k < toFormat.length; k++) {
        if (toFormat[k].length === fromFormat[j].length) {
          arr.push(splittedDate[i]);
          break;
        } else if (toFormat[k].length < fromFormat[j].length) {
          arr.push(splittedDate[i].slice(2));
          break;
        } else if (toFormat[k].length > fromFormat[j].length
          && +splittedDate[i] >= 30) {
          arr.push('19' + splittedDate[i]);
          break;
        } else if (toFormat[k].length > fromFormat[j].length
          && +splittedDate[i] < 30) {
          arr.push('20' + splittedDate[i]);
          break;
        }
      }
      break;
    }
  }

  return arr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
