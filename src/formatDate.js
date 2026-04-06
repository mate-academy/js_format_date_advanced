'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = {};
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const parts = date.split(fromSeparator);

  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];
    const value = parts[i];

    dateParts[key] = value;

    if (key === 'YYYY') {
      dateParts.YY = value.slice(-2);
    }

    if (key === 'YY') {
      dateParts.YYYY = (Number(value) < 30 ? '20' : '19') + value;
    }
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    const datePart = dateParts[toFormat[i]];

    result.push(datePart);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
