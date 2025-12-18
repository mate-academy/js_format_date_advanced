'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  const map = {};
  const newDate = [];

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = parts[i];
  }

  function getValue(key) {
    if (map[key] !== undefined) {
      return map[key];
    }

    if (key === 'YYYY' && map['YY']) {
      const yy = Number(map['YY']);
      const full = (yy < 30 ? '20' : '19') + map['YY'];

      return full;
    }

    if (key === 'YY' && map['YYYY'] !== undefined) {
      return map['YYYY'].slice(-2);
    }

    return '';
  }

  for (let i = 0; i < 3; i++) {
    newDate.push(getValue(toFormat[i]) || '');
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
