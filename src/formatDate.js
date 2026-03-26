'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const parts = date.split(separator);
  const obj = {};

  for (let i = 0; i < 3; i++) {
    obj[fromFormat[i]] = parts[i];
  }

  if (obj.YY && toFormat.includes('YYYY')) {
    const yy = obj.YY;

    if (Number(yy) < 30) {
      obj.YYYY = '20' + yy;
    } else {
      obj.YYYY = '19' + yy;
    }
  }

  if (obj.YYYY && toFormat.includes('YY')) {
    const yyyy = obj.YYYY;

    obj.YY = yyyy.slice(-2);
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    result.push(obj[key]);
  }

  return result.join(toFormat[3]);
}
module.exports = formatDate;
