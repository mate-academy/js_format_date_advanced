'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  const keys = fromFormat.slice(0, 3);
  let result = [];

  const mapping = Object.fromEntries(
    keys.map((key, index) => [key, parts[index]]),
  );

  if (mapping.YYYY) {
    mapping.YY = mapping.YYYY.slice(-2);
  } else if (mapping.YY) {
    const yy = mapping.YY.padStart(2, '0');

    mapping.YYYY = (Number(yy) < 30 ? '20' : '19') + yy;
  }

  result = [
    mapping[toFormat[0]],
    mapping[toFormat[1]],
    mapping[toFormat[2]],
  ].join(toFormat[3]);

  return result;
}

module.exports = formatDate;
