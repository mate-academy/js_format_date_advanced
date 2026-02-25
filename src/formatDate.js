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
  const fromOrder = fromFormat.slice(0, 3);
  const toSeparator = toFormat[toFormat.length - 1];
  const toOrder = toFormat.slice(0, 3);
  const dateParts = date.split(fromSeparator);
  const map = {};

  for (let i = 0; i < fromOrder.length; i++) {
    map[fromOrder[i]] = dateParts[i];
  }

  const result = [];

  for (let i = 0; i < toOrder.length; i++) {
    const part = toOrder[i];

    if (part === 'YYYY') {
      if (map['YYYY']) {
        result.push(map['YYYY']);
      } else {
        const year = Number(map['YY']);

        if (year < 30) {
          result.push('20' + map['YY']);
        } else {
          result.push('19' + map['YY']);
        }
      }
    } else if (part === 'YY') {
      if (map['YY']) {
        result.push(map['YY']);
      } else {
        result.push(map['YYYY'].slice(-2));
      }
    } else {
      result.push(map[part]);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;

formatDate('2026-02-25', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YYYY', '.']);
