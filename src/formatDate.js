'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateToArr = date.split(fromFormat[3]);

  const fromatObj = {};

  const result = [];

  for (let i = 0; i < fromFormat.length; i++) {
    fromatObj[fromFormat[i]] = dateToArr[i];
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (toFormat[i] in fromatObj) {
      result.push(fromatObj[toFormat[i]]);
    } else if (toFormat[i] === 'YY') {
      result.push(fromatObj['YYYY'].slice(2));
    } else if ((toFormat[i] === 'YYYY') && (fromatObj['YY'] < 30)) {
      result.push(20 + fromatObj['YY']);
    } else {
      result.push(19 + fromatObj['YY']);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
