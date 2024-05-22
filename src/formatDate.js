'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const newObject = {};
  const finalArr = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newObject[fromFormat[i]] = dateArr[i];
  }

  if (newObject.YYYY) {
    newObject.YY = newObject.YYYY.slice(2);
  } else {
    if (newObject.YY < 30) {
      newObject.YYYY = '20' + newObject.YY;
    } else {
      newObject.YYYY = '19' + newObject.YY;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    finalArr.push(newObject[toFormat[i]]);
  }

  return finalArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
