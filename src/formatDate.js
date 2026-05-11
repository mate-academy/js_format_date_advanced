'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let result = '';

  const dateParts = date.split(fromFormat[3]);

  for (let i = 0; i < toFormat.length - 1; i++) {
    let value = '';

    // YYYY -> YY
    if (toFormat[i] === 'YY' && fromFormat.includes('YYYY')) {
      const yearIndex = fromFormat.indexOf('YYYY');

      value = dateParts[yearIndex].slice(-2);

      // YY -> YYYY
    } else if (toFormat[i] === 'YYYY' && fromFormat.includes('YY')) {
      const yearIndex = fromFormat.indexOf('YY');

      const shortYear = Number(dateParts[yearIndex]);

      if (shortYear < 30) {
        value = `20${dateParts[yearIndex]}`;
      } else {
        value = `19${dateParts[yearIndex]}`;
      }
    } else {
      const partIndex = fromFormat.indexOf(toFormat[i]);

      value = dateParts[partIndex];
    }

    result += value;

    if (i !== toFormat.length - 2) {
      result += toFormat[toFormat.length - 1];
    }
  }

  return result;
}

module.exports = formatDate;
