'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[3]);
  const objDate = {};

  for (let i = 0; i < splitDate.length; i++) {
    objDate[fromFormat[i]] = splitDate[i];
  }

  const resDate = [];

  for (const key of toFormat) {
    if (objDate[key]) {
      resDate.push(objDate[key]);
    } else if (key === 'YY') {
      resDate.push(objDate.YYYY.slice(-2));
    } else if (key === 'YYYY') {
      if (objDate.YY < 30) {
        resDate.push('20' + objDate.YY);
      } else {
        resDate.push('19' + objDate.YY);
      }
    }
  }

  return resDate.join(toFormat[3]);
}

module.exports = formatDate;
