'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separateDate = date.split(fromFormat[fromFormat.length - 1]);
  const oldFormat = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY' && separateDate[i] >= 30) {
      oldFormat['YYYY'] = '19' + separateDate[i];
    }

    if (fromFormat[i] === 'YY' && separateDate[i] < 30) {
      oldFormat['YYYY'] = '20' + separateDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      oldFormat['YY'] = separateDate[i].slice(-2);
    }

    oldFormat[fromFormat[i]] = separateDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const targetItem = oldFormat[toFormat[i]];

    result.push(targetItem);
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
