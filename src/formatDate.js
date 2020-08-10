'use strict';

/**
 * Time flies, standards change.
 * Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array variable,
 * and the new `toFormat` array variable.
 * Function returns given date in `toFormat` format.
 *
 * Example:
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YY', '/']
 * ) // '18/02/20'
 * formatDate(
 *   '2021-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YY', '/']
 * ) // '18/02/21'
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.']
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const currentYear = 20;
  const result = [];

  for (let i = 0; i < fromFormat.length; i++) {
    for (let j = 0; j < toFormat.length; j++) {
      const isGreater = fromFormat[i].length > toFormat[j].length;
      const isLower = fromFormat[i].length < toFormat[j].length;

      if (fromFormat[i][0] === toFormat[j][0] && isGreater) {
        result[j] = dateArray[i].slice(2);
        break;
      }

      if (fromFormat[i][0] === toFormat[j][0] && isLower) {
        if (dateArray[i] > currentYear) {
          result[j] = '19' + dateArray[i];
        } else {
          result[j] = '20' + dateArray[i];
        }
        break;
      }

      if (fromFormat[i][0] === toFormat[j][0]) {
        result[j] = dateArray[i];
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
