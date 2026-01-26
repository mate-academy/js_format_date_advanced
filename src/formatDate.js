'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const arrOfDate = date.split(separator);
  const newSeparator = toFormat[fromFormat.length - 1];
  const formatOfDate = {};
  const newFormatArr = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    formatOfDate[fromFormat[i]] = arrOfDate[i];
  }

  for (let n = 0; n < toFormat.length - 1; n++) {
    const formatKey = toFormat[n];
    let value;

    if (formatOfDate[formatKey]) {
      value = formatOfDate[formatKey];
    } else if (formatKey === 'YYYY' && formatOfDate['YY']) {
      const year = parseInt(formatOfDate['YY']);

      value = year < 30 ? '20' + formatOfDate['YY'] : '19' + formatOfDate['YY'];
    } else if (formatKey === 'YY' && formatOfDate['YYYY']) {
      value = formatOfDate['YYYY'].slice(-2);
    } else {
      value = formatOfDate[formatKey];
    }
    newFormatArr.push(value);
  }

  return newFormatArr.join(newSeparator);
}

module.exports = formatDate;
