'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = {};
  const separator = fromFormat[3];
  const newSeparator = toFormat[3];
  const splitedDate = date.split(separator);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = splitedDate[i];
  }

  if (dateObject.hasOwnProperty('YYYY')) {
    dateObject.YY = dateObject.YYYY.slice(2);
  }

  if (dateObject.hasOwnProperty('YY') && dateObject.YY >= 30) {
    dateObject.YYYY = '19' + dateObject.YY;
  } else if (dateObject.hasOwnProperty('YY')) {
    dateObject.YYYY = '20' + dateObject.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateObject[toFormat[i]]);
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
