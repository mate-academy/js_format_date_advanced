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
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];
    const value = parts[i];

    if (key === 'YYYY') {
      dateObj['YYYY'] = value;
      dateObj['YY'] = value.slice(-2);
    } else if (key === 'YY') {
      dateObj['YY'] = value;

      const num = Number(value);

      dateObj['YYYY'] = num < 30 ? '20' + value : '19' + value;
    } else {
      dateObj[key] = value;
    }
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];

    resultParts.push(dateObj[key]);
  }

  return resultParts.join(toSep);
}

module.exports = formatDate;
