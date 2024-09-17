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
  const newFormat = [];
  const correctDate = date.split(separator);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = correctDate[i];
  }

  if (dateObj.hasOwnProperty('YYYY')) {
    dateObj.YY = dateObj.YYYY.slice(2);
  }

  if (dateObj.YY < 30) {
    dateObj.YYYY = '20' + dateObj.YY;
  } else {
    dateObj.YYYY = '19' + dateObj.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newFormat.push(dateObj[toFormat[i]]);
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
