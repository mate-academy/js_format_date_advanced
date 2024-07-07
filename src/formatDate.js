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
  const dataArr = date.split(fromSeparator);
  const obj = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    obj[fromFormat[i]] = dataArr[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (const key in obj) {
      if (toFormat[i] === key) {
        result.push(obj[key]);
      }
    }

    if (toFormat[i] === 'YY') {
      result.push(obj['YYYY'].split('').slice(2).join(''));
    }

    if (toFormat[i] === 'YYYY') {
      if (+obj['YY'] < 30) {
        result.push(`20${obj['YY']}`);
      }

      if (+obj['YY'] >= 30) {
        result.push(`19${obj['YY']}`);
      }
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
