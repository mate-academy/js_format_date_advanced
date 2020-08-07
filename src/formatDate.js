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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldDate = date.split(oldSeparator);

  const oldFormat = {};
  const result = [];

  // Create oldFormat {} from fromFormat []
  for (let i = 0; i < oldDate.length; i++) {
    oldFormat[fromFormat[i]] = oldDate[i];
  }

  // Check for 'DD' and 'MM' keys in oldFormat {}, if found push to result []
  for (let i = 0; i < oldDate.length; i++) {
    if (toFormat[i] in oldFormat) {
      result.push(oldFormat[toFormat[i]]);
    }
  }

  const newYearFormat = toFormat[2];

  // Check if new format of year isn't already in oldFormat {}, if found return result []
  if (newYearFormat in oldFormat) {
    return result.join(newSeparator);
  }

  // Check for different formats of year
  for (const key in oldFormat) {
    if (key.startsWith('Y')) {
      switch (key) {
        case 'YY':
          if (+oldFormat[key] > 20) {
            result.push('20' + oldFormat[key]);
          } else {
            result.push('19' + oldFormat[key]);
          }
          break;

        case 'YYYY':
          result.push(oldFormat[key].slice(2));
          break;

        default: return 'Wrong year format!';
      }
    }
  }

  return result.join(newSeparator);
};

module.exports = formatDate;
