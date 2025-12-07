'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dateObj = {};
  const parts = date.split(separatorFrom);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = parts[i];
  }

  if ('YYYY' in dateObj && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  }

  const resultParts = toFormat.slice(0, -1).map((token) => {
    if (token in dateObj) {
      return dateObj[token];
    }

    if (token === 'YYYY' && 'YY' in dateObj) {
      const yy = String(dateObj.YY).padStart(2, '0');
      const n = Number(yy);
      const prefix = n < 30 ? '20' : '19';

      return prefix + yy;
    }

    if (token === 'YY' && 'YYYY' in dateObj) {
      return dateObj.YYYY.slice(-2);
    }

    return '';
  });

  return resultParts.join(separatorTo);
}

module.exports = formatDate;
