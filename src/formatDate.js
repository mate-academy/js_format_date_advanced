'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const fromFormatObj = {};
  const toFormatObj = {};
  const arrFromDate = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    fromFormatObj[fromFormat[i]] = arrFromDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    toFormatObj[toFormat[i]] = '';
  }

  for (const keyToFormat of Object.keys(toFormatObj)) {
    for (const keyFromFormat of Object.keys(fromFormatObj)) {
      if (keyToFormat === 'YY' && keyFromFormat === 'YYYY') {
        toFormatObj[keyToFormat] = fromFormatObj[keyFromFormat].slice(
          2,
          fromFormatObj[keyFromFormat].length,
        );
      } else if (keyToFormat === 'YYYY' && keyFromFormat === 'YY') {
        if (fromFormatObj[keyFromFormat] < 30) {
          toFormatObj[keyToFormat] = 2000 + +fromFormatObj[keyFromFormat];
        } else {
          toFormatObj[keyToFormat] = 1900 + +fromFormatObj[keyFromFormat];
        }
      } else if (keyToFormat === keyFromFormat) {
        toFormatObj[keyToFormat] = fromFormatObj[keyFromFormat];
      }
    }
  }

  const dataArray = [];

  for (const key of Object.keys(toFormatObj)) {
    dataArray.push(toFormatObj[key]);
  }

  return dataArray.join(toSeparator);
}

module.exports = formatDate;
