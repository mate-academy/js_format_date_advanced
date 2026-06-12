'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSymbol = fromFormat[3];
  const toSymbol = toFormat[3];
  const parts = date.split(fromSymbol);
  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let j = 0; j < fromFormat.length - 1; j++) {
      if (
        toFormat[i] !== fromFormat[j] &&
        fromFormat[j] === 'YY' &&
        toFormat[i] === 'YYYY'
      ) {
        if (parseInt(parts[j]) < 30) {
          parts[j] = '20' + parts[j];
        } else {
          parts[j] = '19' + parts[j];
        }

        result.push(parts[j]);
        break;
      } else if (
        toFormat[i] !== fromFormat[j] &&
        fromFormat[j] === 'YYYY' &&
        toFormat[i] === 'YY'
      ) {
        const numb = parts[j].split('');

        parts[j] = numb[2] + numb[3];
        result.push(parts[j]);
        break;
      } else if (toFormat[i] === fromFormat[j]) {
        result.push(parts[j]);
        break;
      }
    }
  }

  return result.join(toSymbol);
}

module.exports = formatDate;
