'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);

  if (toFormat[0][0] !== fromFormat[0][0]) {
    dateArr.reverse();
  }

  if (toFormat.includes('YY')) {
    const i = toFormat.indexOf('YY');

    if (dateArr[i] > 1000) {
      dateArr[i] = dateArr[i].slice(2);
    }
  }

  if (toFormat.includes('YYYY')) {
    const i = toFormat.indexOf('YYYY');

    if (dateArr[i].length <= 2 && dateArr[i] < 30) {
      dateArr[i] = `20${dateArr[i]}`;
    } else if (dateArr[i].length <= 2 && dateArr[i] >= 30) {
      dateArr[i] = `19${dateArr[i]}`;
    }
  }

  const result = dateArr.join(toFormat[toFormat.length - 1]);

  return result;
}

module.exports = formatDate;
