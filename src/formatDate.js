'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const newSeparator = toFormat[3];
  const newDateFormat = [];
  const correctDate = date.split(separator);
  const pattern = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    pattern[fromFormat[i]] = correctDate[i];
  }

  if (pattern.hasOwnProperty('YYYY')) {
    pattern.YY = pattern.YYYY.slice(2);
  }

  pattern.YYYY = pattern.YY < 30
    ? '20' + pattern.YY
    : '19' + pattern.YY;

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDateFormat.push(pattern[toFormat[i]]);
  }

  return newDateFormat.join(newSeparator);
}

module.exports = formatDate;
