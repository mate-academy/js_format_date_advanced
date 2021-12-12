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
  let splitDate = [];
  const firstLetter = [];
  const result = [];
  let newDate = '';

  splitDate = date.split(fromFormat[3]);

  for (let i = 0; i < splitDate.length; i++) {
    if (splitDate[i].length > 2) {
      splitDate[i] = splitDate[i].slice(2);
    }
  }

  for (const element of fromFormat) {
    firstLetter.push(element[0]);

    if (element === fromFormat[2]) {
      break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    for (let j = 0; j < firstLetter.length; j++) {
      if (toFormat[i].includes(firstLetter[j])) {
        if (toFormat[i] === 'YYYY') {
          if (splitDate[j] >= 30) {
            result.push('19' + splitDate[j]);
          } else {
            result.push('20' + splitDate[j]);
          }
        } else {
          result.push(splitDate[j]);
        }
      }
    }
  }

  newDate = result.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
