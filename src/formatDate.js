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
  const dateObj = {};
  const result = [];

  for (let i = 0; i < dateArr.length; i++) {
    if (fromFormat[i] === 'YY') {
      if (dateArr[i] < '30') {
        dateArr[i] = '20'.concat(dateArr[i]);
      } else {
        dateArr[i] = '19'.concat(dateArr[i]);
      }
      fromFormat[i] = 'YYYY';
    }

    Object.assign(dateObj, { [fromFormat[i]]: dateArr[i] });
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      result.push(dateObj.YYYY.slice(2));
    } else {
      result.push(dateObj[toFormat[i]]);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
