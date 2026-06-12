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
  const mas = date.split(fromSymbol);
  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let j = 0; j < fromFormat.length - 1; j++) {
      if (
        toFormat[i] !== fromFormat[j] &&
        fromFormat[j] === 'YY' &&
        toFormat[i] === 'YYYY'
      ) {
        if (parseInt(mas[j]) < 30) {
          mas[j] = '20' + mas[j];
        } else {
          mas[j] = '19' + mas[j];
        }

        result.push(mas[j]);
      } else if (
        toFormat[i] !== fromFormat[j] &&
        fromFormat[j] === 'YYYY' &&
        toFormat[i] === 'YY'
      ) {
        const numb = mas[j].split('');

        mas[j] = numb[2] + numb[3];
        result.push(mas[j]);
      } else if (toFormat[i] === fromFormat[j]) {
        result.push(mas[j]);
      }
    }
  }

  return result.join(toSymbol);
}

module.exports = formatDate;
