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

  if (mapping['YY'] && !mapping['YYYY']) {
    if (parseInt(mapping['YY']) < 30) {
      mapping['YYYY'] = '20' + mapping['YY'];
    } else {
      mapping['YYYY'] = '19' + mapping['YY'];
    }
  }

  if (mapping['YYYY'] && !mapping['YY']) {
    mapping['YY'] = mapping['YYYY'].slice(-2);
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(mapping[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
