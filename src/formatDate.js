/* eslint-disable max-len */
'use strict';

/*
 * Time flies, standards change. Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function returns given date in `toFormat` format.
 *
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.']) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateNumbers = date.split(fromFormat[3]);
  let year;
  const result = [];

  for (let i = 0; i < fromFormat.length; i++) {
    for (let j = 0; j < toFormat.length; j++) {
      if (toFormat[i] === fromFormat[j]) {
        result.push(dateNumbers[j]);
        break;
      }

      if (toFormat[i] === 'YY' && fromFormat[j] === 'YYYY') {
        year = dateNumbers[j].slice(2);
        result.push(year);
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
