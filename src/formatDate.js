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
  const formattedParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const format = toFormat[i];
    const value = parts[fromFormat.indexOf(format)];
    const year = parts[fromFormat.indexOf('YY')];
    const yearPrefix = year < 30 ? '20' : '19';

    if (format === 'YYYY' && year) {
      formattedParts.push(yearPrefix + year);
    } else if (format === 'YY' && parts[fromFormat.indexOf('YYYY')]) {
      formattedParts.push(parts[fromFormat.indexOf('YYYY')].slice(2));
    } else {
      formattedParts.push(value);
    }
  }

  return formattedParts.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
