'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const parts = date.split(fromSeparator);

  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  if (dateMap.YYYY && toFormat.includes('YY')) {
    dateMap.YY = dateMap.YYYY.slice(-2);
  }

  if (dateMap.YY && toFormat.includes('YYYY')) {
    const yy = Number(dateMap.YY);

    dateMap.YYYY = yy < 30 ? `20${dateMap.YY}` : `19${dateMap.YY}`;
  }

  return [
    dateMap[toFormat[0]],
    dateMap[toFormat[1]],
    dateMap[toFormat[2]],
  ].join(toSeparator);
}

module.exports = formatDate;
