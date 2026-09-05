'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = {};
  const separator = fromFormat[fromFormat.length - 1];

  const parts = date.split(separator);

  let partIndex = 0;

  for (const format of fromFormat) {
    if (
      format === 'YYYY' ||
      format === 'YY' ||
      format === 'MM' ||
      format === 'DD'
    ) {
      dateParts[format] = parts[partIndex];
      partIndex++;
    }
  }

  // Якщо потрібно YYYY → YY
  if (dateParts.YYYY) {
    dateParts.YY = dateParts.YYYY.slice(-2);
  }

  // Якщо потрібно YY → YYYY
  if (dateParts.YY) {
    const year = Number(dateParts.YY);

    dateParts.YYYY = year < 30 ? `20${dateParts.YY}` : `19${dateParts.YY}`;
  }

  const toSeparator = toFormat[toFormat.length - 1];

  const resultParts = [];

  for (const format of toFormat) {
    if (
      format === 'YYYY' ||
      format === 'YY' ||
      format === 'MM' ||
      format === 'DD'
    ) {
      resultParts.push(dateParts[format]);
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
