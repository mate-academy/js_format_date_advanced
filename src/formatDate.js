'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  const dateParts = {};

  for (let i = 0; i < 3; i++) {
    dateParts[fromFormat[i]] = parts[i];
  }

  if (dateParts.YY) {
    const year = Number(dateParts.YY);

    dateParts.YYYY = year < 30 ? `20${dateParts.YY}` : `19${dateParts.YY}`;
  }

  if (dateParts.YYYY) {
    dateParts.YY = dateParts.YYYY.slice(-2);
  }

  let result = '';

  for (let i = 0; i < 3; i++) {
    result += dateParts[toFormat[i]];

    if (i < 2) {
      result += toFormat[3];
    }
  }

  return result;
}

module.exports = formatDate;
