'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateSplit = date.split(fromFormat[3]);
  const objDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objDate[fromFormat[i]] = dateSplit[i];
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (objDate.YY && toFormat[i] === 'YYYY') {
      if (objDate.YY >= 30) {
        objDate.YY = 19 + objDate.YY;
      }

      if (objDate.YY < 30) {
        objDate.YY = 20 + objDate.YY;
      }
    } else if (objDate.YYYY && toFormat[i] === 'YY') {
      objDate.YYYY = objDate.YYYY.slice(2);
    }
  }

  const arr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (const key in objDate) {
      if (toFormat[i].slice(0, 2) === key.slice(0, 2)) {
        arr.push(objDate[key]);
      }
    }
  }

  return arr.join(toFormat[3]);
}

module.exports = formatDate;
