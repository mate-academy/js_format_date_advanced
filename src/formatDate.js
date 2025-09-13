'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = {};
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dateDigits = date.split(separatorFrom);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = dateDigits[i];
  }

  const result = [];

  for (let j = 0; j < toFormat.length - 1; j++) {
    if (toFormat[j] === 'YY') {
      if (dateObj['YYYY']) {
        result.push(dateObj['YYYY'].slice(-2));
      } else {
        result.push(dateObj['YY']);
      }
    } else if (toFormat[j] === 'YYYY') {
      if (dateObj['YYYY']) {
        result.push(dateObj['YYYY']);
      } else if (dateObj['YY'] <= 29) {
        result.push('20' + dateObj['YY']);
      } else if (dateObj['YY'] >= 30) {
        result.push('19' + dateObj['YY']);
      }
    } else {
      result.push(dateObj[toFormat[j]]);
    }
  }

  return result.join(separatorTo);
}

module.exports = formatDate;
