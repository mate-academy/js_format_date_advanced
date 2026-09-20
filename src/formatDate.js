'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dataParts = date.split(separatorFrom);
  const parts = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    parts[fromFormat[i]] = dataParts[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (Number(parts.YY) < 30) {
      parts.YYYY = '20' + parts.YY;
    } else {
      parts.YYYY = '19' + parts.YY;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    parts.YY = parts.YYYY.slice(-2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result[i] = parts[toFormat[i]];
  }

  return result.join(separatorTo);
}

module.exports = formatDate;
