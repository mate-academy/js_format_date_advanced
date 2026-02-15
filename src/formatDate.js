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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = dateParts[i];
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    const part = toFormat[i];

    if (part === 'YY') {
      if (map['YY']) {
        result.push(map['YY']);
      } else {
        result.push(map['YYYY'].slice(-2));
      }
    } else if (part === 'YYYY') {
      if (map['YYYY']) {
        result.push(map['YYYY']);
      } else {
        const shortYear = map['YY'];
        const numYear = Number(shortYear);

        if (numYear < 30) {
          result.push('20' + shortYear);
        } else {
          result.push('19' + shortYear);
        }
      }
    } else {
      result.push(map[part]);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
