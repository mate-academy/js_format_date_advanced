'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDivider = fromFormat[3];
  const newDivider = toFormat[3];
  const dateParts = date.split(oldDivider);
  const dateData = {};
  const newFormat = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateData[fromFormat[i]] = dateParts[i];
  }

  if (dateData.hasOwnProperty('YYYY')) {
    dateData.YY = dateData.YYYY.slice(2);
  }

  if (dateData.YY < 30) {
    dateData.YYYY = '20' + dateData.YY;
  } else {
    dateData.YYYY = '19' + dateData.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newFormat.push(dateData[toFormat[i]]);
  }

  return newFormat.join(newDivider);
}

module.exports = formatDate;
