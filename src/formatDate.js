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

  const objDate = {};

  for (let i = 0; i < 3; i++) {
    objDate[fromFormat[i]] = splitedDate[i];
  }

  const result = [];

  for (let item = 0; item < 3; item++) {
    if (objDate[toFormat[item]]) {
      result.push(objDate[toFormat[item]]);
    } else if (toFormat[item] === 'YY') {
      const fullYear = objDate['YYYY'];

      result.push(fullYear.slice(-2));
    } else if (toFormat[item] === 'YYYY') {
      const shortYear = objDate['YY'];

      if (shortYear >= 30) {
        result.push('19' + shortYear);
      } else {
        result.push('20' + shortYear);
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
