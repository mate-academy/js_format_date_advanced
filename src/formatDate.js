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

  const obj = {};

  const newFormat = [];

  for (let i = 0; i < 3; i++) {
    obj[fromFormat[i]] = dateToArr[i];
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] in obj) {
      newFormat.push(obj[toFormat[i]]);
    } else if (toFormat[i] === 'YY') {
      newFormat.push(obj['YYYY'].slice(2));
    } else if (toFormat[i] === 'YYYY' & obj['YY'] < 30) {
      newFormat.push(20 + obj['YY']);
    } else {
      newFormat.push(19 + obj['YY']);
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
