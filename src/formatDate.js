'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const splitDate = date.split(fromFormat[3]);
  const parsedDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    parsedDate[fromFormat[i]] = splitDate[i];
  }

  if (!Object.keys(parsedDate).includes('YY')) {
    parsedDate['YY'] = parsedDate.YYYY.slice(2);
  }

  if (!Object.keys(parsedDate).includes('YYYY')) {
    parsedDate['YYYY'] = parsedDate.YY < 30 ? 20 + parsedDate.YY
      : 19 + parsedDate.YY;
  }

  for (const item of toFormat) {
    for (const key in parsedDate) {
      if (key === item) {
        result.push(parsedDate[key]);
      }
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
