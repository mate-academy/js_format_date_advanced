'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const obj = {};
  const dateArr = date.split(oldSeparator);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    obj[fromFormat[i]] = dateArr[i];
  }

  if (obj.hasOwnProperty('YYYY')) {
    obj.YY = obj.YYYY.slice(2);
  }

  if (obj.YY < 30) {
    obj.YYYY = '20' + obj.YY;
  } else {
    obj.YYYY = '19' + obj.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(obj[toFormat[i]]);
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
