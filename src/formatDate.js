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
  const dateObj = {};
  const correctDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = parts[i];
  }

  if (dateObj.hasOwnProperty('YYYY')) {
    dateObj.YY = dateObj.YYYY.slice(2);
  }

  if (dateObj.YY >= 30) {
    dateObj.YYYY = '19' + dateObj.YY;
  } else {
    dateObj.YYYY = '20' + dateObj.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    correctDate.push(dateObj[toFormat[i]]);
  }

  return correctDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
