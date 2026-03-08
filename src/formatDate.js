'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparador = fromFormat[3];
  const toSeparador = toFormat[3];

  const dateParts = date.split(fromSeparador);
  const map = {};

  // Mapear partes da data original
  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = dateParts[i];
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    const format = toFormat[i];

    switch (format) {
      case 'YYYY':
        if (map.YYYY) {
          result.push(map.YYYY);
        } else {
          // Converter de YY para YYYY
          const yy = map.YY;
          const year = Number(yy);

          if (year >= 30) {
            result.push('19' + yy);
          } else {
            result.push('20' + yy);
          }
        }
        break;

      case 'YY':
        if (map.YY) {
          result.push(map.YY);
        } else {
          // Converter de YYYY para YY
          const yyyy = map.YYYY;

          result.push(yyyy.slice(2));
        }
        break;

      case 'MM':
        result.push(map.MM);
        break;

      case 'DD':
        result.push(map.DD);
        break;

      default:
        throw new Error(`Formato desconhecido: ${format}`);
    }
  }

  return result.join(toSeparador);
}

module.exports = formatDate;
