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

  const parts = date.split(separatorFrom);
  const obj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    obj[fromFormat[i]] = parts[i];
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    if (key === 'YYYY' && obj.YY) {
      const yy = Number(obj.YY);

      result.push(yy < 30 ? `20${obj.YY}` : `19${obj.YY}`);
    } else if (key === 'YY' && obj.YYYY) {
      result.push(obj.YYYY.slice(-2));
    } else {
      result.push(obj[key]);
    }
  }

  return result.join(separatorTo);
}

module.exports = formatDate;
