'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arr = date.split(fromFormat[3]);
  const beforeFormat = fromFormat.slice(0, 3);
  const afterFormat = toFormat.slice(0, 3);
  const parts = {};
  const formatedDate = [];

  for (let i = 0; i < beforeFormat.length; i++) {
    parts[beforeFormat[i]] = arr[i];
  }

  if (beforeFormat.includes('YYYY') && afterFormat.includes('YY')) {
    parts.YY = parts.YYYY.slice(-2);
  }

  if (beforeFormat.includes('YY') && afterFormat.includes('YYYY')) {
    if (parts.YY < 30) {
      parts.YYYY = `20${parts.YY}`;
    } else {
      parts.YYYY = `19${parts.YY}`;
    }
  }

  for (let i = 0; i < afterFormat.length; i++) {
    formatedDate[i] = parts[afterFormat[i]];
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
