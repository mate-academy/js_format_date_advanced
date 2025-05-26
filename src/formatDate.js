'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const words = date.split(fromSeparator);
  const orgDate = {};
  let result = '';

  for (let i = 0; i < fromFormat.length; i++) {
    const key = fromFormat[i];

    orgDate[key] = words[i];
  }

  if (orgDate['YYYY'] === undefined) {
    const shortYear = orgDate['YY'];

    if (shortYear < 30) {
      orgDate['YYYY'] = '20' + shortYear;
    } else {
      orgDate['YYYY'] = '19' + shortYear;
    }
  }

  if (orgDate['YY'] === undefined) {
    orgDate['YY'] = orgDate['YYYY'].substring(2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result += orgDate[toFormat[i]];

    if (i < toFormat.length - 2) {
      result += toSeparator;
    }
  }

  return result;
}

module.exports = formatDate;
