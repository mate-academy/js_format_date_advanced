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
  const dateParts = date.split(fromFormat[3]);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = dateParts[i];
  }

  if (dateObj.YYYY && toFormat.includes('YY')) {
    dateObj.YY = dateObj.YYYY.slice(-2);
  } else if (dateObj.YY && toFormat.includes('YYYY')) {
    const year = parseInt(dateObj.YY);

    dateObj.YYYY = year < 30 ? `20${dateObj.YY}` : `19${dateObj.YY}`;
  }

  const separator = toFormat[toFormat.length - 1];
  let formattedDate = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    formattedDate += dateObj[toFormat[i]];

    if (i < toFormat.length - 2) {
      formattedDate += separator;
    }
  }

  return formattedDate;
}

module.exports = formatDate;
