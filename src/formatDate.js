'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDateObj = {};
  const newDateObj = {};

  const oldDateArr = date.split(fromFormat[fromFormat.length - 1]);

  const newDateArr = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldDateObj[fromFormat[i]] = oldDateArr[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDateObj[toFormat[i]] = 0;
  }

  for (const key1 in oldDateObj) {
    for (const key2 in newDateObj) {
      if (key1 === key2) {
        newDateObj[key2] = oldDateObj[key1];
        oldDateObj[key1] = 0;
      }
    }
  }

  for (const key1 in oldDateObj) {
    for (const key2 in newDateObj) {
      if (oldDateObj[key1] !== 0 && newDateObj[key2] === 0) {
        if (key1 === 'YYYY' && key2 === 'YY') {
          newDateObj[key2] = oldDateObj[key1].slice(-2);
        } else if (key1 === 'YY' && key2 === 'YYYY') {
          if (+oldDateObj[key1] < 30) {
            newDateObj[key2] = '20' + oldDateObj[key1];
          } else {
            newDateObj[key2] = '19' + oldDateObj[key1];
          }
        }
      }
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (const key in newDateObj) {
      if (toFormat[i] === key) {
        newDateArr.push(newDateObj[key]);
      }
    }
  }

  return newDateArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
