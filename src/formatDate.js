'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sep = fromFormat[fromFormat.length - 1];
  const parts = date.split(sep);
  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = parts[i];
  }

  let res = '';

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];
    let value;

    if (key === 'YY' && map['YYYY']) {
      value = map['YYYY'].slice(-2);
    } else if (key === 'YYYY' && map['YY']) {
      const shortYear = parseInt(map['YY'], 10);

      if (shortYear < 30) {
        value = '20' + map['YY'];
      } else {
        value = '19' + map['YY'];
      }
    } else {
      value = map[key];
    }

    res += value;

    if (i < 2) {
      res += toFormat[3];
    }
  }

  return res;
}

module.exports = formatDate;
