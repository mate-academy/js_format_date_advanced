'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // write code here

  const arrDate = date.split(fromFormat[3]);
  const objData = {};
  const arrResultDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i][0] === 'Y') {
      objData.year = arrDate[i];
    } else if (fromFormat[i][0] === 'M') {
      objData.month = arrDate[i];
    } else {
      objData.day = arrDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i][0] === 'Y') {
      if (toFormat[i].length === 2) {
        arrResultDate.push(objData.year.substring(2));
      } else {
        arrResultDate.push(objData.year);
      }
    } else if (toFormat[i][0] === 'M') {
      arrResultDate.push(objData.month);
    } else {
      arrResultDate.push(objData.day);
    }
  }

  const resultDate = arrResultDate.join(toFormat[3]);

  return resultDate;
}

module.exports = formatDate;
