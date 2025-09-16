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
  const separator = fromFormat[fromFormat.length - 1];
  const arrDateOld = date.split(separator);
  const map = {};
  const separatorNew = toFormat[toFormat.length - 1];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    map[fromFormat[i]] = arrDateOld[i];
  }

  if (map['YYYY'] && !map['YY']) {
    map['YY'] = map['YYYY'].slice(-2);
  }

  if (map['YY'] && !map['YYYY']) {
    const yy = map['YY'].toString().padStart(2, '0');
    const yearNum = parseInt(yy, 10);

    map['YYYY'] = (yearNum < 30 ? '20' : '19') + yy;
  }

  const parts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    parts.push(map[key] || '');
  }

  return parts.join(separatorNew);
}

module.exports = formatDate;
