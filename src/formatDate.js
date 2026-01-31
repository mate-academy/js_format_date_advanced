'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateString, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const parts = dateString.split(fromSeparator);

  const date = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    date[fromFormat[i]] = parts[i];
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const format = toFormat[i];

    if (format === 'YY') {
      if (date.YYYY) {
        result.push(date.YYYY.slice(2));
      } else {
        result.push(date.YY);
      }
    } else if (format === 'YYYY') {
      if (date.YYYY) {
        result.push(date.YYYY);
      } else {
        const year = Number(date.YY);

        if (year < 30) {
          result.push('20' + date.YY);
        } else {
          result.push('19' + date.YY);
        }
      }
    } else {
      result.push(date[format]);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
