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

  for (let i = 0; i < parts.length; i++) {
    dateParts[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = Number(dateParts.YY);

    if (year < 30) {
      dateParts.YYYY = '20' + dateParts.YY;
    } else {
      dateParts.YYYY = '19' + dateParts.YY;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateParts.YY = dateParts.YYYY.slice(-2);
  }

  const formatParts = toFormat.slice(0, -1);
  const resultParts = formatParts.map((part) => dateParts[part]);
  const separator = toFormat[toFormat.length - 1];
  const result = resultParts.join(separator);

  return result;
}

module.exports = formatDate;
