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
  const data = {};
  let newDataStr = '';
  let separator = fromFormat[3];
  const dateArr = date.split(separator);

  for (let i = 0; i < 3; i++) {
    data[fromFormat[i]] = dateArr[i];

    if (fromFormat[i] === 'YYYY') {
      data.YY = dateArr[i] % 100;
      continue;
    }

    if (fromFormat[i] === 'YY') {
      if (dateArr[i] < 30) {
        data.YYYY = 2000 + +dateArr[i];
        continue;
      }

      data.YYYY = 1900 + +dateArr[i];
      continue;
    }
  }

  separator = toFormat[3];

  for (let i = 0; i < 3; i++) {
    if (newDataStr.length) {
      newDataStr += separator;
    }

    newDataStr += data[toFormat[i]];
  }

  return newDataStr;
}

module.exports = formatDate;
