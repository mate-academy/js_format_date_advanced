'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const parts = date.split(separatorFrom);
  const mapping = {};

  fromFormat.slice(0, 3).forEach((key, index) => {
    mapping[key] = parts[index];
  });

  if (toFormat.includes('YY') && mapping['YYYY']) {
    mapping['YY'] = mapping['YYYY'].slice(-2);
  }
  if (toFormat.includes('YYYY') && mapping['YY']) {
    const yy = parseInt(mapping['YY'], 10);
    mapping['YYYY'] = yy < 30 ? `20${mapping['YY']}` : `19${mapping['YY']}`;
  }

  const result = toFormat.slice(0, 3).map(key => mapping[key]).join(separatorTo);
  return result;
}

module.exports = formatDate;
