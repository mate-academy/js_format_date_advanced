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
  const splitDate = date.split(fromSeparator);
  const map = {};

  for (let i = 0; i <= 2; i++) {
    map[fromFormat[i]] = splitDate[i];
  }

  function getPart(key) {
    if (key === 'YYYY') {
      if (map['YYYY']) {
        return map['YYYY'];
      }

      if (map['YY']) {
        if (Number(map['YY']) < 30) {
          return '20' + map['YY'];
        }

        return '19' + map['YY'];
      }
    }

    if (key === 'YY') {
      if (map['YY']) {
        return map['YY'];
      }

      if (map['YYYY']) {
        return map['YYYY'].slice(-2);
      }
    }

    if (key === 'MM') {
      return map[key];
    }

    if (key === 'DD') {
      return map[key];
    }
  }

  const result = [
    getPart(toFormat[0]),
    getPart(toFormat[1]),
    getPart(toFormat[2]),
  ];

  return result.join(toFormat[3]);
}

module.exports = formatDate;
