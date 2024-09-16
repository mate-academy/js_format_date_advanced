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
    switch (fromFormat[i][0]) {
      case 'Y':
        objData.year = arrDate[i];
        break;
      case 'M':
        objData.month = arrDate[i];
        break;
      case 'D':
        objData.day = arrDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i][0]) {
      case 'Y':
        if (toFormat[i].length === 2) {
          arrResultDate.push(objData.year.substring(2));
        } else {
          arrResultDate.push(objData.year);
        }
        break;
      case 'M':
        arrResultDate.push(objData.month);
        break;
      case 'D':
        arrResultDate.push(objData.day);
    }
  }

  return arrResultDate.join(toFormat[3]);
}

module.exports = formatDate;
