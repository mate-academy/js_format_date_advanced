'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const newDate = date.split(separator);
  const obj = {};
  const arr = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] !== separator) {
      obj[fromFormat[i]] = newDate[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    for (const key in obj) {
      if (toFormat[j] === key) {
        arr.push(obj[key]);
      } else if (toFormat[j] === 'YY' && key === 'YYYY') {
        obj[key] = obj[key] % 100;
        arr.push(obj[key]);
      } else if (toFormat[j] === 'YYYY' && key === 'YY') {
        if (obj[key] < 30) {
          obj[key] = parseInt(obj[key]) + 2000;
        } else {
          obj[key] = parseInt(obj[key]) + 1900;
        }
        arr.push(obj[key]);
      }
    }
  }

  const finalDate = arr.join(newSeparator);

  return finalDate;
}

module.exports = formatDate;
