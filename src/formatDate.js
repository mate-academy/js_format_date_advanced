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

  const dateParts = date.split(fromSeparator);
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  // YYYY → YY
  if (dateMap.YYYY && toFormat.includes('YY')) {
    dateMap.YY = dateMap.YYYY.slice(-2);
  }

  // YY → YYYY
  if (dateMap.YY && toFormat.includes('YYYY')) {
    const year = Number(dateMap.YY);

    dateMap.YYYY = year < 30 ? '20' + dateMap.YY : '19' + dateMap.YY;
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    result.push(dateMap[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
