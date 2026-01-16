'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromSeparator);

  const map = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    map[fromFormat[i]] = dateParts[i];
  }

  if (map.YYYY && !map.YY) {
    map.YY = map.YYYY.slice(-2);
  }

  if (map.YY && !map.YYYY) {
    const yy = Number(map.YY);

    map.YYYY = yy < 30 ? `20${map.YY}` : `19${map.YY}`;
  }

  return toFormat
    .slice(0, -1)
    .map((part) => map[part])
    .join(toSeparator);
}

module.exports = formatDate;
