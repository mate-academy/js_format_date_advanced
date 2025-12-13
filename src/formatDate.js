'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSymbol = fromFormat[fromFormat.length - 1];
  const toSymbol = toFormat[toFormat.length - 1];
  const splitDate = date.split(fromSymbol);

  const yearAbbreviate4 = 'YYYY';
  const yearAbbreviate2 = 'YY';

  const result = [];
  const map = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    map[fromFormat[i]] = splitDate[i];
  }

  if (yearAbbreviate2 in map && toFormat.includes(yearAbbreviate4)) {
    map[yearAbbreviate4] = +map.YY < 30 ? '20' + map.YY : '19' + map.YY;
  } else if (yearAbbreviate4 in map && toFormat.includes(yearAbbreviate2)) {
    map[yearAbbreviate2] = map.YYYY.slice(-2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(map[toFormat[i]]);
  }

  return result.join(toSymbol);
}

module.exports = formatDate;
