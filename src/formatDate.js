'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arr = date.split(fromFormat[fromFormat.length - 1]);
  const obj = {};
  const updatedDate = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YYYY' && toFormat.includes('YY')) {
      obj['YY'] = arr[i].slice(2);
    } else if (fromFormat[i] === 'YY' && toFormat.includes('YYYY')) {
      const correctedYear = arr[i] < 30 ? `20${arr[i]}` : `19${arr[i]}`;

      obj['YYYY'] = correctedYear;
    } else {
      obj[fromFormat[i]] = arr[i];
    }
  }

  for (const el of toFormat) {
    if (el in obj) {
      updatedDate.push(obj[el]);
    }
  }

  return updatedDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
