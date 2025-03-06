'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const obj = {};

  for (let i = 0; i < fromFormat.length; i++) {
    obj[fromFormat[i]] = dateParts[i];
  }

  if ('YYYY' in obj && toFormat.includes('YY')) {
    obj.YY = obj.YYYY.slice(2);
  }

  if ('YY' in obj && toFormat.includes('YYYY')) {
    obj.YYYY = obj.YY < '30' ? '20' + obj.YY : '19' + obj.YY;
  }

  const separator = toFormat[3] || '';

  let result = toFormat.map((format) => obj[format]).join(separator);

  if (result.endsWith(separator)) {
    result = result.slice(0, -separator.length);
  }

  return result;
}

module.exports = formatDate;
