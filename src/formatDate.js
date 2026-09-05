'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = {};
  let dateIndex = 0;

  for (const format of fromFormat) {
    if (format === 'YYYY' || format === 'YY' || format === 'MM' || format === 'DD') {
      parts[format] = date.slice(dateIndex, dateIndex + format.length);
      dateIndex += format.length;
    } else {
      dateIndex += format.length;
    }
  }

  if (parts.YYYY) {
    parts.YY = parts.YYYY.slice(-2);
  }

  if (parts.YY) {
    const year = Number(parts.YY);

    parts.YYYY = year < 30
      ? `20${parts.YY}`
      : `19${parts.YY}`;
  }

  let result = '';

  for (const format of toFormat) {
    if (format === 'YYYY' || format === 'YY' || format === 'MM' || format === 'DD') {
      result += parts[format];
    } else {
      result += format;
    }
  }

  return result;
}

module.exports = formatDate;
