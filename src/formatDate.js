'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const dateInfo = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateInfo[fromFormat[i]] = date.split(fromFormat[fromFormat.length - 1])[i];
  }

  if (!dateInfo.YYYY && +dateInfo.YY >= 30) {
    dateInfo.YYYY = `19${dateInfo.YY}`;
  }

  if (!dateInfo.YYYY && +dateInfo.YY < 30) {
    dateInfo.YYYY = `20${dateInfo.YY}`;
  }

  if (!dateInfo.YY && +dateInfo.YYYY >= 30) {
    dateInfo.YY = dateInfo.YYYY.slice(2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate.push(dateInfo[toFormat[i]]);
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
