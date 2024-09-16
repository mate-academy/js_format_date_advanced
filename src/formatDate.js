'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let dateArr;

  if (date.includes('/')) {
    dateArr = date.split('/');
  }

  if (date.includes('-')) {
    dateArr = date.split('-');
  }

  if (date.includes('.')) {
    dateArr = date.split('.');
  }

  if (fromFormat[0] === 'YY' && toFormat[0] === 'YYYY') {
    if (dateArr[0] < 30) {
      dateArr[0] = 20 + dateArr[0];

      return dateArr.join(toFormat[3]);
    }
    dateArr[0] = 19 + dateArr[0];

    return dateArr.join(toFormat[3]);
  }

  if (fromFormat[0] === 'YY' && toFormat[2] === 'YYYY') {
    if (dateArr[0] < 30) {
      dateArr[0] = 20 + dateArr[0];
      dateArr.reverse();

      return dateArr.join(toFormat[3]);
    }
    dateArr[0] = 19 + dateArr[0];
    dateArr.reverse();

    return dateArr.join(toFormat[3]);
  }

  if (fromFormat[1] === 'YYYY' && toFormat[2] === 'YYYY') {
    const day = dateArr[2];

    dateArr.pop();
    dateArr.unshift(day);

    return dateArr.join(toFormat[3]);
  }

  if (fromFormat[2].length === 4 && toFormat[2].length === 2) {
    dateArr[2] = dateArr[2].slice(2);

    return dateArr.join(toFormat[3]);
  }

  if (fromFormat[0] === toFormat[0]) {
    return dateArr.join(toFormat[3]);
  }

  if (formatDate[0] === toFormat[-2]) {
    dateArr.reverse();

    return dateArr.join(toFormat[3]);
  }
}

module.exports = formatDate;
