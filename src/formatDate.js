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
  const newDate = date.split(fromFormat[3]);
  const result = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    result[fromFormat[i]] = newDate[i];
  }

  if (result.hasOwnProperty('YYYY')) {
    result['YY'] = result['YYYY'].slice(2);
  } else if (result['YY'] >= 30) {
    result['YYYY'] = '19' + result['YY'];
  } else {
    result['YYYY'] = '20' + result['YY'];
  }

  const massive = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    massive.push(result[toFormat[i]]);
  }

  return massive.join(toFormat[3]);
}

module.exports = formatDate;
