'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const pad2 = (n) => (n < 10 ? '0' + n : '' + n);

  const separator = fromFormat[fromFormat.length - 1];
  const parts = date.split(separator);

  if (parts.length !== 3) {
    return '';
  }

  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = parts[i];
  }

  let year2, year4;

  if (fromFormat.includes('YYYY') && map['YYYY']) {
    year2 = map['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && map['YY']) {
    const n = Number(map['YY']);
    const century = n < 30 ? '20' : '19';

    year4 = century + pad2(n);
  }

  const outParts = [];

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];

    if (key === 'YYYY') {
      outParts.push(year4 || map['YYYY']);
    } else if (key === 'YY') {
      outParts.push(year2 || map['YY']);
    } else {
      outParts.push(map[key]);
    }
  }

  const result = outParts.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
