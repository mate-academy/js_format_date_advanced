'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = {};
  const dateValues = date.split(fromFormat[3]);

  let valueIndex = 0;

  fromFormat.forEach((part) => {
    if (['YYYY', 'YY', 'MM', 'DD'].includes(part)) {
      parts[part] = dateValues[valueIndex];
      valueIndex++;
    }
  });

  if (parts.YYYY && !parts.YY) {
    parts.YY = parts.YYYY.slice(-2);
  }

  if (parts.YY && !parts.YYYY) {
    const yy = Number(parts.YY);

    if (yy < 30) {
      parts.YYYY = `20${parts.YY}`;
    } else {
      parts.YYYY = `19${parts.YY}`;
    }
  }

  let result = '';

  toFormat.forEach((part) => {
    const separator = toFormat[3];
    const resultParts = [];

    for (let i = 0; i <= 2; i++) {
      const take = toFormat[i];

      resultParts.push(parts[take]);
    }

    result = resultParts.join(separator);
  });

  return result;
}

module.exports = formatDate;
