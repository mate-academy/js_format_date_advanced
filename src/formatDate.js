'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const separator = fromFormat[fromFormat.length - 1];
  const parts = date.split(separator);
  const mapping = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    mapping[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    mapping['YY'] = mapping['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(mapping['YY'], 10);

    if (year < 30) {
      mapping['YYYY'] = 20 + mapping['YY'];
    } else {
      mapping['YYYY'] = 19 + mapping['YY'];
    }
  }

  const newSeparator = toFormat[toFormat.length - 1];

  const newDate = toFormat
    .slice(0, -1)
    .map((format) => mapping[format])
    .join(newSeparator);

  result.push(newDate);

  return result.join('');
}

module.exports = formatDate;
