'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arr = date.split(fromFormat[3]);

  if (toFormat[2] === 'YYYY' && fromFormat[1] === 'YYYY') {
    [arr[0], arr[1], arr[2]] = [arr[2], arr[0], arr[1]];
  }

  if (toFormat[0] === 'YYYY' && arr[0] <= 99 && arr[0] >= 30) {
    arr[0] = '19' + arr[0];
  } else if (toFormat[0] === 'YYYY' && arr[0] < 30) {
    arr[0] = '20' + arr[0];
  }

  if (toFormat[2] === 'YYYY' && fromFormat[2] === 'YYYY' && arr[2] < 30) {
    arr[2] = '20' + arr[2];
  }

  if (toFormat[2] === 'YY' && arr[2].length === 4) {
    arr[2] = arr[2].slice(2);
  }

  if (toFormat[2] === 'YYYY' && fromFormat[0] === 'YYYY') {
    arr.reverse();
  } else if (toFormat[2] === 'YYYY' && arr[0] <= 99
  && arr[0] >= 30 && fromFormat[0] === 'YY') {
    arr[0] = '19' + arr[0];
    arr.reverse();
  }

  return arr.join(toFormat[3]);
}

module.exports = formatDate;
