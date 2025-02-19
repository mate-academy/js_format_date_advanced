'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newObj = {};
  const newArr = [];
  const strToArr = date.split(fromFormat[3]);

  for (let index = 0; index < fromFormat.length - 1; index++) {
    newObj[fromFormat[index]] = strToArr[index];
  }

  if (newObj.hasOwnProperty('YYYY')) {
    newObj.YY = newObj.YYYY.slice(2);
  }

  if (newObj.YY >= 30) {
    newObj.YYYY = '19' + newObj.YY;
  } else {
    newObj.YYYY = '20' + newObj.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newArr.push(newObj[toFormat[i]]);
  }

  return newArr.join(toFormat[3]);
}

module.exports = formatDate;
