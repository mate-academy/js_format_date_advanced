'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sepFrom = fromFormat[3];
  const sepTo = toFormat[3];

  const parts = date.split(sepFrom);

  // будуємо відповідність значень за вихідним форматом
  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = parts[i];
  }

  function convertYear(value, target) {
    if (target === 'YYYY' && value.length === 2) {
      const yy = Number(value);

      return (yy < 30 ? '20' : '19') + value;
    }

    if (target === 'YY' && value.length === 4) {
      return value.slice(2);
    }

    return value;
  }

  const resultParts = toFormat.slice(0, 3).map((fmt) => {
    if (fmt === 'YYYY' || fmt === 'YY') {
      const sourceYear = map['YYYY'] ?? map['YY'];

      return convertYear(sourceYear, fmt);
    }

    return map[fmt];
  });

  return resultParts.join(sepTo);
}

module.exports = formatDate;
