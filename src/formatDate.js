'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const correctDate = date.split(oldSeparator);
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

  const correctFormat = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    correctFormat.push(pattern[toFormat[i]]);
  }

  return correctFormat.join(newSeparator);
}

module.exports = formatDate;
