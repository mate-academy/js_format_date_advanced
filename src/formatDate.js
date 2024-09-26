'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = date.split(fromFormat[fromFormat.length - 1]);
  const resultDate = [];
  const objDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objDate[fromFormat[i]] = newDate[i];
  }

  if (objDate.hasOwnProperty('YY')) {
    objDate.YYYY = objDate.YY < 30
      ? '20' + objDate.YY
      : '19' + objDate.YY;
  }

  if (objDate.hasOwnProperty('YYYY')) {
    objDate.YY = objDate.YYYY.slice(2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    resultDate.push(objDate[toFormat[i]]);
  }

  return resultDate.join(`${toFormat[toFormat.length - 1]}`);
}

module.exports = formatDate;
