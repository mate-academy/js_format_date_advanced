'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separators = ['-', '.', '/'];
  let separator = '';

  for (let i = 0; i < separators.length; i++) {
    if (date.includes(separators[i])) {
      separator = separators[i];
      break;
    }
  }

  const dateParts = date.split(separator);
  const dateMap = {};
  const resultParts = [];

  for (let i = 0; i < fromFormat.length; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  for (let i = 0; i < toFormat.length; i++) {
    const part = toFormat[i];
    let value = dateMap[part];

    if (part === 'YYYY' && !value) {
      const yy = Number(dateMap['YY']);

      value = yy < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
    }

    if (part === 'YY' && !value) {
      value = dateMap['YYYY'].slice(-2);
    }

    resultParts.push(value);
  }

  return resultParts.join(separator);
}

module.exports = formatDate;
