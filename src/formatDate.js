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
  const data = {};
  const newDateFormat = [];
  const dateParts = date.split(fromFormat.slice(3));

  for (let i = 0; i < fromFormat.length - 1; i++) {
    data[fromFormat[i]] = dateParts[i];
  }

  if (!fromFormat.includes('YY')) {
    data.YY = data.YYYY.slice(2);
  } else {
    const longYearFormat = data.YY < 30 ? 20 + data.YY : 19 + data.YY;

    data.YYYY = longYearFormat;
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newDateFormat.push(data[toFormat[i]]);
  }

  return newDateFormat.join(toFormat.slice(3));
}

module.exports = formatDate;
