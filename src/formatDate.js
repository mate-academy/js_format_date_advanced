'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sep1 = fromFormat.pop();
  const sep2 = toFormat.pop();
  const parts = date.split(sep1);
  const oldData = {};
  const result = [];

  for (let d = 0; d < fromFormat.length; d++) {
    if (fromFormat[d] === 'YY') {
      oldData['YYYY'] = parts[d] < 30 ? 20 + parts[d] : 19 + parts[d];
    }

    if (fromFormat[d] === 'YYYY') {
      oldData['YY'] = parts[d].slice(2, 4);
    }

    oldData[fromFormat[d]] = parts[d];
  }

  for (const v of toFormat) {
    result.push(oldData[v]);
  }

  return result.join(sep2);
}

module.exports = formatDate;
