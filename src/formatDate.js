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
  const newDate = {};
  const correctDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newDate[fromFormat[i]] = parts[i];
  }

  if (newDate.hasOwnProperty('YYYY')) {
    newDate.YY = newDate.YYYY.slice(2);
  }

  if (newDate.YY >= 30) {
    newDate.YYYY = '19' + newDate.YY;
  } else {
    newDate.YYYY = '20' + newDate.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    correctDate.push(newDate[toFormat[i]]);
  }

  return correctDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
