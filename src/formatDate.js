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

  const dateParts = date.split(fromSeparator);

  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = dateParts[i];
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    const part = toFormat[i];

    if (part === 'YYYY' && map['YY']) {
      const yy = Number(map['YY']);

      if (yy < 30) {
        result.push('20' + map['YY']);
      } else {
        result.push('19' + map['YY']);
      }
    } else if (part === 'YY' && map['YYYY']) {
      const fullYear = map['YYYY'];

      result.push(fullYear.slice(-2));
    } else {
      result.push(map[part]);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
