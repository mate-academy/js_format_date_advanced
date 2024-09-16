'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[fromFormat.length - 1]);
  const dateObj = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = parts[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      const prevYearFormat = dateObj['YY'] ? dateObj['YY'] : dateObj['YYYY'];
      const newYearFormat = toFormat[i];

      if (newYearFormat.length === 4 && prevYearFormat.length === 2) {
        if (+prevYearFormat < 30) {
          result.push(`20${prevYearFormat}`);
        } else {
          result.push(`19${prevYearFormat}`);
        }

        continue;
      }

      if (newYearFormat.length === 2 && prevYearFormat.length === 4) {
        result.push(prevYearFormat.slice(2));
        continue;
      }

      result.push(prevYearFormat);
      continue;
    }

    result.push(dateObj[toFormat[i]]);
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
