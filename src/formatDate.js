'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const values = date.split(fromSeparator);

  const parts = {};

  for (let i = 0; i < 3; i++) {
    parts[fromFormat[i]] = values[i];
  }

  if (parts.YYYY && !parts.YY) {
    parts.YY = parts.YYYY.slice(2);
  }

  if (parts.YY && !parts.YYYY) {
    if (+parts.YY < 30) {
      parts.YYYY = `20${parts.YY}`;
    } else {
      parts.YYYY = `19${parts.YY}`;
    }
  }

  return [parts[toFormat[0]], parts[toFormat[1]], parts[toFormat[2]]].join(
    toSeparator,
  );
}

module.exports = formatDate;
