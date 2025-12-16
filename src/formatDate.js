'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromY, fromM, fromD, fromSep] = fromFormat;
  const [toSep] = toFormat.slice(3);

  const toParts = toFormat.slice(0, 3);
  const parts = date.split(fromSep);

  const map = {};

  [fromY, fromM, fromD].forEach((key, index) => {
    map[key] = parts[index];
  });

  if (map.YYYY && toParts.includes('YY')) {
    map.YY = map.YYYY.slice(-2);
  }

  if (map.YY && toParts.includes('YYYY')) {
    const year = Number(map.YY);

    map.YYYY = year < 30 ? `20${map.YY}` : `19${map.YY}`;
  }

  return toParts.map((token) => map[token]).join(toSep);
}

module.exports = formatDate;
