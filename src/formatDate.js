'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = {};
  const values = date.split(fromFormat[3]);

  fromFormat.slice(0, 3).forEach((key, i) => {
    parts[key] = values[i];
  });

  if (parts.YY && !parts.YYYY) {
    const yearNum = Number(parts.YY);

    parts.YYYY = (yearNum < 30 ? '20' : '19') + parts.YY;
  }

  if (parts.YYYY && !parts.YY) {
    parts.YY = parts.YYYY.slice(-2);
  }

  return toFormat
    .slice(0, 3)
    .map((key) => parts[key])
    .join(toFormat[3]);
}

module.exports = formatDate;
