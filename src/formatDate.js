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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const parts = date.split(fromSeparator);
  const dateParts = {};

  for (let i = 0; i < 3; i++) {
    const type = fromFormat[i];
    const value = parts[i];

    if (type === 'YY') {
      const year = parseInt(value, 10);

      dateParts['YYYY'] = year < 30 ? '20' + value : '19' + value;
      dateParts['YY'] = value;
    } else if (type === 'YYYY') {
      dateParts['YYYY'] = value;
      dateParts['YY'] = value.slice(-2);
    } else {
      dateParts[type] = value;
    }
  }

  const result = toFormat.slice(0, 3).map((token) => dateParts[token]);

  return result.join(toSeparator);
}

module.exports = formatDate;
