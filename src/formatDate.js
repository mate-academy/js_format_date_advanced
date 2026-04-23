'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const parts = date.split(oldSeparator);
  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  if (dateMap.hasOwnProperty('YYYY') && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(2);
    delete dateMap['YYYY'];
  }

  if (dateMap.hasOwnProperty('YY') && toFormat.includes('YYYY')) {
    dateMap['YYYY'] = dateMap['YY'];
    delete dateMap['YY'];

    if (dateMap['YYYY'] < 30) {
      dateMap['YYYY'] = '20' + dateMap['YYYY'];
    } else if (dateMap['YYYY'] >= 30) {
      dateMap['YYYY'] = '19' + dateMap['YYYY'];
    }
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateMap[toFormat[i]]);
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
