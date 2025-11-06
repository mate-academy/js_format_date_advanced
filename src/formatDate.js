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

  const dateMap = {};

  dateMap[fromFormat[0]] = parts[0];
  dateMap[fromFormat[1]] = parts[1];
  dateMap[fromFormat[2]] = parts[2];

  const result = [];

  for (let i = 0; i < 3; i++) {
    const part = toFormat[i];
    let value = dateMap[part];

    if (part === 'YYYY') {
      const yy = +dateMap['YY'];

      if (dateMap['YY']) {
        value =
          yy < 30
            ? '20' + String(yy).padStart(2, '0')
            : '19' + String(yy).padStart(2, '0');
      }
    }

    if (part === 'YY') {
      if (dateMap['YYYY']) {
        value = dateMap['YYYY'].slice(-2);
      }
    }

    result.push(value);
  }

  return result.join(toSep);
}

module.exports = formatDate;
