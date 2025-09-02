'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[fromFormat.length - 1]; // старий роздільник
  const toSep = toFormat[toFormat.length - 1]; // новий роздільник

  const fromTokens = fromFormat.slice(0, -1); // без роздільника
  const toTokens = toFormat.slice(0, -1);

  const parts = date.split(fromSep); // масив значень дати
  const result = [];

  for (let i = 0; i < toTokens.length; i++) {
    const token = toTokens[i];

    // шукаємо індекс у fromTokens
    let idx = -1;

    for (let j = 0; j < fromTokens.length; j++) {
      if (
        token === fromTokens[j] || // збіг
        (token === 'YY' && fromTokens[j] === 'YYYY') || // YY ↔ YYYY
        (token === 'YYYY' && fromTokens[j] === 'YY')
      ) {
        idx = j;
        break;
      }
    }

    let value = parts[idx];

    // конвертація року
    if (fromTokens[idx] === 'YYYY' && token === 'YY') {
      value = value.slice(-2);
    }

    if (fromTokens[idx] === 'YY' && token === 'YYYY') {
      const num = Number(value);

      if (num < 30) {
        value = '20' + value;
      } else {
        value = '19' + value;
      }
    }

    result.push(value);
  }

  return result.join(toSep);
}

module.exports = formatDate;
