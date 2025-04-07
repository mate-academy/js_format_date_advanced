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
  const newSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(separator);
  const parts = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    parts[fromFormat[i]] = dateParts[i];
  }

  const resultParts = [];

  for (let i = 0; i < toFormat.length; i++) {
    const format = toFormat[i];

    if (format === 'YYYY') {
      if (parts['YYYY']) {
        resultParts.push(parts['YYYY']);
      } else {
        const shortYear = parts['YY'];
        const numberYear = +shortYear;
        const fullYear = (numberYear < 30 ? '20' : '19') + shortYear;

        resultParts.push(fullYear);
      }
    } else if (format === 'YY') {
      const fullYear = parts['YYYY'];
      const shortYear = fullYear.slice(2);

      resultParts.push(shortYear);
    } else if (parts[format]) {
      resultParts.push(parts[format]);
    }
  }

  return resultParts.join(newSeparator);
}

module.exports = formatDate;
