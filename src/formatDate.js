'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[3];
  const toSep = toFormat[3];

  const parts = date.split(fromSep);
  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = parts[i];
  }

  return [toFormat[0], toFormat[1], toFormat[2]]
    .map((key) => {
      const value = map[key];

      if (key === 'YYYY') {
        if (!value && map['YY']) {
          const num = parseInt(map['YY'], 10);

          return (num < 30 ? '20' : '19') + map['YY'];
        }

        if (value.length === 2) {
          const num = parseInt(value, 10);

          return (num < 30 ? '20' : '19') + value;
        }

        return value;
      }

      if (key === 'YY') {
        if (!value && map['YYYY']) {
          return map['YYYY'].slice(-2);
        }

        if (value.length === 4) {
          return value.slice(-2);
        }

        return value;
      }

      return value;
    })
    .join(toSep);
}

module.exports = formatDate;
