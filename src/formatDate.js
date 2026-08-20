'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const parts = date.split(separator);

  const dateParts = {};

  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];

    dateParts[key] = parts[i];
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const fromKey = fromFormat[i];
    const toKey = toFormat[i];

    if (fromKey === 'YYYY' && toKey === 'YY') {
      resultParts.push(dateParts[fromKey].slice(-2));
    } else if (fromKey === 'YY' && toKey === 'YYYY') {
      const year = dateParts[fromKey];

      if (year < 30) {
        resultParts.push('20' + year);
      } else {
        resultParts.push('19' + year);
      }
    } else {
      resultParts.push(dateParts[toKey]);
    }
  }

  return resultParts.join(toFormat[3]);
}

module.exports = formatDate;
