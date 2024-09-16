'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateToArray = date.split(fromFormat[3]);
  const objDate = {};
  const arrDate = [];

  for (let i = 0; i < dateToArray.length; i++) {
    objDate[fromFormat[i]] = dateToArray[i];
  }

  for (const element of toFormat) {
    if (objDate[element]) {
      arrDate.push(objDate[element]);
    }

    if (element === 'YY') {
      if (objDate.YYYY) {
        arrDate.push(objDate.YYYY.slice(2));
      }
    }

    if (element === 'YYYY') {
      if (objDate.YY) {
        if (objDate.YY > 30 || objDate.YY === '30') {
          arrDate.push('19' + objDate.YY);
        } else {
          arrDate.push('20' + objDate.YY);
        }
      }
    }
  }

  return arrDate.join(toFormat[3]);
}

module.exports = formatDate;
