'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromMap = {};
  const toMap = {};
  const parts = date.split(fromFormat[3]); // ['2020', '02', '18']

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' && toFormat[i] === 'YY') {
      parts[i] = parts[i].slice(-2);
    }

    if (fromFormat[i] === 'YY' && toFormat[i] === 'YYYY') {
      if (Number(parts[i]) < 30) {
        parts[i] = '20' + parts[i];
      } else {
        parts[i] = '19' + parts[i];
      }
    }

    fromMap[fromFormat[i]] = parts[i];
  }
  // {'YYYY': '2020', 'MM': '02', 'DD': '18'}

  for (let i = 0; i < toFormat.length - 1; i++) {
    toMap[i] = fromMap[toFormat[i]];
  }
  // {'DD': '18', 'MM': '02', 'YYYY': '2020'}

  for (let i = 0; i < parts.length; i++) {
    parts[i] = toMap[i] || parts[i];
  }
  // ['18', '02', '2020']

  const newString = parts.join(toFormat[3]);

  return newString;
  // '18.02.2020'
}

module.exports = formatDate;
