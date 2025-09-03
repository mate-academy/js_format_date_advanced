'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];

  const fromParts = date.split(fromSep);
  const map = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    map[fromFormat[i]] = fromParts[i];
  }

  if (map.YY && !map.YYYY) {
    const yy = parseInt(map.YY, 10);

    const paddedYY = map.YY.padStart(2, '0');

    map.YYYY = yy < 30 ? `20${paddedYY}` : `19${paddedYY}`;
  }

  if (map.YYYY && !map.YY) {
    map.YY = map.YYYY.slice(-2);
  }

  const resultParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const token = toFormat[i];

    resultParts.push(map[token]);
  }

  return resultParts.join(toSep);
}

module.exports = formatDate;
