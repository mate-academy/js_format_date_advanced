'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  function extractDateParts(date, format) {
    const parts = date.split(format[3]); 
    const partMap = {};

    for (let i = 0; i < format.length - 1; i++) {
      partMap[format[i]] = parts[i];
    }

    return partMap;
  }

  function convertYear(year, toFormat) {
    if (toFormat.includes('YYYY')) {
      if (year.length === 2) {
        year = (parseInt(year) < 30 ? '20' : '19') + year;
      }
    } else if (toFormat.includes('YY')) {
      year = year.slice(-2);
    }
    return year;
  }

  const parts = extractDateParts(date, fromFormat);

  let result = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    let part = parts[toFormat[i]];
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      part = convertYear(part, toFormat);
    }
    result += part;

    if (i < toFormat.length - 2) {
      result += toFormat[3];
    }
  }

  return result;
}

module.exports = formatDate;
