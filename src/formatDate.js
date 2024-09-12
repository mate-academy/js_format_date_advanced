'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const dateArr = date.split(fromSeparator);
  const dateObj = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const fromPart = fromFormat[i];

    dateObj[fromPart] = dateArr[i];
  }

  if (!fromFormat.includes('YY')) {
    dateObj.YY = dateObj.YYYY.slice(2);
  } else {
    dateObj.YYYY = (dateObj.YY) < 30 ? '20' + dateObj.YY
      : '19' + dateObj.YY;
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    result.push(dateObj[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
