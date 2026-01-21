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

  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if (dateMap.YYYY && !dateMap.YY) {
    dateMap.YY = dateMap.YYYY.slice(-2);
  }

  if (dateMap.YY && !dateMap.YYYY) {
    const year = Number(dateMap.YY);

    dateMap.YYYY = year < 30 ? `20${dateMap.YY}` : `19${dateMap.YY}`;
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateMap[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
