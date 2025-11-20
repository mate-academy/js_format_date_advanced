'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.find((f) => f.length === 1 && /\D/.test(f));
  const toSeparator = toFormat[toFormat.length - 1];
  const parts = date.split(fromSeparator);
  const map = {};
  let partIdx = 0;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === fromSeparator) {
      continue;
    }
    map[fromFormat[i]] = parts[partIdx++];
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const f = toFormat[i];
    let value = map[f];

    if ((f === 'YY' || f === 'YYYY') && !value) {
      if (f === 'YY' && map['YYYY']) {
        value = map['YYYY'];
      }

      if (f === 'YYYY' && map['YY']) {
        value = map['YY'];
      }
    }

    if (f === 'YY' && value && value.length === 4) {
      value = value.slice(-2);
    }

    if (f === 'YYYY' && value && value.length === 2) {
      const yy = Number(value);

      value = yy < 30 ? '20' + value : '19' + value;
    }

    result.push(value);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
