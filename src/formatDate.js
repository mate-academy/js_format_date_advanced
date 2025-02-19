'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayFromDate = date.split(fromFormat[3]);
  const arrayToDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      if (fromFormat[i] === toFormat[j]) {
        arrayToDate[j] = arrayFromDate[i];
      }

      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        arrayToDate[j] = arrayFromDate[i].slice(2);
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
        if (arrayFromDate[i] < '30') {
          arrayToDate[j] = '20' + arrayFromDate[i];
        } else {
          arrayToDate[j] = '19' + arrayFromDate[i];
        }
      }
    }
  }

  return arrayToDate.join(toFormat[3]);
}

module.exports = formatDate;
