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

  const formatMap = {};

  for (let i = 0; i < 3; i++) {
    formatMap[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    formatMap['YY'] = formatMap['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const shortYear = parseInt(formatMap['YY'], 10);

    if (shortYear < 30) {
      formatMap['YYYY'] = `20${shortYear.toString().padStart(2, '0')}`;
    } else {
      formatMap['YYYY'] = `19${shortYear.toString().padStart(2, '0')}`;
    }
  }

  const toSeparator = toFormat[3];
  const newParts = toFormat.slice(0, 3).map((key) => formatMap[key]);

  return newParts.join(toSeparator);
}

module.exports = formatDate;
