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
  const resultArr = [];

  for (let i = 0; i < dateArr.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  for (let j = 0; j < dateArr.length; j++) {
    if (!dateObj[toFormat[j]]) {
      if (toFormat[j] === 'YY') {
        dateObj[toFormat[j]] = dateObj['YYYY'].slice(-2);
      } else {
        dateObj[toFormat[j]]
          = dateObj['YY'] < '30' ? '20' + dateObj['YY'] : '19' + dateObj['YY'];
      }
    }
    resultArr.push(dateObj[toFormat[j]]);
  }

  return resultArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
