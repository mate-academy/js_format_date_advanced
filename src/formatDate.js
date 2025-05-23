'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const nums = date.split(fromFormat[fromFormat.length - 1]);

  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = nums[i];
  }

  if (fromFormat[0] === 'YY' && !dateObj.YYYY) {
    const yy = dateObj.YY;

    dateObj.YYYY = (yy < 30 ? '20' : '19') + yy;
  }

  if (dateObj.YYYY && !dateObj.YY) {
    dateObj.YY = dateObj.YYYY.slice(-2);
  }

  const newDateTemplate = [];

  for (let i = 0; i < 3; i++) {
    newDateTemplate.push(dateObj[toFormat[i]]);
  }

  return newDateTemplate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
