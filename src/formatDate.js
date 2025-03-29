'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const CENTURY_THRESHOLD = 30;
  const DATE_FORMAT_LENGTH = 3;

  const inputSeparator = fromFormat[3];
  const outputSeparator = toFormat[3];
  const structuredDate = {};
  const separatedInputDate = date.split(inputSeparator);

  for (let i = 0; i < DATE_FORMAT_LENGTH; i++) {
    structuredDate[fromFormat[i]] = separatedInputDate[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    structuredDate['YYYY'] =
      +structuredDate['YY'] < CENTURY_THRESHOLD
        ? '20' + structuredDate['YY']
        : '19' + structuredDate['YY'];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    structuredDate['YY'] = structuredDate['YYYY'].slice(2);
  }

  let resultDate = '';

  for (let i = 0; i < DATE_FORMAT_LENGTH; i++) {
    resultDate += structuredDate[toFormat[i]];
    resultDate += outputSeparator;
  }

  return resultDate.slice(0, -1);
}

module.exports = formatDate;
