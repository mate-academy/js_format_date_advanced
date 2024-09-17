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
  const dateObj = {};
  const resultDateFormat = [];

  for (let i = 0; i < dateArr.length; i++) {
    if (fromFormat[i] === 'YY') {
      dateArr[i] = dateArr[i] < 30 ? '20' + dateArr[i] : '19' + dateArr[i];
      fromFormat[i] = 'YYYY';
    }
    dateObj[fromFormat[i]] = dateArr[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      resultDateFormat.push(dateObj.YYYY.slice(2));
    } else {
      resultDateFormat.push(dateObj[toFormat[i]]);
    }
  }

  return resultDateFormat.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
