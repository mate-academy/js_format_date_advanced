'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const parts = date.split(separator);
  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = parts[i];
  }

  if (map.YYYY) {
    map.YY = map.YYYY.slice(-2);
  } else if (map.YY) {
    const number = parseInt(map.YY, 10);

    map.YYYY = (number < 30 ? '20' : '19') + map.YY;
  }

  const outParts = toFormat.slice(0, 3).map((format) => map[format]);
  const result = outParts.join(toFormat[3]);

  return result;
}
module.exports = formatDate;
