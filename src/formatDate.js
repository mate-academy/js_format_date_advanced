'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const parts = date.split(oldSeparator);
  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);

  const dateObj = {};

  for (let i = 0; i < fromParts.length; i++) {
    dateObj[fromParts[i]] = parts[i];
  }

  const result = [];

  for (let i = 0; i < toParts.length; i++) {
    const part = toParts[i];

    if (part === 'YYYY') {
      if (dateObj['YYYY']) {
        result.push(dateObj['YYYY']);
      } else if (dateObj['YY']) {
        const num = Number(dateObj['YY']);

        result.push(num < 30 ? '20' + dateObj['YY'] : '19' + dateObj['YY']);
      }
    } else if (part === 'YY') {
      if (dateObj['YYYY']) {
        result.push(dateObj['YYYY'].slice(-2));
      } else {
        result.push(dateObj['YY']);
      }
    } else {
      result.push(dateObj[part]);
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
