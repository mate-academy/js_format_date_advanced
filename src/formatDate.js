'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[fromFormat.length - 1]);
  const newObject = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newObject[fromFormat[i]] = splitDate[i];
  }

  if (newObject.hasOwnProperty('YYYY')) {
    newObject.YY = newObject.YYYY.slice(2);
  }

  if (newObject.YY >= 30) {
    newObject.YYYY = '19' + newObject.YY;
  } else {
    newObject.YYYY = '20' + newObject.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(newObject[toFormat[i]]);
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
