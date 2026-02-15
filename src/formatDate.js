'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const resultParts = [];
  const separator = fromFormat[3];
  const parts = date.split(separator);
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateMap['YY'] < 30) {
      dateMap['YYYY'] = '20' + dateMap['YY'];
    } else {
      dateMap['YYYY'] = '19' + dateMap['YY'];
    }
  }

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];

    resultParts.push(dateMap[key]);
  }

  return resultParts.join(toFormat[3]);
}

module.exports = formatDate;
