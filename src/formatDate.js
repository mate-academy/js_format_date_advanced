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

  const map = {};

  fromFormat.slice(0, -1).forEach((key, index) => {
    map[key] = parts[index];
  });

  if (map['YY'] && !map['YYYY']) {
    const yy = parseInt(map['YY']);

    map['YYYY'] = yy < 30 ? '20' + map['YY'] : '19' + map['YY'];
  } else if (map['YYYY'] && !map['YY']) {
    map['YY'] = map['YYYY'].slice(-2);
  }

  const result = toFormat.slice(0, -1).map((key) => map[key]);

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
