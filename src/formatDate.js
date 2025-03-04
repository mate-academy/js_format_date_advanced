'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = date.match(/\D/)[0];
  const dateParts = date.split(separator);

  const formatMap = Object.fromEntries(
    fromFormat.map((key, i) => [key, dateParts[i]]),
  );

  if (formatMap.YY) {
    formatMap.YYYY = (formatMap.YY < 30 ? '20' : '19') + formatMap.YY;
  }

  if (formatMap.YYYY) {
    formatMap.YY = formatMap.YYYY.slice(-2);
  }

  return toFormat
    .map((key) => formatMap[key])
    .filter(Boolean)
    .join(toFormat[3]);
}

module.exports = formatDate;
