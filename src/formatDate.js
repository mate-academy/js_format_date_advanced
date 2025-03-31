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

  const parts = date.split(fromSeparator);
  const map = {};

  // Mapeia os componentes da data original
  for (let i = 0; i < 3; i++) {
    const formatKey = fromFormat[i];

    map[formatKey] = parts[i];
  }

  // Constrói o novo formato
  const result = [];

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];

    if (key === 'YYYY') {
      if (map['YYYY']) {
        result.push(map['YYYY']);
      } else {
        const yy = parseInt(map['YY'], 10);

        const fullYear =
          yy < 30
            ? `20${yy.toString().padStart(2, '0')}`
            : `19${yy.toString().padStart(2, '0')}`;

        result.push(fullYear);
      }
    } else if (key === 'YY') {
      const year = map['YYYY'] || map['YY'];

      result.push(year.slice(-2));
    } else {
      result.push(map[key]);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
