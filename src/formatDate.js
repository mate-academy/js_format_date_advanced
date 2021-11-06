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
  const fromDateArray = date.split(fromFormat[3]);

  const dateObj = {};

  for (let i = 0; i < fromDateArray.length; i++) {
    dateObj[fromFormat[i]] = fromDateArray[i];
  }

  const resultDateArray = [];

  for (const abbr of toFormat) {
    for (const elem in dateObj) {
      if (elem === abbr) {
        resultDateArray.push(dateObj[elem]);
        break;
      } else if (abbr.includes(elem)) {
        if (+dateObj[elem] < 30) {
          resultDateArray.push(`20${dateObj[elem]}`);
          break;
        } else {
          resultDateArray.push(`19${dateObj[elem]}`);
          break;
        }
      } else if (elem.includes(abbr)) {
        resultDateArray.push(dateObj[elem].slice(-2));
        break;
      }
    }
  }

  return resultDateArray.join(toFormat[3]);
}

module.exports = formatDate;
