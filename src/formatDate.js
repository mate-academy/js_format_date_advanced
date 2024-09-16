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
  const newArray = Array.from(toFormat.slice(0, 3));

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let y = 0; y < toFormat.length - 1; y++) {
      if (fromFormat[i] === toFormat[y]) {
        newArray[y] = dateArr[i];
      }

      if (fromFormat[i] === 'YYYY' && toFormat[y] === 'YY') {
        newArray[y] = dateArr[i].slice(2, 4);
      }

      if (fromFormat[i] === 'YY' && toFormat[y] === 'YYYY') {
        if (dateArr[i] < 30) {
          newArray[y] = `20${dateArr[i]}`;
        }

        if (dateArr[i] >= 30) {
          newArray[y] = `19${dateArr[i]}`;
        }
      }
    }
  }

  return newArray.join(toFormat[3]);
}

module.exports = formatDate;
