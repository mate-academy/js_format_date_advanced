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

  // Mapear partes da data original
  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = dateParts[i];
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    const format = toFormat[i];

    if (format === 'YYYY') {
      if (map.YYYY) {
        result.push(map.YYYY);
      } else {
        // converter de YY para YYYY
        const yy = map.YY;
        const year = Number(yy);

        if (year < 30) {
          result.push('20' + yy);
        } else {
          result.push('19' + yy);
        }
      }
    }

    if (format === 'YY') {
      if (map.YY) {
        result.push(map.YY);
      } else {
        // converter de YYYY para YY
        const yyyy = map.YYYY;

        result.push(yyyy.slice(2));
      }
    }

    if (format === 'MM') {
      result.push(map.MM);
    }

    if (format === 'DD') {
      result.push(map.DD);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
