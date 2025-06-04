'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const fromParts = fromFormat.slice(0, 3);
  const toParts = toFormat.slice(0, 3);

  const values = date.split(fromSeparator);
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromParts[i]] = values[i];
  }

  const result = toParts.map((part) => {
    if (part === 'YYYY') {
      if (dateObj['YYYY']) {
        return dateObj['YYYY'];
      }

      const yy = parseInt(dateObj['YY'], 10);

      return (yy < 30 ? '20' : '19') + dateObj['YY'];
    }

    if (part === 'YY') {
      if (dateObj['YY']) {
        return dateObj['YY'];
      }

      return dateObj['YYYY'].slice(-2);
    }

    return dateObj[part];
  });

  return result.join(toSeparator);
}

module.exports = formatDate;
