'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  const map = {};

  // 1. Mapeia os valores da data
  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = dateParts[i];
  }

  // 2. Normaliza o ano
  if (map.YYYY && toFormat.includes('YY')) {
    map.YY = map.YYYY.slice(2);
  }

  if (map.YY && toFormat.includes('YYYY')) {
    const year = Number(map.YY);

    map.YYYY = year < 30 ? `20${map.YY}` : `19${map.YY}`;
  }

  // 3. Monta a nova data
  const result = [];

  for (let i = 0; i < 3; i++) {
    result.push(map[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
