'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[fromFormat.length - 1]);
  const obj = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const key = fromFormat[i];
    const value = oldDate[i];

    obj[key] = value;
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const fromKey = fromFormat[i];
    const toKey = toFormat[i];

    if (fromKey === 'YY' && toKey === 'YYYY') {
      if (obj['YY'] >= 30) {
        result.push(`19${obj['YY']}`);
      } else if (obj['YY'] < 30) {
        result.push(`20${obj['YY']}`);
      }
    } else if (fromKey === 'YYYY' && toKey === 'YY') {
      result.push(obj['YYYY'].slice(-2));
    } else {
      result.push(obj[toKey]);
    }
  }

  const answer = result.join(toFormat[toFormat.length - 1]);

  return answer;
}

module.exports = formatDate;
