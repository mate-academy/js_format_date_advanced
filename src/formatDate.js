'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.at(-1);
  const newSeparator = toFormat.at(-1);
  const obj = {};
  const oldDate = date.split(oldSeparator);
  const oldFormat = fromFormat.slice(0, -1);
  const newFormat = toFormat.slice(0, -1);
  const result = [];

  for (let i = 0; i < oldDate.length; i++) {
    obj[oldFormat[i]] = oldDate[i];
  }

  for (let i = 0; i < newFormat.length; i++) {
    if (newFormat[i] === 'YY') {
      if (obj['YYYY']) {
        result.push(obj['YYYY'].slice(-2));
      } else {
        result.push(obj['YY']);
      }
    } else if (newFormat[i] === 'YYYY') {
      const year = obj['YY'];

      if (obj['YY']) {
        result.push(obj['YY'] < 30 ? '20' + year : '19' + year);
      } else {
        result.push(obj['YYYY']);
      }
    } else if (newFormat[i] in obj) {
      result.push(obj[newFormat[i]]);
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
