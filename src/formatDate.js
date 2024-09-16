'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  const mapping = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    mapping[fromFormat[i]] = dateParts[i];
  }

  if (mapping['YY']) {
    mapping['YYYY'] = parseInt(mapping['YY']) < 30
      ? '20' + mapping['YY']
      : '19' + mapping['YY'];
  }

  if (mapping['YYYY']) {
    mapping['YY'] = mapping['YYYY'].slice(-2);
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(mapping[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
