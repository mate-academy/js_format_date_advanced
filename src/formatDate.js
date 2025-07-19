'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparetor = fromFormat[3];
  const toSeparetor = toFormat[3];
  const parts = date.split(fromSeparetor);
  const map = {};

  for (let i = 0; i < 3; i++) {
    map[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const shortYear = map['YY'].padStart(2, '0');
    const num = Number(shortYear);

    if (num < 30) {
      map['YYYY'] = '20' + shortYear;
    } else {
      map['YYYY'] = '19' + shortYear;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const longYear = map['YYYY'];

    map['YY'] = longYear.slice(2);
  }

  const result = toFormat.slice(0, 3).map((key) => map[key]);

  return result.join(toSeparetor);
}
formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']);

module.exports = formatDate;
