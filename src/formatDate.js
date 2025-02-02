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
  const newFromFormat = [...fromFormat];
  const newToFormat = [...toFormat];
  const newArr = [];

  for (let i = 0; i < 3; i++) {
    for (let x = 0; x < 3; x++) {
      if (
        newFromFormat[i] === 'YYYY' &&
        newToFormat[x] === 'YY' &&
        splitDate[i] < 2000
      ) {
        newFromFormat[i] = 'YY';
        splitDate[i] = splitDate[i] - 1900;
      }

      if (
        newFromFormat[i] === 'YY' &&
        newToFormat[x] === 'YYYY' &&
        splitDate[i] < 30
      ) {
        newFromFormat[i] = 'YYYY';
        splitDate[i] = +splitDate[i] + 2000;
      }

      if (
        newFromFormat[i] === 'YY' &&
        newToFormat[x] === 'YYYY' &&
        splitDate[i] >= 30
      ) {
        newFromFormat[i] = 'YYYY';
        splitDate[i] = +splitDate[i] + 1900;
      }

      if (newFromFormat[i] === newToFormat[x]) {
        newArr[x] = splitDate[i];
      }
    }
  }

  return newArr.join(newToFormat[3]);
}

module.exports = formatDate;
