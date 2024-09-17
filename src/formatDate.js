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
  const dateFormat = date.split(fromFormat[fromFormat.length - 1]);
  const dateObj = {};
  const resulArr = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = dateFormat[i];
  }

  if (fromFormat.includes('YY')) {
    dateObj.YYYY = dateObj.YY < 30 ? `20${dateObj.YY}` : `19${dateObj.YY}`;
  } else {
    dateObj.YY = +dateObj.YYYY % 100;
  }

  for (const toDate of toFormat) {
    resulArr.push(dateObj[toDate]);
  }

  return resulArr.slice(0, 3).join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
