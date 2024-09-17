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
  const newDate = date.split(separator);
  const newFormat = [];
  const dateInfo = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateInfo[fromFormat[i]] = newDate[i];
  }

  if (dateInfo.hasOwnProperty('YYYY')) {
    dateInfo.YY = dateInfo.YYYY.slice(2);
  }

  if (dateInfo.YY >= 30) {
    dateInfo.YYYY = '19' + dateInfo.YY;
  } else {
    dateInfo.YYYY = '20' + dateInfo.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newFormat.push(dateInfo[toFormat[i]]);
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
