'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[fromFormat.length - 1]);
  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  if (dateMap.hasOwnProperty('YY')) {
    dateMap.YYYY = (+dateMap.YY <= 21) ? `20${dateMap.YY}` : `19${dateMap.YY}`;
  } else {
    dateMap.YY = dateMap.YYYY.slice(2);
  }

  const newParts
    = toFormat.slice(0, toFormat.length - 1).map(format => dateMap[format]);

  return newParts.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
