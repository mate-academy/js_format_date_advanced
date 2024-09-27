'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedDate = date.split(fromFormat[3]);
  const fromObj = {};
  const toObj = {};

  for (let a = 0; a < splitedDate.length; a++) {
    fromObj[`${fromFormat[a]}`] = splitedDate[a];
    toObj[`${toFormat[a]}`] = '';
  }

  for (const key in toObj) {
    if (key === 'YY') {
      if (fromObj[key]) {
        toObj[key] = fromObj[key];
      } else {
        const a = fromObj['YYYY'];

        toObj[key] = a.slice(2);
      }
    } else if (key === 'YYYY') {
      if (fromObj[key]) {
        toObj[key] = fromObj[key];
      } else {
        if (fromObj['YY'] < 30) {
          toObj[key] = '20' + fromObj['YY'];
        } else {
          toObj[key] = '19' + fromObj['YY'];
        }
      }
    } else {
      toObj[key] = fromObj[key];
    }
  }

  return Object.values(toObj).join(toFormat[3]);
}

module.exports = formatDate;
