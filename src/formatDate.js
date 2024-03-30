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
  const separator = fromFormat[fromFormat.length - 1];
  const splitDate = date.split(separator);
  const joinDate = toFormat[toFormat.length - 1];
  const dateObj = {};

  for (let i = 0; i < splitDate.length; i++) {
    dateObj[fromFormat[i]] = splitDate[i];
  }

  const toFormatDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' && dateObj.YYYY) {
      toFormatDate.push(dateObj.YYYY.slice(-2));
      continue;
    }

    if (toFormat[i] === 'YYYY' && dateObj.YY) {
      toFormatDate.push(
        dateObj.YY >= 30 ? `19${dateObj.YY}` : `20${dateObj.YY}`,
      );
      continue;
    }
    toFormatDate.push(dateObj[toFormat[i]]);
  }

  return toFormatDate.join(joinDate);
}

module.exports = formatDate;
