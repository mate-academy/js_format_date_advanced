
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
  const arrDate = date.split(fromFormat[3]);

  function yearLong(year) {
    if (year > 21) {
      return `19${year}`;
    } else {
      return `20${year}`;
    }
  }

  function yearShort(year) {
    let res = '';

    for (let i = 2; i < year.length; i++) {
      res += year[i];
    }

    return res;
  }

  let result = '';

  const dateParts = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateParts[fromFormat[i]] = arrDate[i];
  }

  if (dateParts.YY) {
    dateParts.YYYY = yearLong(dateParts.YY);
  }

  if (dateParts.YYYY) {
    dateParts.YY = yearShort(dateParts.YYYY);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result += dateParts[toFormat[i]];
    result += toFormat[3];
  }

  let finalResult = '';

  for (let i = 0; i < result.length - 1; i++) {
    finalResult += result[i];
  }

  return finalResult;
}

module.exports = formatDate;
