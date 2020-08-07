/* eslint-disable max-len */
'use strict';

/**
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
  const initialDate = date.split(fromFormat[3]);
  const oldFormat = {};
  const newFormat = {};

  // Create objects: oldFormat {} with date and empty newFormat {}
  for (let i = 0; i < 3; i++) {
    oldFormat[fromFormat[i]] = initialDate[i];
    newFormat[toFormat[i]] = null;
  }

  // Compare keys and assign values to newFormat object
  for (const key in oldFormat) {
    for (const prop in newFormat) {
      if (prop === key) {
        newFormat[prop] = oldFormat[key];
      }

      if (prop.startsWith('Y') && key.startsWith('Y')) {
        newFormat[prop] = oldFormat[key];

        if (newFormat[prop].length > prop.length) {
          newFormat[prop] = newFormat[prop].slice(2);
        }
      }
    }
  }

  const result = Object.values(newFormat);

  return result.join(toFormat[3]);
};

module.exports = formatDate;
