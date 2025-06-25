'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const parts = date.split(separatorFrom);

  const dateObj = {};

  // Mapăm părțile în funcție de formatul original
  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = parts[i];
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    const part = toFormat[i];

    if (part === 'YYYY' && dateObj['YY']) {
      // conversie din 'YY' în 'YYYY'
      const yy = parseInt(dateObj['YY'], 10);

      result.push(yy < 30 ? '20' + dateObj['YY'] : '19' + dateObj['YY']);
    } else if (part === 'YY' && dateObj['YYYY']) {
      // conversie din 'YYYY' în 'YY'
      result.push(dateObj['YYYY'].slice(-2));
    } else {
      result.push(dateObj[part]);
    }
  }

  return result.join(separatorTo);
}

module.exports = formatDate;
