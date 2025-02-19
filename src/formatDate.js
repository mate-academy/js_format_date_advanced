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
  const data = {};

  for (let i = 0; i <= 2; i++) {
    data[fromFormat[i]] = dateArr[i];
  }

  const prefix = data.YY < 30 ? '20' : '19';

  data.YYYY = data.YYYY || prefix + data.YY;
  data.YY = data.YYYY.slice(2, 4);

  const result = [];

  for (let i = 0; i <= 2; i++) {
    result.push(data[toFormat[i]]);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
