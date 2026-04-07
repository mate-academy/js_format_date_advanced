'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const formattedParts = [];

  const yearFormats = ['YY', 'YYYY'];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    let index = null;

    if (yearFormats.includes(fromFormat[i])) {
      for (const char of yearFormats) {
        if (toFormat.includes(char)) {
          index = toFormat.indexOf(char);
          break;
        }
      }
    } else {
      index = toFormat.indexOf(fromFormat[i]);
    }

    let value = dateParts[i];

    if (fromFormat[i] === 'YYYY' && toFormat[index] === 'YY') {
      value = value.slice(-2);
    }

    if (fromFormat[i] === 'YY' && toFormat[index] === 'YYYY') {
      if (value < 30) {
        value = `20${value}`;
      } else {
        value = `19${value}`;
      }
    }

    formattedParts[index] = value;
  }

  return formattedParts.join(toFormat[3]);
}
module.exports = formatDate;
