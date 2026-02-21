'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sepFrom = fromFormat[3];
  const sepTo = toFormat[3];
  const parts = date.split(sepFrom);

  const map = {};

  for (let i = 0; i < 3; i++) {
    const token = fromFormat[i];

    map[token] = parts[i];
  }

  let fullYear = '';

  if (map.YYYY) {
    fullYear = map.YYYY;
  } else if (map.YY) {
    const yearNum = +map.YY;

    fullYear = (yearNum < 30 ? '20' : '19') + map.YY;
  }

  map.YYYY = fullYear;
  map.YY = fullYear.slice(-2);

  const result = [];

  for (let i = 0; i < 3; i++) {
    const token = toFormat[i];

    result.push(map[token]);
  }

  return result.join(sepTo);
}

module.exports = formatDate;
