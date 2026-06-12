'use strict';
/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const parts = date.split(fromSeparator);
  const result = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let value = parts[i];
    let key = fromFormat[i];

    if (key === 'YYYY' && toFormat.includes('YY')) {
      key = 'YY';
      value = value.slice(2);
    }

    if (key === 'YY' && toFormat.includes('YYYY')) {
      key = 'YYYY';

      if (Number(value) < 30) {
        value = '20' + value;
      } else {
        value = '19' + value;
      }
    }
    result[key] = value;
  }

  const output = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    output.push(result[toFormat[i]]);
  }

  return output.join(toSeparator);
}
module.exports = formatDate;
