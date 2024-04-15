'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const object = {};
  const splitDate = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    object[fromFormat[i]] = splitDate[i];
  }

  if (object.hasOwnProperty('YYYY')) {
    object.YY = object.YYYY.slice(2);
  }

  if (object.YY >= 30) {
    object.YYYY = '19' + object.YY;
  } else {
    object.YYYY = '20' + object.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(object[toFormat[i]]);
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
