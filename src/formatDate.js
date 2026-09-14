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

  const parts = {};

  parts[fromFormat[0]] = dateParts[0];
  parts[fromFormat[1]] = dateParts[1];
  parts[fromFormat[2]] = dateParts[2];

  // Конвертация года, если нужно
  if (
    parts.YYYY &&
    !parts.YY &&
    toFormat.includes('YY') &&
    !toFormat.includes('YYYY')
  ) {
    parts.YY = parts.YYYY.slice(-2);
  }

  if (parts.YY && !parts.YYYY && toFormat.includes('YYYY')) {
    const yy = Number(parts.YY);

    parts.YYYY = (yy < 30 ? '20' : '19') + parts.YY;
  }

  const result = [
    parts[toFormat[0]],
    parts[toFormat[1]],
    parts[toFormat[2]],
  ].join(toFormat[3]);

  return result;
}

module.exports = formatDate;
