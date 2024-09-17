'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  const separator = toFormat[3];
  const yearsLimit = 30;
  const result = [];

  result[toFormat.indexOf('DD')] = parts.splice(fromFormat.indexOf('DD'), 1);
  result[toFormat.indexOf('MM')] = parts.splice(fromFormat.indexOf('MM'), 1);

  const year = parts[0].slice(-2);

  if (toFormat.includes('YY')) {
    result[toFormat.indexOf('YY')] = year;

    return result.join(separator);
  }

  result[toFormat.indexOf('YYYY')] = (+year < yearsLimit ? '20' : '19') + year;

  return result.join(separator);
}

module.exports = formatDate;
