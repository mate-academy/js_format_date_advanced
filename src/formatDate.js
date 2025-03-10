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
  const separator = fromFormat[3];
  const dateValues = date.split(separator);
  const dateObj = {};

  fromFormat.forEach((part, index) => {
    dateObj[part] = dateValues[index];
  });

  if (dateObj.YYYY && toFormat.includes('YY')) {
    dateObj.YY = dateObj.YYYY.slice(-2);
  } else if (dateObj.YY && toFormat.includes('YYYY')) {
    dateObj.YYYY = dateObj.YY < 30 ? `20${dateObj.YY}` : `19${dateObj.YY}`;
  }

  return toFormat
    .slice(0, 3)
    .map((part) => dateObj[part])
    .join(toFormat[3]);
}

module.exports = formatDate;
