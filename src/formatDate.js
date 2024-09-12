'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const originalFormatDate = {};

  const originalSeparator = fromFormat[fromFormat.length - 1];
  const toFormatSeparator = toFormat[toFormat.length - 1];
  const originalDate = date.split(originalSeparator);

  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    originalFormatDate[fromFormat[i]] = originalDate[i];

    if (fromFormat[i].includes('Y')) {
      originalFormatDate.digitsPerYear = fromFormat[i].length;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      if (toFormat[i].length !== originalFormatDate.digitsPerYear) {
        if (toFormat[i].length === 2) {
          result.push(`${originalFormatDate.YYYY}`.slice(2));
          continue;
        } else {
          if (originalFormatDate.YY >= 30) {
            result.push(`19` + originalFormatDate.YY);
            continue;
          } else {
            result.push(`20` + originalFormatDate.YY);
            continue;
          }
        }
      } else {
        result.push(originalFormatDate[toFormat[i]]);
        continue;
      }
    }

    result.push(originalFormatDate[toFormat[i]]);
  }

  return result.join(toFormatSeparator);
}

module.exports = formatDate;
