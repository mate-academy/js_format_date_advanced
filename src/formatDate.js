'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const newFormat = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      if (toFormat[i] === fromFormat[j]) {
        newFormat.push(dateArr[j]);
      }

      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        newFormat.push(dateArr[j].slice(2, 4));
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
        if (dateArr[j] < 30) {
          newFormat.push('20' + dateArr[j]);
        } else {
          newFormat.push('19' + dateArr[j]);
        }
      }
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
