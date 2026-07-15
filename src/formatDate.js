'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);

  const values = date.split(fromSeparator);

  const map = {};

  for (let i = 0; i < fromParts.length; i++) {
    map[fromParts[i]] = values[i];
  }

  if (map['YY']) {
    const year = Number(map['YY']);

    if (year < 30) {
      map['YYYY'] = '20' + map['YY'];
    } else {
      map['YYYY'] = '19' + map['YY'];
    }
  }

  if (map['YYYY']) {
    map['YY'] = map['YYYY'].slice(-2);
  }

  const result = [];

  for (let i = 0; i < toParts.length; i++) {
    result.push(map[toParts[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
