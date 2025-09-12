'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const parts = date.split(fromSeparator);

  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = parts[i];
  }

  if (map['YYYY']) {
    map['YY'] = map['YYYY'].slice(2);
  } else if (map['YY']) {
    map['YYYY'] = map['YY'] < 30 ? '20' + map['YY'] : '19' + map['YY'];
  }

  const resultParts = toFormat.slice(0, 3).map((token) => map[token]);

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
