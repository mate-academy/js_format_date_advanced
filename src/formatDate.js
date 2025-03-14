'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const parts = date.split(separator);
  const dateParts = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateParts[fromFormat[i]] = parts[i];
  }

  const newParts = toFormat.slice(0, 3).map((formatKey) => {
    if (formatKey === 'YYYY' && dateParts['YY']) {
      return +dateParts['YY'] < 30
        ? '20' + dateParts['YY']
        : '19' + dateParts['YY'];
    }

    if (formatKey === 'YY' && dateParts['YYYY']) {
      return dateParts['YYYY'].slice(2);
    }

    return dateParts[formatKey];
  });

  return newParts.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
